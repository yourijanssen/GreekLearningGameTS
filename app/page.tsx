// pages/index.tsx or Home.tsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [level, setLevel] = useState(1);
  const [completedGames, setCompletedGames] = useState(0);

  // Mock progress data (in a real app, fetch this from localStorage or a backend)
  useEffect(() => {
    // Simulate loading user progress (e.g., from localStorage)
    const mockProgress = {
      alphabet: 50, // Percentage complete
      numbers: 20,
      weekdays: 0,
      vocabulary: 0,
      names: 0,
      "to-be": 0,
      phrases: 0,
      verbs: 0,
      adjectives: 0,
      sentences: 0,
    };
    setProgress(mockProgress);

    // Calculate completed games and level
    const completed = Object.values(mockProgress).filter((p) => p === 100).length;
    setCompletedGames(completed);
    setLevel(Math.floor(completed / 3) + 1); // Level up every 3 completed games
  }, []);

  // Calculate overall progress percentage
  const overallProgress = Math.round(
    Object.values(progress).reduce((sum, val) => sum + val, 0) /
      (Object.keys(progress).length * 100) *
      100
  );

  // Function to handle starting a game (could track analytics or save state)
  const startGame = (gamePath: string) => {
    router.push(gamePath);
  };

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: 800,
        margin: "auto",
        background: "linear-gradient(to bottom, #f5f9ff, #e0eaff)",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header with Title and User Level */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          borderBottom: "2px solid #004d82",
          paddingBottom: "1rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            color: "#004d82",
            margin: 0,
          }}
        >
          Greek Learning Odyssey 🇬🇷
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#555", margin: "0.5rem 0" }}>
          Level {level} Learner | {completedGames} Games Mastered
        </p>
        {/* Overall Progress Bar */}
        <div
          style={{
            width: "80%",
            height: "20px",
            background: "#ddd",
            borderRadius: "10px",
            overflow: "hidden",
            margin: "1rem auto",
            border: "1px solid #bbb",
          }}
        >
          <div
            style={{
              width: `${overallProgress}%`,
              height: "100%",
              background: "#047c2a",
              transition: "width 0.5s ease",
            }}
          />
        </div>
        <small style={{ color: "#777" }}>
          Overall Progress: {overallProgress}%
        </small>
      </header>

      {/* Introduction/Welcome Section */}
      <section
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "1.5rem",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", color: "#004d82", marginTop: 0 }}>
          Welcome to Your Greek Journey!
        </h2>
        <p style={{ fontSize: "1.1rem", color: "#333", marginBottom: "1rem" }}>
          Learn Greek through interactive typing games. Progress through levels,
          earn badges, and master the language one step at a time!
        </p>
        <button
          onClick={() => startGame("/alphabet")}
          style={{
            padding: "0.7rem 1.5rem",
            fontSize: "1.1rem",
            background: "#047c2a",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "#035f20")
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "#047c2a")}
        >
          Start Learning Now
        </button>
      </section>

      {/* Learning Paths */}
      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.8rem",
            color: "#004d82",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Learning Paths
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Beginner Path */}
          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              borderLeft: "5px solid #62a0ff",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                color: "#004d82",
                marginTop: 0,
                marginBottom: "1rem",
              }}
            >
              Beginner Path 🐣
            </h3>
            <p style={{ color: "#555", marginBottom: "1rem" }}>
              Build your foundation with the basics of Greek.
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <GameLink
                href="/alphabet"
                title="Alphabet Typing"
                progress={progress.alphabet}
              />
              <GameLink
                href="/numbers"
                title="Numbers Typing"
                progress={progress.numbers}
              />
              <GameLink
                href="/weekdays"
                title="Weekdays Typing"
                progress={progress.weekdays}
              />
              <GameLink
                href="/vocabulary"
                title="Basic Words Typing"
                progress={progress.vocabulary}
              />
              <GameLink
                href="/names"
                title="Greek Names Typing"
                progress={progress.names}
              />
            </nav>
          </div>

          {/* Intermediate Path */}
          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              borderLeft: "5px solid #efb958",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                color: "#004d82",
                marginTop: 0,
                marginBottom: "1rem",
              }}
            >
              Intermediate Path 🌿
            </h3>
            <p style={{ color: "#555", marginBottom: "1rem" }}>
              Expand your skills with grammar and phrases.
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <GameLink
                href="/to-be"
                title="To Be Grammar Typing"
                progress={progress["to-be"]}
              />
              <GameLink
                href="/phrases"
                title="Phrases Typing"
                progress={progress.phrases}
              />
              <GameLink
                href="/verbs"
                title="Verbs Typing"
                progress={progress.verbs}
              />
              <GameLink
                href="/adjectives"
                title="Adjectives Typing"
                progress={progress.adjectives}
              />
            </nav>
          </div>

          {/* Advanced Path */}
          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              borderLeft: "5px solid #c43219",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                color: "#004d82",
                marginTop: 0,
                marginBottom: "1rem",
              }}
            >
              Advanced Path 🦅
            </h3>
            <p style={{ color: "#555", marginBottom: "1rem" }}>
              Master Greek with complex structures.
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <GameLink
                href="/sentences"
                title="Sentences Typing"
                progress={progress.sentences}
              />
              <GameLink
                href="/advanced-phrases"
                title="Advanced Phrases Typing"
                progress={0} // Duplicate corrected to unique path if needed
              />
              <GameLink
                href="/advanced-verbs"
                title="Advanced Verbs Typing"
                progress={0} // Duplicate corrected to unique path if needed
              />
              <GameLink
                href="/advanced-adjectives"
                title="Advanced Adjectives Typing"
                progress={0} // Duplicate corrected to unique path if needed
              />
            </nav>
          </div>
        </div>
      </section>

      {/* Achievements/Badges Section */}
      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.8rem",
            color: "#004d82",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Your Achievements
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
            background: "#fff",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <Badge
            title="Alphabet Ace"
            unlocked={progress.alphabet === 100}
            emoji="🔤"
          />
          <Badge
            title="Number Ninja"
            unlocked={progress.numbers === 100}
            emoji="🔢"
          />
          <Badge
            title="Grammar Guru"
            unlocked={progress["to-be"] === 100}
            emoji="📘"
          />
          <Badge
            title="Sentence Sage"
            unlocked={progress.sentences === 100}
            emoji="💬"
          />
          <Badge
            title="Level 3 Learner"
            unlocked={level >= 3}
            emoji="⭐"
          />
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: "3rem",
          textAlign: "center",
          color: "#888",
          padding: "1rem",
          borderTop: "1px solid #ccc",
        }}
      >
        <small>Learn Greek by Playing Typing Games!</small>
        <br />
        <small>Made with ❤️ by <i>Youri Janssen</i></small>
      </footer>
    </main>
  );
}

