"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { greekNumbers } from "../data/greekNumbers";
import { shuffleArray, stripGreekAccents } from "../utils/utilities";
import { QuizQuestionView } from "../UI/quizQuestionView";
import { GameProgressTracker } from "../UI/gameProgressTracker";

//---------------- Parent Logic Orchestrator ---------------//

export default function AlphabetGame() {
  // Game state
  const [items, setItems] = useState(() => shuffleArray(greekNumbers));
  const [input, setInput] = useState("");
  const [feedback] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [finishTime, setFinishTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [log, setLog] = useState<string[]>([]);
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

  useEffect(() => {
  if (!feedback) {
    inputRef.current?.focus();
  }
}, [feedback]);

  // Timer/completion display
  let timeDisplay = "";
  if (startTime && finishTime) {
    const totalSec = Math.floor((finishTime - startTime) / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    timeDisplay = `${min > 0 ? min + " min " : ""}${sec < 10 ? "0" : ""}${sec} sec`;
  }

  // Unified feedback color
  const feedbackColor =
    feedback && feedback.startsWith("✅")
      ? "#047c2a"
      : feedback
      ? "#c43219"
      : "";

  // --- Handlers --- //
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleMenu() {
    router.push("/");
  }

  // Auto-return to main menu after finishing the game
useEffect(() => {
  if (items.length === 0 && finishTime != null) {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 1600); // 1.6 seconds delay for feedback, adjust as you like
    return () => clearTimeout(timeout);
  }
}, [items.length, finishTime, router]);

function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  const [letter, name] = items[0];

  if (stripGreekAccents(input) === stripGreekAccents(letter)) {
    const perfect = input === letter;
    setStreak(s => s + 1);
    setCorrectCount(n => n + 1);
    setBestStreak(now => Math.max(now, streak + 1));
    setItems(arr => shuffleArray(arr.slice(1)));
    // Add new feedback line to log (at the end)
    setLog(prev => [
      perfect
        ? `✅ Correct! Streak: ${streak + 1}`
        : `✅ Correct! The proper way is: ${letter}`,
        ...prev
    ]);
    setInput("");
  } else {
    setLog(prev => [
      `❌ Incorrect! The correct was: ${letter} (${name}). Your streak was: ${streak}`,
    ...prev
    ]);
    setBestStreak(now => Math.max(now, streak));
    setStreak(0);
    setItems(arr => shuffleArray(arr));
    setInput("");
  }
}

function FeedbackLog({ log }: { log: string[] }) {
  return (
    <div style={{
      margin: "1.7rem auto 0",
      maxWidth: 420,
      minHeight: 100,
      background: "#fff8ef",
      border: "1px solid #efb958",
      borderRadius: "7px",
      padding: "1.1rem 1.4rem",
      textAlign: "left",
      fontSize: "1.09rem",
      overflowY: "auto",
      maxHeight: 200
    }}>
      {log.length === 0 ? (
        <span style={{ color: "#969494" }}>Your feedback will appear here...</span>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {log.map((msg, i) => (
            <li key={i} style={{ marginBottom: 3 }}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  )
}


  function handleListen() {
  // This example uses `question` (shown to the user) from your QuizRound props.
  // If you want to read the *letter* instead (from items[0][0]), change accordingly.
  const msg = items[0][0]; // The Greek letter itself
  const utter = new window.SpeechSynthesisUtterance(msg);
  // Try to pick a Greek voice if available
  const voices = window.speechSynthesis.getVoices();
  const greekVoice = voices.find(v => v.lang && v.lang.startsWith("el"));
  if (greekVoice) utter.voice = greekVoice;
  utter.rate = 0.9;
  window.speechSynthesis.speak(utter);
}

  //--------------------- Conditional Routing ---------------------//

return (
  <main style={{ maxWidth: 500, margin: "2rem auto", textAlign: "center" }}>
    {items.length === 0 ? (
      <div>
        <h2>Finished!</h2>
        <div style={{ fontSize: "1.25rem", margin: "2rem 0" }}>
          Well done! You completed the quiz.
        </div>
        {/* Optionally display Stats or a loading spinner */}
      </div>
    ) : (
      <>
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
      </>
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
}