// hooks/useFeedback.ts
import { useState } from "react";

export function useFeedback(): {
  feedback: string | null;
  feedbackColor: string;
  setFeedbackMessage: (message: string, duration?: number) => void;
} {
  const [feedback, setFeedback] = useState<string | null>(null);

  // Unified feedback color
  const feedbackColor =
    feedback && feedback.startsWith("✅")
      ? "#047c2a"
      : feedback
      ? "#c43219"
      : "";

  const setFeedbackMessage = (message: string, duration: number = 1000) => {
    setFeedback(message);
    setTimeout(() => setFeedback(null), duration);
  };

  return { feedback, feedbackColor, setFeedbackMessage };
}
