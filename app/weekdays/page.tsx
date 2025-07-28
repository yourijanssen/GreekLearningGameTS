"use client";
import React, { useRef, useState } from "react";
import GameOver from "../UI/GameOver";
import { QuizQuestionView } from "../UI/quizQuestionView";
import FeedbackLog from "../UI/FeedbackHistory";
import { GameProgressTracker } from "../UI/gameProgressTracker";
import { greekWeekdays } from "../data/dutch/greekWeekdays";
import { useAutoNavigation } from "../utils/hooks/useAutoNavigation";
import { useGameTimer } from "../utils/hooks/useGameTimer";
import { useSpeechSynthesis } from "../utils/hooks/useSpeechSynthesis";
import { shuffleArray, stripGreekAccents } from "../utils/utilities";

const WeekdaysGame: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Quiz/game state
  const [items, setItems] = useState(() => shuffleArray(greekWeekdays));
  const [input, setInput] = useState("");
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Feedback log state
  const [log, setLog] = useState<string[]>([]);

  // Timer
  const { startTime, finishTime } = useGameTimer(items.length === 0);

  // Speech synthesis
  const { speak } = useSpeechSynthesis();
  const handleListen = () => {
    if (items.length > 0) {
      const msg = /[a-zA-Z]/.test(items[0][1]) ? items[0][0] : items[0][1];
      speak(msg);
    }
  };

  // Focus on next question, always
React.useEffect(() => {
  setTimeout(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, 0);
}, [items.length]);

  // Input handler
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Submit handler and log update
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    const [answer, question] = items[0];

    if (
      stripGreekAccents(input).toLowerCase() ===
      stripGreekAccents(answer).toLowerCase()
    ) {
      const perfect = input === answer;
      const newStreak = streak + 1;
      setStreak(newStreak);
      setCorrectCount((n) => n + 1);
      setBestStreak((now) => Math.max(now, newStreak));
      setItems((arr) => arr.slice(1));
      const feedbackMsg = perfect
        ? `✅ Correct! Streak: ${newStreak}`
        : `✅ Correct! The proper way is: ${answer}`;
      setLog(prev => [feedbackMsg, ...prev]);
      setInput("");
    } else {
      setBestStreak((now) => Math.max(now, streak));
      setStreak(0);
      const wrongItem = items[0];
      setItems((arr) => [...arr.slice(1), wrongItem]);
      const feedbackMsg = `❌ Incorrect! The correct answer was: ${answer} (${question}). Your streak was: ${streak}`;
      setLog(prev => [feedbackMsg, ...prev]);
      setInput("");
    }
  };

  // Auto-navigation to menu
  useAutoNavigation(items.length === 0, finishTime);

  // Focus on next question (after every input change)
  React.useEffect(() => {
    inputRef.current?.focus();
  }, [items.length]);

  const handleMenu = () => {
    window.location.href = "/";
  };

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
            onListen={handleListen} feedback={null} feedbackColor={""}          // no need for feedback/feedbackColor here
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