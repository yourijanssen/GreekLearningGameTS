"use client";
import React from "react";

import { useGenericQuizGame } from "@/hooks/useGenericQuizGame";
import { greekLetters } from "@/data/english1/greekLetters";
import { shuffleArray } from "@/lib/utils/utilities";
import { BaseQuizGame } from "@/components/gameUI/BaseQuizGame";

// Example: In real app, get from auth/session/context!
const userId = "1"; // Replace with actual logged-in user's ID
const gameType = "greek-letters-alphabet";

const AlphabetGame: React.FC = () => {
  const gameState = useGenericQuizGame({
    data: shuffleArray(greekLetters),
    userId,
    gameType,
    speechType: "number",
  });

  return (
    <BaseQuizGame
      {...gameState}
      data={greekLetters}
      questionPrompt="Type the Greek letter for:"
      datasetTitle="Greek Letters Dataset"
      firstColumnLabel="Greek Letter"
      secondColumnLabel="English Letter"
      buttonText="📊 View Quiz Data"
    />
  );
};

export default AlphabetGame;