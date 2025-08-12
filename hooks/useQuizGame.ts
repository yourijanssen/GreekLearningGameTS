/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { GameStateManager } from "@/lib/utils/gameUtilities/gamestateManager";
import { QuizLogicManager } from "@/lib/utils/gameUtilities/quizlogic";
import { BaseGameState } from "@/types/BaseGameState";
import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for managing quiz game state and logic (with remote API support)
 *
 * @param {[string, string][]} initialItems - Initial quiz items
 * @param {string} userId - Auth user id for persistence
 * @param {string} gameType - Game type string (used as backend identifier)
 * @returns {Object} Game state and handlers
 */
export const useQuizGame = (
  initialItems: [string, string][],
  userId: string,
  gameType: string
) => {
  const [items, setItems] = useState<[string, string][]>(initialItems);
  const [input, setInput] = useState<string>("");
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load saved state from API on mount
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedState = await GameStateManager.loadGameState(
          userId,
          gameType
        );
        if (savedState && mounted) {
          setItems(savedState.remainingItems);
          setStreak(savedState.streak);
          setBestStreak(savedState.bestStreak);
          setCorrectCount(savedState.correctCount);
          setLog(savedState.log);
        }
      } catch (err: any) {
        setError("Failed to load game state.");
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [userId, gameType]);

  // Save state to API on updates
  useEffect(() => {
    if (loading) return; // Don't save while loading initial state!
    const save = async () => {
      const gameState: BaseGameState = {
        remainingItems: items,
        streak,
        bestStreak,
        correctCount,
        log,
      };
      try {
        await GameStateManager.saveGameState(userId, gameType, gameState);
      } catch (err: any) {
        setError("Failed to save game state.");
      }
    };
    save();
    // Only on important state change after initial load
  }, [items, streak, bestStreak, correctCount, log, userId, gameType, loading]);

  // Clear state when game ends (items = 0)
  useEffect(() => {
    if (loading) return;
    if (items.length === 0) {
      const clear = async () => {
        try {
          await GameStateManager.clearGameState(userId, gameType);
        } catch (err: any) {
          setError("Failed to clear game state.");
        }
      };
      clear();
    }
  }, [items.length, userId, gameType, loading]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (items.length === 0) return;

      const [correctAnswer, questionContext] = items[0];
      const result = QuizLogicManager.evaluateAnswer(
        input,
        correctAnswer,
        questionContext,
        streak
      );

      if (result.isCorrect) {
        const newState = QuizLogicManager.handleCorrectAnswer(
          { items, streak, bestStreak, correctCount, log },
          result.feedbackMessage
        );
        setItems(newState.items);
        setStreak(newState.streak);
        setBestStreak(newState.bestStreak);
        setCorrectCount(newState.correctCount);
        setLog(newState.log);
      } else {
        const newState = QuizLogicManager.handleIncorrectAnswer(
          { items, streak, bestStreak, log },
          result.feedbackMessage
        );
        setItems(newState.items);
        setStreak(newState.streak);
        setBestStreak(newState.bestStreak);
        setLog(newState.log);
      }

      setInput("");
    },
    [items, input, streak, bestStreak, correctCount, log]
  );

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  return {
    // State
    items,
    input,
    streak,
    bestStreak,
    correctCount,
    log,
    loading,
    error,

    // Handlers
    handleSubmit,
    handleInput,
  };
};
