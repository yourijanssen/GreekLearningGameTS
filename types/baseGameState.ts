// types/GameState.ts
export interface BaseGameState {
  remainingItems: [string, string][];
  streak: number;
  bestStreak: number;
  correctCount: number;
  log: string[];
}
