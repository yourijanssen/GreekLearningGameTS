"use client";
import React from "react";

import { useGenericQuizGame } from "@/hooks/useGenericQuizGame";
import { greekLetters } from "@/data/english1/greekLetters";
import { shuffleArray } from "@/lib/utils/utilities";
import { BaseQuizGame } from "@/components/gameUI/BaseQuizGame";

/** Storage key for persisting alphabet game state in localStorage */
const STORAGE_KEY = "alphabetGameState";


const AlphabetGame: React.FC = () => {
  const gameState = useGenericQuizGame({
    data: shuffleArray(greekLetters),
    storageKey: STORAGE_KEY,
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