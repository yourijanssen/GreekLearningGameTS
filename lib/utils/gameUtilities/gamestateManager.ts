// utils/GameStateManager.ts

import { BaseGameState } from "@/types/BaseGameState";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export class GameStateManager {
  /**
   * Loads saved game state from the backend
   *
   * @param userId
   * @param gameType
   * @returns Promise<BaseGameState | null>
   */
  static async loadGameState(
    userId: string,
    gameType: string
  ): Promise<BaseGameState | null> {
    const res = await fetch(`${BASE_URL}/getGameState/${userId}/${gameType}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.gameState as BaseGameState | null;
  }

  /**
   * Persists game state to the backend
   *
   * @param userId
   * @param gameType
   * @param gameState
   */
  static async saveGameState(
    userId: string,
    gameType: string,
    gameState: BaseGameState
  ): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/saveGameState`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        gameType,
        gameState,
      }),
    });
    return res.ok;
  }

  /**
   * Clears game state from the backend for a specific game
   *
   * @param userId
   * @param gameType
   */
  static async clearGameState(
    userId: string,
    gameType: string
  ): Promise<boolean> {
    const res = await fetch(
      `${BASE_URL}/clearGameState/${userId}/${gameType}`,
      {
        method: "DELETE",
      }
    );
    return res.ok;
  }

  /**
   * Clears all game states for a user
   *
   * @param userId
   */
  static async clearAllGameStates(userId: string): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/clearAllGameStates/${userId}`, {
      method: "DELETE",
    });
    return res.ok;
  }
}