// Reusable Game Link Component with Progress Indicator
function GameLink({
  href,
  title,
  progress,
}: {
  href: string;
  title: string;
  progress: number;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Link
        href={href}
        style={{
          color: progress === 100 ? "#047c2a" : "#004d82",
          textDecoration: "none",
          fontWeight: progress > 0 ? 600 : 400,
          transition: "color 0.3s ease",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.color =
            progress === 100 ? "#035f20" : "#002a5c")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.color =
            progress === 100 ? "#047c2a" : "#004d82")
        }
      >
        {title}
      </Link>
      {progress > 0 && progress < 100 && (
        <span style={{ color: "#efb958", fontSize: "0.8rem" }}>
          {progress}%
        </span>
      )}
      {progress === 100 && (
        <span style={{ color: "#047c2a", fontSize: "0.8rem" }}>✓</span>
      )}
    </div>
  );
}

// Reusable Badge Component for Achievements
function Badge({
  title,
  unlocked,
  emoji,
}: {
  title: string;
  unlocked: boolean;
  emoji: string;
}) {
  return (
    <div
      style={{
        textAlign: "center",
        width: "120px",
        padding: "1rem 0.5rem",
        background: unlocked ? "#e8f4ff" : "#f0f0f0",
        borderRadius: "8px",
        border: unlocked ? "2px solid #62a0ff" : "2px solid #ccc",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{emoji}</div>
      <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#333" }}>
        {title}
      </div>
      <div
        style={{
          fontSize: "0.7rem",
          color: unlocked ? "#047c2a" : "#888",
          marginTop: "0.3rem",
        }}
      >
        {unlocked ? "Unlocked!" : "Locked"}
      </div>
    </div>
  );
}