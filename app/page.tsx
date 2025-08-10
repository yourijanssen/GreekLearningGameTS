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

  // =============================================
  // DATA INITIALIZATION METHODS
  // =============================================
  
  const initializeMockProgress = () => {
    return {
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
  };

  const calculateCompletedGames = (progressData: ProgressData) => {
    return Object.values(progressData).filter((p) => p === 100).length;
  };

  const calculateLevel = (completedCount: number) => {
    return Math.floor(completedCount / 3) + 1; // Level up every 3 completed games
  };

  const loadProgressData = () => {
    const mockProgress = initializeMockProgress();
    setProgress(mockProgress);

    const completed = calculateCompletedGames(mockProgress);
    setCompletedGames(completed);
    setLevel(calculateLevel(completed));
  };

  // =============================================
  // LOCAL STORAGE METHODS
  // =============================================
  
  const checkForSavedGame = () => {
    try {
      const saved = localStorage.getItem("numbersGameState");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.remainingItems?.length > 0) {
          setHasResumeNumbersGame(true);
        }
      }
    } catch (error) {
      console.warn("Failed to parse saved game state:", error);
      // Ignore malformed data
    }
  };

  // =============================================
  // PROGRESS CALCULATION METHODS
  // =============================================
  
  const calculateOverallProgress = (progressData: ProgressData) => {
    const totalProgress = Object.values(progressData).reduce((sum, val) => sum + val, 0);
    const totalGames = Object.keys(progressData).length;
    return Math.round((totalProgress / (totalGames * 100)) * 100);
  };

  // =============================================
  // NAVIGATION METHODS
  // =============================================
  
  const handleStartGame = (gamePath: string) => {
    router.push(gamePath);
  };

  const handleResumeNumbers = () => {
    handleStartGame("/games/numbers");
  };

  const handleWelcomeStart = () => {
    handleStartGame("/alphabet");
  };

  // =============================================
  // GAME DATA CONFIGURATION METHODS
  // =============================================
  
  const getBeginnerGames = (progressData: ProgressData) => [
    { href: "/games/alphabet", title: "Alphabet Typing", progress: progressData.alphabet || 0 },
    { href: "/games/numbers", title: "Numbers Typing", progress: progressData.numbers || 0 },
    { href: "/games/weekdays", title: "Weekdays Typing", progress: progressData.weekdays || 0 },
    { href: "/games/vocabulary", title: "Basic Words Typing", progress: progressData.vocabulary || 0 },
    { href: "/games/names", title: "Greek Names Typing", progress: progressData.names || 0 },
  ];

  const getIntermediateGames = (progressData: ProgressData) => [
    { href: "/to-be", title: "To Be Grammar Typing", progress: progressData["to-be"] || 0 },
    { href: "/phrases", title: "Phrases Typing", progress: progressData.phrases || 0 },
    { href: "/verbs", title: "Verbs Typing", progress: progressData.verbs || 0 },
    { href: "/adjectives", title: "Adjectives Typing", progress: progressData.adjectives || 0 },
  ];

  const getAdvancedGames = () => [
    { href: "/sentences", title: "Sentences Typing", progress: 0 },
    { href: "/advanced-phrases", title: "Advanced Phrases Typing", progress: 0 },
    { href: "/advanced-verbs", title: "Advanced Verbs Typing", progress: 0 },
    { href: "/advanced-adjectives", title: "Advanced Adjectives Typing", progress: 0 },
  ];

  // =============================================
  // LANGUAGE HANDLING METHODS
  // =============================================
  
  const handleLanguageChange = (language: LanguageOption) => {
    setSelectedLanguage(language);
    // You might want to save this to localStorage or context
    // localStorage.setItem('selectedLanguage', language);
  };

  // =============================================
  // COMPONENT RENDERING METHODS
  // =============================================
  
  const renderResumeSection = () => {
    if (!hasResumeNumbersGame) return null;

    return (
      <section className="resume-section">
        <h3>Resume your last game</h3>
        <button
          className="resume-button"
          onClick={handleResumeNumbers}
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
    );
  };

  const renderLearningPaths = () => {
    const beginnerGames = getBeginnerGames(progress);
    const intermediateGames = getIntermediateGames(progress);
    const advancedGames = getAdvancedGames();

    return (
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
    );
  };

  // =============================================
  // EFFECTS
  // =============================================
  
  useEffect(() => {
    loadProgressData();
  }, []);

  useEffect(() => {
    checkForSavedGame();
  }, []);

  // =============================================
  // COMPUTED VALUES
  // =============================================
  
  const overallProgress = calculateOverallProgress(progress);

  // =============================================
  // MAIN RENDER
  // =============================================
  
  return (
    <main className="home-main">
      <Header 
        level={level} 
        completedGames={completedGames} 
        overallProgress={overallProgress} 
      />
      
      <LanguageSelector 
        selectedLanguage={selectedLanguage} 
        onLanguageChange={handleLanguageChange} 
      />
      
      <WelcomeSection onStart={handleWelcomeStart} />

      {renderResumeSection()}

      {renderLearningPaths()}

      <Achievements progress={progress} level={level} />
    </main>
  );
}