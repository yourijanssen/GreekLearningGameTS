"use client";
import React from "react";
import { BaseQuizGame } from "@/components/gameUI/BaseQuizGame";
import { useGenericQuizGame } from "@/hooks/useGenericQuizGame";
import { shuffleArray } from "@/lib/utils/utilities";
import { greekToBe } from "@/data/english1/greekToBe";

/** Storage key for persisting "to be" verb game state in localStorage */
const STORAGE_KEY = "toBeGameState";

const ToBeGame: React.FC = () => {
  const gameState = useGenericQuizGame({
    data: shuffleArray(greekToBe),
    storageKey: STORAGE_KEY,
    speechType: "number",
  });

    return (
      <BaseQuizGame
        {...gameState}
        data={greekToBe}
        questionPrompt="Type the Greek weekday for:"
        datasetTitle="Greek Quiz Dataset"
        firstColumnLabel="Greek Weekday"
        secondColumnLabel="English Weekday"
        buttonText="📊 View Quiz Data"
      />
    );
  };
  

export default ToBeGame;