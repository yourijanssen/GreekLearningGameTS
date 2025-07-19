"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { shuffleArray, stripGreekAccents } from "../utils/utilities";
import greekNames from "../data/greekNames";
import { GameProgressTracker } from "../UI/gameProgressTracker";
import { QuizQuestionView } from "../UI/quizQuestionView";
import GameOver from "../UI/GameOver";
import FeedbackLog from "../UI/FeedbackHistory";

const NameGame: React.FC = () => {
  // Game state
  const [items, setItems] = useState(() => shuffleArray(greekNames));
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [finishTime, setFinishTime] = useState<number | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Timer start on mount
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  // Set finishTime when done
  useEffect(() => {
    if (items.length === 0 && finishTime == null) {
      setFinishTime(Date.now());
    }
  }, [items.length, finishTime]);

  // Auto-focus input when feedback is cleared
  useEffect(() => {
    if (!feedback) {
      inputRef.current?.focus();
    }
  }, [feedback]);

  // Auto-return to main menu after finishing the game
  useEffect(() => {
    if (items.length === 0 && finishTime != null) {
      const timeout = setTimeout(() => {
        router.push("/");
      }, 1600);
      return () => clearTimeout(timeout);
    }
  }, [items.length, finishTime, router]);

  // Unified feedback color
  const feedbackColor =
    feedback && feedback.startsWith("✅")
      ? "#047c2a"
      : feedback
      ? "#c43219"
      : "";

  // Handlers
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleMenu = () => {
    router.push("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [answer, question] = items[0];

    if (stripGreekAccents(input).toLowerCase() === stripGreekAccents(answer).toLowerCase()) {
      const perfect = input === answer;
      setStreak((s) => s + 1);
      setCorrectCount((n) => n + 1);
      setBestStreak((now) => Math.max(now, streak + 1));
      setItems((arr) => shuffleArray(arr.slice(1)));
      setFeedback(
        perfect
          ? `✅ Correct! Streak: ${streak + 1}`
          : `✅ Correct! The proper way is: ${answer}`
      );
      setLog((prev) => [
        perfect
          ? `✅ Correct! Streak: ${streak + 1}`
          : `✅ Correct! The proper way is: ${answer}`,
        ...prev,
      ]);
      setInput("");
      setTimeout(() => setFeedback(null), 1000); // Clear feedback after 1s
    } else {
      setFeedback(
        `❌ Incorrect! The correct answer was: ${answer} (${question}). Your streak was: ${streak}`
      );
      setLog((prev) => [
        `❌ Incorrect! The correct answer was: ${answer} (${question}). Your streak was: ${streak}`,
        ...prev,
      ]);
      setBestStreak((now) => Math.max(now, streak));
      setStreak(0);
      setItems((arr) => shuffleArray(arr));
      setInput("");
      setTimeout(() => setFeedback(null), 1500); // Clear feedback after 1.5s
    }
  };

  const handleListen = () => {
    // Speak the Greek version (answer if question is Latin, question if it's Greek)
    const msg = /[a-zA-Z]/.test(items[0][1]) ? items[0][0] : items[0][1];
    const utter = new window.SpeechSynthesisUtterance(msg);
    const voices = window.speechSynthesis.getVoices();
    const greekVoice = voices.find((v) => v.lang && v.lang.startsWith("el"));
    if (greekVoice) utter.voice = greekVoice;
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);
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
        total={greekNames.length}
        startTime={startTime}
        finishTime={finishTime}
      />
    </main>
  );
};

export default NameGame;