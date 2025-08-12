"use client";
import React from "react";
import { BaseQuizGame } from "@/components/gameUI/BaseQuizGame";
import { useGenericQuizGame } from "@/hooks/useGenericQuizGame";

import { shuffleArray } from "@/lib/utils/utilities";
import greekNames from "@/data/english1/greekNames";

// Example: In real app, get from auth/session/context!
const userId = "1"; // Replace with actual logged-in user's ID
const gameType = "greek-letters-alphabet";

const NamesGame: React.FC = () => {
  const gameState = useGenericQuizGame({
    data: shuffleArray(greekNames),
     userId,
    gameType,
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
      buttonText="📊 View Quiz Data"
    />
  );
};

export default NamesGame;