"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Header,
  WelcomeSection,
  LearningPath,
  Achievements,
} from "@/components/gameUI/homePageUI";
import { LanguageSelector } from "@/lib/utils/LanguageSelector";
import { LanguageOption } from "@/types/auth";
import { ProgressData } from "@/types/game";
import "@/styles/home.css";

// Main Home Component (Orchestrator)
export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressData>({});
  const [level, setLevel] = useState(1);
  const [completedGames, setCompletedGames] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>('english');
  const [hasResumeNumbersGame, setHasResumeNumbersGame] = useState(false);

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

  // Check if a saved game exists in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("numbersGameState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.remainingItems?.length > 0) {
          setHasResumeNumbersGame(true);
        }
      } catch {
        // Ignore malformed data
      }
    }
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
    { href: "/games/alphabet", title: "Alphabet Typing", progress: progress.alphabet || 0 },
    { href: "/games/numbers", title: "Numbers Typing", progress: progress.numbers || 0 },
    { href: "/games/weekdays", title: "Weekdays Typing", progress: progress.weekdays || 0 },
    { href: "/games/vocabulary", title: "Basic Words Typing", progress: progress.vocabulary || 0 },
    { href: "/games/names", title: "Greek Names Typing", progress: progress.names || 0 },
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
    <main className="home-main">
      <Header level={level} completedGames={completedGames} overallProgress={overallProgress} />
      <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
      <WelcomeSection onStart={() => startGame("/alphabet")} />

      {hasResumeNumbersGame && (
        <section className="resume-section">
          <h3>Resume your last game</h3>
          <button
            className="resume-button"
            onClick={() => startGame("/games/numbers")}
            style={{
              backgroundColor: "#efb958",
              color: "#000",
              border: "none",
              borderRadius: "5px",
              padding: "0.7rem 1.2rem",
              fontSize: "1rem",
              cursor: "pointer",
              marginBottom: "1rem"
            }}
          >
            ▶ Resume Numbers Typing
          </button>
        </section>
      )}

      <section className="home-section">
        <h2 className="home-section-title">Learning Paths</h2>
        <div className="home-paths-grid">
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
    </main>
  );
}
