"use client";
import React from "react";
import { BaseQuizGame } from "@/components/gameUI/BaseQuizGame";
import { useGenericQuizGame } from "@/hooks/useGenericQuizGame";
import { greekNumbers } from "@/data/english1/greekNumbers";
import { shuffleArray } from "@/lib/utils/utilities";


/** Storage key for persisting game state in localStorage */
const STORAGE_KEY = "numbersGameState";

/**
 * NumbersGame Component
 * 
 * A quiz game where users learn Greek numbers by typing the Greek word
 * for the displayed English number. Features include:
 * - Speech synthesis for pronunciation
 * - Integrated keyboard language detection and status display
 * - Data peek functionality with unlimited access to complete dataset
 * - Responsive layout (side-by-side on desktop, stacked on mobile)
 * - Streak tracking with detailed feedback showing answers
 * - Game state persistence across sessions
 * - Progress tracking with comprehensive statistics
 * - Auto-navigation when complete
 * - Enhanced logging that shows both user input and correct answers
 * 
 * @returns {React.FC} The NumbersGame component
 */
const NumbersGame: React.FC = () => {
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

export default NumbersGame;