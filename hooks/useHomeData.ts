import { useState, useEffect } from "react";
import { LanguageOption } from "@/types/auth";
import { ProgressData } from "@/types/game";
import { ProgressService } from "@/lib/services/ProgressService";
import { StorageService } from "@/lib/services/StorageService";

export const useHomeData = () => {
  const [progress, setProgress] = useState<ProgressData>({});
  const [level, setLevel] = useState(1);
  const [completedGames, setCompletedGames] = useState(0);
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageOption>("english");
  const [hasResumeNumbersGame, setHasResumeNumbersGame] = useState(false);

  const loadData = () => {
    const {
      progress: loadedProgress,
      completedGames: completed,
      level: userLevel,
    } = ProgressService.loadProgressData();

    setProgress(loadedProgress);
    setCompletedGames(completed);
    setLevel(userLevel);
  };

  const checkSavedGame = () => {
    const hasSaved = StorageService.checkForSavedGame();
    setHasResumeNumbersGame(hasSaved);
  };

  const handleLanguageChange = (language: LanguageOption) => {
    setSelectedLanguage(language);
    StorageService.saveLanguagePreference(language);
  };

  useEffect(() => {
    loadData();
    checkSavedGame();
  }, []);

  return {
    progress,
    level,
    completedGames,
    selectedLanguage,
    hasResumeNumbersGame,
    handleLanguageChange,
  };
};
