"use client";
import React from "react";
import { BaseQuizGame } from "@/components/gameUI/BaseQuizGame";
import { useGenericQuizGame } from "@/hooks/useGenericQuizGame";
import { shuffleArray } from "@/lib/utils/utilities";
import { greekWeekdays } from "@/data/english1/greekWeekdays";

/** Storage key for persisting weekdays game state in localStorage */
const STORAGE_KEY = "weekdaysGameState";

const WeekdaysGame: React.FC = () => {
  const gameState = useGenericQuizGame({
    data: shuffleArray(greekWeekdays),
    storageKey: STORAGE_KEY,
    speechType: "number",
  });

  return (
    <BaseQuizGame
      {...gameState}
      data={greekWeekdays}
      questionPrompt="Type the Greek weekday for:"
      datasetTitle="Greek Weekdays Dataset"
      firstColumnLabel="Greek Weekday"
      secondColumnLabel="English Weekday"
      buttonText="📊 View Quiz Data"
    />
  );
};

export default WeekdaysGame;