// hooks/useGameTimer.ts
import { useState, useEffect } from "react";

export function useGameTimer(isGameFinished: boolean): {
  startTime: number | null;
  finishTime: number | null;
} {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [finishTime, setFinishTime] = useState<number | null>(null);

  // Timer start on mount
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  // Set finishTime when game is done
  useEffect(() => {
    if (isGameFinished && finishTime == null) {
      setFinishTime(Date.now());
    }
  }, [isGameFinished, finishTime]);

  return { startTime, finishTime };
}
