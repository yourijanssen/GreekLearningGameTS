// WeekdaysGame.tsx
"use client";
import React, { useRef } from "react";
import GameOver from "../UI/GameOver";
import { QuizQuestionView } from "../UI/quizQuestionView";
import FeedbackLog from "../UI/FeedbackHistory";
import { GameProgressTracker } from "../UI/gameProgressTracker";
import { greekWeekdays } from "../data/greekWeekdays"; // Renamed for clarity, update path as needed
import { useAutoNavigation } from "../utils/hooks/useAutoNavigation";
import { useFeedback } from "../utils/hooks/useFeedback";
import { useGameProgress } from "../utils/hooks/useGameProgress";
import { useGameTimer } from "../utils/hooks/useGameTimer";
import { useSpeechSynthesis } from "../utils/hooks/useSpeechSynthesis";


const WeekdaysGame: React.FC = () => {
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
    greekWeekdays,
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
          onListen={handleListen}
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
      />
    </main>
  );
};

export default WeekdaysGame;