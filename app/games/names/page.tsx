// NameGame.tsx
"use client";
import FeedbackLog from "@/components/gameUI/FeedbackHistory";
import GameOver from "@/components/gameUI/GameOver";
import GameProgressTracker from "@/components/gameUI/gameProgressTracker";
import { QuizQuestionView } from "@/components/gameUI/quizQuestionView";
import greekNames from "@/data/english1/greekNames";
import { useAutoNavigation } from "@/hooks/useAutoNavigation";
import { useFeedback } from "@/hooks/useFeedback";
import { useGameProgress } from "@/hooks/useGameProgress";
import { useGameTimer } from "@/hooks/useGameTimer";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import React, { useRef } from "react";


const NameGame: React.FC = () => {
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
    greekNames, // Data source
    setFeedbackMessage, // Feedback setter
    (message: string) => setLog((prev) => [message, ...prev]), // Log updater
    greekNames // Initial items set to greekNames for consistency on first render
  );

    // Timer management
  const { startTime, finishTime } = useGameTimer(items.length === 0);


  // Log management (still in component as it's UI-specific for now)
  const [log, setLog] = React.useState<string[]>([]);

  // Speech synthesis
  const { speak } = useSpeechSynthesis();
  const handleListen = () => {
    if (items.length > 0) {
      // Speak the Greek version (answer if question is Latin, question if it's Greek)
      const msg = /[a-zA-Z]/.test(items[0][1]) ? items[0][0] : items[0][1];
      speak(msg);
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
            onListen={handleListen} questionPrompt={""}        />
      )}
      <FeedbackLog log={log} />
      <GameProgressTracker
        streak={streak}
        bestStreak={bestStreak}
        correctCount={correctCount}
        total={greekNames.length}
        startTime={startTime}
        finishTime={finishTime}
      />
    </main>
  );
};

export default NameGame;