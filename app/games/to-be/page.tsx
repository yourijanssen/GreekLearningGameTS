"use client";
import React, { useRef, useEffect } from "react";
import FeedbackLog from "@/components/gameUI/FeedbackHistory";
import GameOver from "@/components/gameUI/GameOver";
import GameProgressTracker from "@/components/gameUI/gameProgressTracker";
import { QuizQuestionView } from "@/components/gameUI/quizQuestionView";
import { greekToBe } from "@/data/english1/greekToBe";
import { useAutoNavigation } from "@/hooks/useAutoNavigation";
import { useGameTimer } from "@/hooks/useGameTimer";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useQuizGame } from "@/hooks/useQuizGame";
import { shuffleArray } from "@/lib/utils/utilities";
import { DOMUtils } from "@/lib/utils/gameUtilities/domUtils";
import { SpeechUtils } from "@/lib/utils/gameUtilities/speechUtlis";

/** Storage key for persisting "to be" verb game state in localStorage */
const STORAGE_KEY = "toBeGameState";

/**
 * ToBeGame Component
 * 
 * A quiz game where users learn Greek "to be" verb conjugations by typing the Greek form
 * for the displayed English conjugation (I am, you are, he/she/it is, etc.). Features include:
 * - Speech synthesis for pronunciation help with Greek verb forms
 * - Streak tracking with detailed feedback showing both user input and correct answers
 * - Game state persistence across sessions for uninterrupted learning
 * - Progress tracking with comprehensive statistics
 * - Auto-navigation when complete
 * - Enhanced logging system with search functionality
 * - Intelligent feedback for perfect vs imperfect matches
 * 
 * @returns {React.FC} The ToBeGame component
 */
const ToBeGame: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Use custom hook for game logic
  const {
    items,
    input,
    streak,
    bestStreak,
    correctCount,
    log,
    handleSubmit,
    handleInput,
  } = useQuizGame(shuffleArray(greekToBe), STORAGE_KEY);

  // Custom hooks
  const { startTime, finishTime } = useGameTimer(items.length === 0);
  const { speak } = useSpeechSynthesis();

  /**
   * Handles text-to-speech for the current question
   * Speaks the Greek verb form for pronunciation help
   * This helps users learn the correct pronunciation of Greek verb conjugations
   */
  const handleListen = (): void => {
    if (items.length > 0) {
      const speechText = SpeechUtils.getNumberSpeechText(items[0][0]);
      speak(speechText);
    }
  };

  /**
   * Handles navigation back to main menu
   */
  const handleMenu = (): void => {
    DOMUtils.navigateTo("/");
  };

  // Focus input when questions change
  useEffect(() => {
    DOMUtils.focusAndSelectInput(inputRef);
  }, [items.length]);

  // Auto-navigation when game is complete
  useAutoNavigation(items.length === 0, finishTime);

  return (
    <main style={{ maxWidth: 500, margin: "2rem auto", textAlign: "center" }}>
      {items.length === 0 ? (
        <GameOver onMenu={handleMenu} />
      ) : (
        <QuizQuestionView
          questionPrompt="Type the Greek form for:"
          question={items[0][1]}
          input={input}
          onInput={handleInput}
          onSubmit={handleSubmit}
          inputRef={inputRef}
          disabled={false}
          onMenu={handleMenu}
          onListen={handleListen}
          feedback={null}
          feedbackColor=""
        />
      )}
      
      <FeedbackLog log={log} />
      
      <GameProgressTracker
        streak={streak}
        bestStreak={bestStreak}
        correctCount={correctCount}
        total={greekToBe.length}
        startTime={startTime}
        finishTime={finishTime}
        streakLabel="Current Streak"
        bestStreakLabel="Top Streak"
        progressLabel="Completed"
        timeLabel="Time Taken"
      />
    </main>
  );
};

export default ToBeGame;