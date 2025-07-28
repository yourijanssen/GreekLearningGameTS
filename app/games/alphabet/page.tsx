"use client";
import FeedbackLog from "@/components/gameUI/FeedbackHistory";
import GameOver from "@/components/gameUI/GameOver";
import GameProgressTracker from "@/components/gameUI/gameProgressTracker";
import { QuizQuestionView } from "@/components/gameUI/quizQuestionView";
import { greekLetters } from "@/data/english1/greekLetters";
import { useAutoNavigation } from "@/hooks/useAutoNavigation";
import { useGameTimer } from "@/hooks/useGameTimer";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { shuffleArray, stripGreekAccents } from "@/lib/utils/utilities";
import React, { useRef, useState } from "react";

const AlphabetGame: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Game state
  const [items, setItems] = useState(() => shuffleArray(greekLetters));
  const [input, setInput] = useState("");
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  // Timer
  const { startTime, finishTime } = useGameTimer(items.length === 0);

  // Speech
  const { speak } = useSpeechSynthesis();
  const handleListen = () => {
    if (items.length > 0) {
      const msg = /[a-zA-Z]/.test(items[0][1]) ? items[0][0] : items[0][1];
      speak(msg);
    }
  };

  // Focus management
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
      setLog((prev) => [feedbackMsg, ...prev]);
      setInput("");
    } else {
      setBestStreak((now) => Math.max(now, streak));
      setStreak(0);
      const wrongItem = items[0];
      setItems((arr) => [...arr.slice(1), wrongItem]);
      const feedbackMsg = `❌ Incorrect! The correct answer was: ${answer} (${question}). Your streak was: ${streak}`;
      setLog((prev) => [feedbackMsg, ...prev]);
      setInput("");
    }
  };

  // Auto-navigation (if you use it)
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
          questionPrompt="Type the Greek letter for:"
          question={items[0][1]}
          input={input}
          onInput={handleInput}
          onSubmit={handleSubmit}
          inputRef={inputRef}
          disabled={false}
          onMenu={handleMenu}
          onListen={handleListen}
          feedback={null}
          feedbackColor={""}
        />
      )}
      <FeedbackLog log={log} />
      <GameProgressTracker
        streak={streak}
        bestStreak={bestStreak}
        correctCount={correctCount}
        total={greekLetters.length}
        startTime={startTime}
        finishTime={finishTime}
      />
    </main>
  );
};

export default AlphabetGame;