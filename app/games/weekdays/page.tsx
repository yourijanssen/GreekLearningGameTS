"use client";
import React, { useRef, useEffect } from "react";
import FeedbackLog from "@/components/gameUI/FeedbackHistory";
import GameOver from "@/components/gameUI/GameOver";
import GameProgressTracker from "@/components/gameUI/gameProgressTracker";
import { QuizQuestionView } from "@/components/gameUI/quizQuestionView";
import { greekWeekdays } from "@/data/english1/greekWeekdays";
import { useAutoNavigation } from "@/hooks/useAutoNavigation";
import { useGameTimer } from "@/hooks/useGameTimer";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useQuizGame } from "@/hooks/useQuizGame";
import { shuffleArray } from "@/lib/utils/utilities";
import { DOMUtils } from "@/lib/utils/gameUtilities/domUtils";
import { SpeechUtils } from "@/lib/utils/gameUtilities/speechUtlis";

/** Storage key for persisting weekdays game state in localStorage */
const STORAGE_KEY = "weekdaysGameState";

/**
 * WeekdaysGame Component
 * 
 * A quiz game where users learn Greek weekdays by typing the Greek word
 * for the displayed English weekday. Features include:
 * - Speech synthesis for pronunciation help
 * - Intelligent speech detection (speaks Greek words vs English names)
 * - Streak tracking with detailed feedback showing answers
 * - Game state persistence across sessions
 * - Progress tracking with comprehensive statistics
 * - Auto-navigation when complete
 * - Enhanced logging that shows both user input and correct answers
 * - Search functionality in feedback log
 * 
 * @returns {React.FC} The WeekdaysGame component
 */
const WeekdaysGame: React.FC = () => {
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
  } = useQuizGame(shuffleArray(greekWeekdays), STORAGE_KEY);

  // Custom hooks
  const { startTime, finishTime } = useGameTimer(items.length === 0);
  const { speak } = useSpeechSynthesis();

  /**
   * Handles text-to-speech for the current question
   * Uses intelligent detection to speak either the Greek word or its English name
   * Speaks the Greek word if the question is in English, otherwise speaks the English name
   */
  const handleListen = (): void => {
    if (items.length === 0) return;
    
    const [answer, question] = items[0];
    const speechText = SpeechUtils.getAlphabetSpeechText(answer, question);
    speak(speechText);
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
          questionPrompt="Type the Greek word for:"
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
        total={greekWeekdays.length}
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

export default WeekdaysGame;