// NumbersGame.tsx
"use client";
import React, { useRef } from "react";
import GameOver from "../UI/GameOver";
import { QuizQuestionView } from "../UI/quizQuestionView";
import FeedbackLog from "../UI/FeedbackHistory";
import { GameProgressTracker } from "../UI/gameProgressTracker";
import { greekNumbers } from "../data/greekNumbers";
import { useGameTimer } from "../utils/hooks/useGameTimer";
import { useAutoNavigation } from "../utils/hooks/useAutoNavigation";
import { useFeedback } from "../utils/hooks/useFeedback";
import { useGameProgress } from "../utils/hooks/useGameProgress";
import { useSpeechSynthesis } from "../utils/hooks/useSpeechSynthesis";


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
    greekNumbers,
    setFeedbackMessage,
    (message: string) => setLog((prev) => [message, ...prev])
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
      />
    </main>
  );
};

export default NumbersGame;