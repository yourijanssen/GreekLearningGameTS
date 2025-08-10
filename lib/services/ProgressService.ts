import { ProgressData } from "@/types/game";

export class ProgressService {
  private static readonly LEVEL_UP_THRESHOLD = 3;

  static initializeMockProgress(): ProgressData {
    return {
      alphabet: 50,
      numbers: 20,
      weekdays: 0,
      vocabulary: 0,
      names: 0,
      "to-be": 0,
      phrases: 0,
      verbs: 0,
      adjectives: 0,
      sentences: 0,
    };
  }

  static calculateCompletedGames(progressData: ProgressData): number {
    return Object.values(progressData).filter((p) => p === 100).length;
  }

  static calculateLevel(completedCount: number): number {
    return Math.floor(completedCount / this.LEVEL_UP_THRESHOLD) + 1;
  }

  static calculateOverallProgress(progressData: ProgressData): number {
    const totalProgress = Object.values(progressData).reduce(
      (sum, val) => sum + val,
      0
    );
    const totalGames = Object.keys(progressData).length;
    return Math.round((totalProgress / (totalGames * 100)) * 100);
  }

  static loadProgressData(): {
    progress: ProgressData;
    completedGames: number;
    level: number;
  } {
    const progress = this.initializeMockProgress();
    const completedGames = this.calculateCompletedGames(progress);
    const level = this.calculateLevel(completedGames);

    return { progress, completedGames, level };
  }
}
