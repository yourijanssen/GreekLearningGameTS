// pages/index.tsx or Home.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProgressData } from "./interfaces/types";
import { Achievements, Header, LearningPath, WelcomeSection } from "./UI/homePageUI";


// Main Home Component (Orchestrator)
export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressData>({});
  const [level, setLevel] = useState(1);
  const [completedGames, setCompletedGames] = useState(0);

  // Mock progress data (in a real app, fetch this from localStorage or a backend)
  useEffect(() => {
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

  // Function to handle starting a game
  const startGame = (gamePath: string) => {
    router.push(gamePath);
  };

  // Beginner Path Games
  const beginnerGames = [
    { href: "/alphabet", title: "Alphabet Typing", progress: progress.alphabet || 0 },
    { href: "/numbers", title: "Numbers Typing", progress: progress.numbers || 0 },
    { href: "/weekdays", title: "Weekdays Typing", progress: progress.weekdays || 0 },
    { href: "/vocabulary", title: "Basic Words Typing", progress: progress.vocabulary || 0 },
    { href: "/names", title: "Greek Names Typing", progress: progress.names || 0 },
  ];

  // Intermediate Path Games
  const intermediateGames = [
    { href: "/to-be", title: "To Be Grammar Typing", progress: progress["to-be"] || 0 },
    { href: "/phrases", title: "Phrases Typing", progress: progress.phrases || 0 },
    { href: "/verbs", title: "Verbs Typing", progress: progress.verbs || 0 },
    { href: "/adjectives", title: "Adjectives Typing", progress: progress.adjectives || 0 },
  ];

  // Advanced Path Games
  const advancedGames = [
    { href: "/sentences", title: "Sentences Typing", progress: progress.sentences || 0 },
    { href: "/advanced-phrases", title: "Advanced Phrases Typing", progress: 0 },
    { href: "/advanced-verbs", title: "Advanced Verbs Typing", progress: 0 },
    { href: "/advanced-adjectives", title: "Advanced Adjectives Typing", progress: 0 },
  ];

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
      <Header
        level={level}
        completedGames={completedGames}
        overallProgress={overallProgress}
      />
      <WelcomeSection onStart={() => startGame("/alphabet")} />
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
          <LearningPath
            title="Beginner Path"
            emoji="🐣"
            description="Build your foundation with the basics of Greek."
            borderColor="#62a0ff"
            games={beginnerGames}
          />
          <LearningPath
            title="Intermediate Path"
            emoji="🌿"
            description="Expand your skills with grammar and phrases."
            borderColor="#efb958"
            games={intermediateGames}
          />
          <LearningPath
            title="Advanced Path"
            emoji="🦅"
            description="Master Greek with complex structures."
            borderColor="#c43219"
            games={advancedGames}
          />
        </div>
      </section>
      <Achievements progress={progress} level={level} />
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