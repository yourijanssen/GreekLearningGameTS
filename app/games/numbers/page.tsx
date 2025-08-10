"use client";
import React, { useRef, useEffect, useState } from "react";
import FeedbackLog from "@/components/gameUI/FeedbackHistory";
import GameOver from "@/components/gameUI/GameOver";
import { QuizQuestionView } from "@/components/gameUI/quizQuestionView";
import DataPeekButton from "@/components/gameUI/DataPeekButton";
import { greekNumbers } from "@/data/english1/greekNumbers";
import { useAutoNavigation } from "@/hooks/useAutoNavigation";
import { useGameTimer } from "@/hooks/useGameTimer";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useQuizGame } from "@/hooks/useQuizGame";
import { shuffleArray } from "@/lib/utils/utilities";
import { DOMUtils } from "@/lib/utils/gameUtilities/domUtils";
import { SpeechUtils } from "@/lib/utils/gameUtilities/speechUtlis";
import GameProgressTrackerWithKeyboard from "@/components/gameUI/GameProgressTrackerWithKeyboard";

/** Storage key for persisting game state in localStorage */
const STORAGE_KEY = "numbersGameState";

/** Minimum width for desktop layout */
const DESKTOP_BREAKPOINT = 1024;

/**
 * NumbersGame Component
 * 
 * A quiz game where users learn Greek numbers by typing the Greek word
 * for the displayed English number. Features include:
 * - Speech synthesis for pronunciation
 * - Integrated keyboard language detection and status display
 * - Data peek functionality with unlimited access to complete dataset
 * - Responsive layout (side-by-side on desktop, stacked on mobile)
 * - Streak tracking with detailed feedback showing answers
 * - Game state persistence across sessions
 * - Progress tracking with comprehensive statistics
 * - Auto-navigation when complete
 * - Enhanced logging that shows both user input and correct answers
 * 
 * @returns {React.FC} The NumbersGame component
 */
const NumbersGame: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

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
  } = useQuizGame(shuffleArray(greekNumbers), STORAGE_KEY);

  // Custom hooks
  const { startTime, finishTime } = useGameTimer(items.length === 0);
  const { speak } = useSpeechSynthesis();

  /**
   * Handles window resize to determine layout
   */
  const handleResize = (): void => {
    setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
  };

  /**
   * Handles text-to-speech for the current question
   * Speaks the Greek number word for pronunciation help
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

  // Check initial screen size and add resize listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Focus input on question change
  useEffect(() => {
    DOMUtils.focusAndSelectInput(inputRef);
  }, [items.length]);

  // Auto-navigation when game is complete
  useAutoNavigation(items.length === 0, finishTime);

  /**
   * Gets container styles based on screen size
   */
  const getContainerStyles = (): React.CSSProperties => {
    if (isDesktop) {
      return {
        display: "flex",
        maxWidth: 1200,
        margin: "2rem auto",
        gap: "2rem",
        alignItems: "flex-start",
        padding: "0 1rem",
      };
    }
    return {
      maxWidth: 500,
      margin: "2rem auto",
      padding: "0 1rem",
    };
  };

  /**
   * Gets main content styles based on screen size
   */
  const getMainContentStyles = (): React.CSSProperties => {
    if (isDesktop) {
      return {
        flex: "1",
        minWidth: 0, // Allows flex item to shrink below content size
        textAlign: "center" as const,
      };
    }
    return {
      textAlign: "center" as const,
    };
  };

  /**
   * Gets sidebar styles for desktop layout
   */
  const getSidebarStyles = (): React.CSSProperties => {
    return {
      width: 300,
      flexShrink: 0,
    };
  };

  const ProgressTracker = (
    <GameProgressTrackerWithKeyboard
      streak={streak}
      bestStreak={bestStreak}
      correctCount={correctCount}
      total={greekNumbers.length}
      startTime={startTime}
      finishTime={finishTime}
      streakLabel="Current Streak"
      bestStreakLabel="Top Streak"
      progressLabel="Completed"
      timeLabel="Time Taken"
      sidebarMode={isDesktop}
    />
  );

  const MainContent = (
    <>
      {items.length === 0 ? (
        <GameOver onMenu={handleMenu} />
      ) : (
        <>
          <QuizQuestionView
            questionPrompt="Type the Greek number for:"
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
          
          {/* Data Peek Button - positioned below question on mobile, floating on desktop */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <DataPeekButton
              data={greekNumbers}
              buttonText="📊 View Numbers"
              modalTitle="Greek Numbers Dataset"
              firstColumnLabel="Greek Number"
              secondColumnLabel="English Number"
              position="inline"
              style={{
                fontSize: "0.8rem",
                padding: "0.4rem 0.8rem",
              }}
            />
          </div>
        </>
      )}
      
      <FeedbackLog log={log} />
    </>
  );

  return (
    <>
      <div style={getContainerStyles()}>
        {/* Main Content Area */}
        <main style={getMainContentStyles()}>
          {MainContent}
          
          {/* Progress Tracker for Mobile (below content) */}
          {!isDesktop && ProgressTracker}
        </main>

        {/* Sidebar for Desktop (right side) */}
        {isDesktop && (
          <aside style={getSidebarStyles()}>
            {ProgressTracker}
          </aside>
        )}
      </div>

      {/* Floating Data Peek Button for Mobile when game is active */}
      {!isDesktop && items.length > 0 && (
        <DataPeekButton
          data={greekNumbers}
          buttonText="📊"
          modalTitle="Greek Numbers Dataset"
          firstColumnLabel="Greek Number"
          secondColumnLabel="English Number"
          position="floating"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            padding: "0",
            justifyContent: "center",
            fontSize: "1.2rem",
            bottom: "1rem",
            right: "1rem",
            left: "auto",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        />
      )}
    </>
  );
};

export default NumbersGame;