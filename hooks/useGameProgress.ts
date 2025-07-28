import { shuffleArray, stripGreekAccents } from "@/lib/utils/utilities";
import { useState } from "react";

export function useGameProgress<T extends [string, string]>(
  greekWeekdays: [string, string][],
  setFeedbackMessage: (message: string, duration?: number) => void,
  p0: (message: string) => void,
  initialItems: T[]
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

    const [answer] = items[0];
    if (
      stripGreekAccents(input).toLowerCase() ===
      stripGreekAccents(answer).toLowerCase()
    ) {
      // correct answer, increment streak and counts, remove this item
      const newStreak = streak + 1;
      setStreak(newStreak);
      setCorrectCount((n) => n + 1);
      setBestStreak((now) => Math.max(now, newStreak));
      setItems((arr) => arr.slice(1));
      setInput("");
    } else {
      // wrong answer, reset streak, move item to end for spaced repetition
      setBestStreak((now) => Math.max(now, streak));
      setStreak(0);
      const wrongItem = items[0];
      setItems((arr) => [...arr.slice(1), wrongItem]);
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
