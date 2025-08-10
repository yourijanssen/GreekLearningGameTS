"use client";
import React from "react";
import { BaseQuizGame } from "@/components/gameUI/BaseQuizGame";
import { useGenericQuizGame } from "@/hooks/useGenericQuizGame";

import { shuffleArray } from "@/lib/utils/utilities";
import greekNames from "@/data/english1/greekNames";

/** Storage key for persisting game state in localStorage */
const STORAGE_KEY = "numbersGameState";

const NamesGame: React.FC = () => {
  const gameState = useGenericQuizGame({
    data: shuffleArray(greekNames),
    storageKey: STORAGE_KEY,
    speechType: "number",
  });

  return (
    <BaseQuizGame
      {...gameState}
      data={greekNames}
      questionPrompt="Type the Greek name for:"
      datasetTitle="Greek Names Dataset"
      firstColumnLabel="Greek Name"
      secondColumnLabel="English Name"
      buttonText="📊 View Names"
    />
  );
};

export default NamesGame;