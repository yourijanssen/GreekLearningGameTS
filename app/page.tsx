"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Header,
  WelcomeSection,
  Achievements,
} from "@/components/gameUI/homePageUI";
import { LanguageSelector } from "@/lib/utils/LanguageSelector";
import { NavigationService } from "@/lib/services/NavigationService";
import { ProgressService } from "@/lib/services/ProgressService";
import "@/styles/home.css";
import { useHomeData } from "@/hooks/useHomeData";
import { LearningPathsSection } from "@/components/gameUI/home/LearningPathsSection";
import { ResumeGameSection } from "@/components/gameUI/home/ResumeGameSection";
import { ResetGamesButton } from "@/components/gameUI/home/ResetGamesButtonProps";

export default function Home() {
  const router = useRouter();
  const navigationService = new NavigationService(router);
  
  const {
    progress,
    level,
    completedGames,
    selectedLanguage,
    hasResumeNumbersGame,
    handleLanguageChange,
  } = useHomeData();

  // Computed values
  const overallProgress = ProgressService.calculateOverallProgress(progress);

  // Event handlers
  const handleWelcomeStart = () => {
    navigationService.navigateToAlphabet();
  };

  const handleResumeNumbers = () => {
    navigationService.navigateToNumbers();
  };

    const handleGameReset = () => {
    console.log("All games have been reset");
    // Optional: Update any state that needs refreshing
  };

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

      <ResumeGameSection 
        hasResumeGame={hasResumeNumbersGame}
        onResume={handleResumeNumbers}
      />

      <LearningPathsSection progress={progress} />

      <Achievements progress={progress} level={level} />

      <ResetGamesButton onReset={handleGameReset} />
    </main>
  );
}