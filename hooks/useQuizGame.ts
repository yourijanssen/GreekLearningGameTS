import {
  BaseGameState,
  GameStateManager,
} from "@/lib/utils/gameUtilities/gamestate";
import { QuizLogicManager } from "@/lib/utils/gameUtilities/quizlogic";
import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for managing quiz game state and logic
 *
 * @param {[string, string][]} initialItems - Initial quiz items
 * @param {string} storageKey - LocalStorage key for persistence
 * @returns {Object} Game state and handlers
 */
export const useQuizGame = (
  initialItems: [string, string][],
  storageKey: string
) => {
  const [items, setItems] = useState<[string, string][]>(initialItems);
  const [input, setInput] = useState<string>("");
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [log, setLog] = useState<string[]>([]);

  // Load saved state on mount
  useEffect(() => {
    const savedState = GameStateManager.loadGameState(storageKey);
    if (savedState) {
      setItems(savedState.remainingItems);
      setStreak(savedState.streak);
      setBestStreak(savedState.bestStreak);
      setCorrectCount(savedState.correctCount);
      setLog(savedState.log);
    }
  }, [storageKey]);

  // Save state on updates
  useEffect(() => {
    const gameState: BaseGameState = {
      remainingItems: items,
      streak,
      bestStreak,
      correctCount,
      log,
    };
    GameStateManager.saveGameState(storageKey, gameState);
  }, [items, streak, bestStreak, correctCount, log, storageKey]);

  // Clear state when game ends
  useEffect(() => {
    if (items.length === 0) {
      GameStateManager.clearGameState(storageKey);
    }
  }, [items.length, storageKey]);

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

    // Handlers
    handleSubmit,
    handleInput,
  };
};
