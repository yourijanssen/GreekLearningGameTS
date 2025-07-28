// gameTypes.ts
export interface QuizItem {
  question: string;
  answer: string;
}

export interface GameStats {
  streak: number;
  bestStreak: number;
  correctCount: number;
  total: number;
  startTime: number | null;
  finishTime: number | null;
}

export interface QuizRoundProps {
  question: string;
  input: string;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  feedback: string | null;
  feedbackColor: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  disabled: boolean;
  onMenu: () => void;
  onListen: () => void;
}

export interface FeedbackLogProps {
  log: string[];
}

export interface GameOverProps {
  onMenu: () => void;
}

export interface ProgressData {
  [key: string]: number;
}

export interface GameLinkProps {
  href: string;
  title: string;
  progress: number;
}

export interface BadgeProps {
  title: string;
  unlocked: boolean;
  emoji: string;
}

export interface HeaderProps {
  level: number;
  completedGames: number;
  overallProgress: number;
}
