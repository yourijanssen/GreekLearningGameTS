import { ProgressData } from "@/types/game";

export interface GameConfig {
  href: string;
  title: string;
  progress: number;
}

export interface PathConfig {
  title: string;
  emoji: string;
  description: string;
  borderColor: string;
  games: GameConfig[];
}

export class GameConfigService {
  static getBeginnerGames(progressData: ProgressData): GameConfig[] {
    return [
      {
        href: "/games/alphabet",
        title: "Alphabet Typing",
        progress: progressData.alphabet || 0,
      },
      {
        href: "/games/numbers",
        title: "Numbers Typing",
        progress: progressData.numbers || 0,
      },
      {
        href: "/games/weekdays",
        title: "Weekdays Typing",
        progress: progressData.weekdays || 0,
      },
      {
        href: "/games/vocabulary",
        title: "Basic Words Typing",
        progress: progressData.vocabulary || 0,
      },
      {
        href: "/games/names",
        title: "Greek Names Typing",
        progress: progressData.names || 0,
      },
    ];
  }

  static getIntermediateGames(progressData: ProgressData): GameConfig[] {
    return [
      {
        href: "/to-be",
        title: "To Be Grammar Typing",
        progress: progressData["to-be"] || 0,
      },
      {
        href: "/phrases",
        title: "Phrases Typing",
        progress: progressData.phrases || 0,
      },
      {
        href: "/verbs",
        title: "Verbs Typing",
        progress: progressData.verbs || 0,
      },
      {
        href: "/adjectives",
        title: "Adjectives Typing",
        progress: progressData.adjectives || 0,
      },
    ];
  }

  static getAdvancedGames(): GameConfig[] {
    return [
      { href: "/sentences", title: "Sentences Typing", progress: 0 },
      {
        href: "/advanced-phrases",
        title: "Advanced Phrases Typing",
        progress: 0,
      },
      { href: "/advanced-verbs", title: "Advanced Verbs Typing", progress: 0 },
      {
        href: "/advanced-adjectives",
        title: "Advanced Adjectives Typing",
        progress: 0,
      },
    ];
  }

  static getAllPaths(progressData: ProgressData): PathConfig[] {
    return [
      {
        title: "Beginner Path",
        emoji: "🐣",
        description: "Build your foundation with the basics of Greek.",
        borderColor: "#62a0ff",
        games: this.getBeginnerGames(progressData),
      },
      {
        title: "Intermediate Path",
        emoji: "🌿",
        description: "Expand your skills with grammar and phrases.",
        borderColor: "#efb958",
        games: this.getIntermediateGames(progressData),
      },
      {
        title: "Advanced Path",
        emoji: "🦅",
        description: "Master Greek with complex structures.",
        borderColor: "#c43219",
        games: this.getAdvancedGames(),
      },
    ];
  }
}
