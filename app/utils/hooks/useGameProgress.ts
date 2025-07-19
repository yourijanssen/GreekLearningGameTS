// hooks/useGameProgress.ts
import { useState } from "react";
import { shuffleArray, stripGreekAccents } from "../utilities";

export function useGameProgress<T extends [string, string]>(
  initialItems: T[],
  onFeedback: (message: string, duration?: number) => void,
  onLog: (message: string) => void
): {
  items: T[];
  input: string;
  streak: number;
  bestStreak: number;
  correctCount: number;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetInput: () => void;
} {
  const [items, setItems] = useState(() => shuffleArray(initialItems));
  const [input, setInput] = useState("");
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

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
      setItems((arr) => shuffleArray(arr.slice(1)));
      const feedbackMsg = perfect
        ? `✅ Correct! Streak: ${newStreak}`
        : `✅ Correct! The proper way is: ${answer}`;
      onFeedback(feedbackMsg, 1000);
      onLog(feedbackMsg);
      setInput("");
    } else {
      const feedbackMsg = `❌ Incorrect! The correct answer was: ${answer} (${question}). Your streak was: ${streak}`;
      onFeedback(feedbackMsg, 1500);
      onLog(feedbackMsg);
      setBestStreak((now) => Math.max(now, streak));
      setStreak(0);
      setItems((arr) => shuffleArray(arr));
      setInput("");
    }
  };

  const resetInput = () => setInput("");

  return {
    items,
    input,
    streak,
    bestStreak,
    correctCount,
    handleInput,
    handleSubmit,
    resetInput,
  };
}
