"use client";
import FeedbackLog from "@/components/gameUI/FeedbackHistory";
import GameOver from "@/components/gameUI/GameOver";
import GameProgressTracker from "@/components/gameUI/gameProgressTracker";
import { QuizQuestionView } from "@/components/gameUI/quizQuestionView";
import { greekNumbers } from "@/data/english1/greekNumbers";
import { useAutoNavigation } from "@/hooks/useAutoNavigation";
import { useFeedback } from "@/hooks/useFeedback";
import { useGameProgress } from "@/hooks/useGameProgress";
import { useGameTimer } from "@/hooks/useGameTimer";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import React, { useRef } from "react";

const NumbersGame: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Feedback management
  const { feedback, feedbackColor, setFeedbackMessage } = useFeedback();

  // Game progress and state management
  const {
    items,
    input,
    streak,
    bestStreak,
    correctCount,
    handleInput,
    handleSubmit,
  } = useGameProgress(
    greekNumbers, // Data source
    setFeedbackMessage, // Feedback setter
    (message: string) => setLog((prev) => [message, ...prev]), // Log updater
    greekNumbers // Initial items set to greekNumbers for consistency on first render
  );

  // Timer management
  const { startTime, finishTime } = useGameTimer(items.length === 0);

  // Log management (still in component as it's UI-specific for now)
  const [log, setLog] = React.useState<string[]>([]);

  // Speech synthesis
  const { speak } = useSpeechSynthesis();
  const handleListen = () => {
    if (items.length > 0) {
      speak(items[0][0]); // Speak the Greek number/word
    }
  };

  // Auto-navigation to menu
  useAutoNavigation(items.length === 0, finishTime);

  // Auto-focus input when feedback is cleared
  React.useEffect(() => {
    if (!feedback) {
      inputRef.current?.focus();
    }
  }, [feedback]);

  const handleMenu = () => {
    window.location.href = "/"; // Direct navigation to menu
  };

  return (
    <main style={{ maxWidth: 500, margin: "2rem auto", textAlign: "center" }}>
      {items.length === 0 ? (
        <GameOver onMenu={handleMenu} />
      ) : (
        <QuizQuestionView
          question={items[0][1]}
          input={input}
          onInput={handleInput}
          onSubmit={handleSubmit}
          feedback={feedback}
          feedbackColor={feedbackColor}
          inputRef={inputRef}
          disabled={!!feedback}
          onMenu={handleMenu}
          onListen={handleListen}
          questionPrompt="Type the Greek word for:"
        />
      )}
      <FeedbackLog log={log} />
      <GameProgressTracker
        streak={streak}
        bestStreak={bestStreak}
        correctCount={correctCount}
        total={greekNumbers.length}
        startTime={startTime}
        finishTime={finishTime}
        // Custom labels for context-specific text
        streakLabel="Current Streak"
        bestStreakLabel="Top Streak"
        progressLabel="Completed"
        timeLabel="Time Taken"
      />
    </main>
  );
};

export default NumbersGame;