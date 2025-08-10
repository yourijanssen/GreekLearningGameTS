"use client";
import React from "react";
import { BaseQuizGame } from "@/components/gameUI/BaseQuizGame";
import { useGenericQuizGame } from "@/hooks/useGenericQuizGame";
import { greekNumbers } from "@/data/english1/greekNumbers";
import { shuffleArray } from "@/lib/utils/utilities";

/** Storage key for persisting "to be" verb game state in localStorage */
const STORAGE_KEY = "toBeGameState";

const ToBeGame: React.FC = () => {
  const gameState = useGenericQuizGame({
    data: shuffleArray(greekNumbers),
    storageKey: STORAGE_KEY,
    speechType: "number",
  });

    return (
      <BaseQuizGame
        {...gameState}
        data={greekNumbers}
        questionPrompt="Type the Greek number for:"
        datasetTitle="Greek Numbers Dataset"
        firstColumnLabel="Greek Number"
        secondColumnLabel="English Number"
        buttonText="📊 View Quiz Data"
      />
    );
  };
  

export default ToBeGame;