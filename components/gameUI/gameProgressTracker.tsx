"use client";
import React from "react";

/**
 * Displays game or progress statistics with elapsed time for quizzes, games, or learning sessions.
 * Fully customizable with props for labels, formatting, and styling.
 */
interface GameProgressTrackerProps {
  streak?: number; // Current streak of correct answers or actions
  bestStreak?: number; // Best streak achieved
  correctCount: number; // Number of correct answers or completed items
  total: number; // Total number of items or questions
  startTime: number | null; // Start timestamp (ms) for time tracking
  finishTime: number | null; // End timestamp (ms) for time tracking
  timeLabel?: string; // Custom label for time elapsed (default: "Time elapsed")
  streakLabel?: string; // Custom label for streak (default: "Streak")
  bestStreakLabel?: string; // Custom label for best streak (default: "Best")
  progressLabel?: string; // Custom label for progress (default: "Progress")
  timeFormat?: (seconds: number) => string; // Custom formatter for elapsed time
  separator?: string; // Separator between stats (default: " | ")
  containerStyle?: React.CSSProperties; // Custom styles for the container
  statsStyle?: React.CSSProperties; // Custom styles for the stats row
  timeStyle?: React.CSSProperties; // Custom styles for the time row
  className?: string; // Custom class for the container for external styling
}

export default function GameProgressTracker({
  streak = 0,
  bestStreak = 0,
  correctCount,
  total,
  startTime,
  finishTime,
  timeLabel = "Time elapsed",
  streakLabel = "Streak",
  bestStreakLabel = "Best",
  progressLabel = "Progress",
  timeFormat,
  separator = " | ",
  containerStyle = {},
  statsStyle = {},
  timeStyle = {},
  className = "",
}: GameProgressTrackerProps) {
  // Calculate elapsed time if startTime is provided
  const getElapsedTime = (): string => {
    if (!startTime) return "N/A";
    const end = finishTime || Date.now();
    const elapsedSeconds = Math.floor((end - startTime) / 1000);
    if (timeFormat) return timeFormat(elapsedSeconds);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return `${minutes > 0 ? `${minutes}m ` : ""}${seconds < 10 ? "0" : ""}${seconds}s`;
  };

  // Default inline styles (can be overridden by props or external CSS)
  const defaultContainerStyle: React.CSSProperties = {
    marginTop: "2.3rem",
    fontWeight: 500,
    fontSize: "1.22rem",
    textAlign: "center",
    ...containerStyle,
  };

  const defaultStatsStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    ...statsStyle,
  };

  const defaultTimeStyle: React.CSSProperties = {
    marginTop: "0.5rem",
    color: "#555",
    ...timeStyle,
  };

  return (
    <div
      style={defaultContainerStyle}
      className={className}
      role="status"
      aria-label="Game progress statistics"
    >
      <div style={defaultStatsStyle}>
        {streak !== undefined && (
          <span>
            {streakLabel}: {streak}
          </span>
        )}
        {bestStreak !== undefined && (
          <>
            {streak !== undefined && separator}
            <span>
              {bestStreakLabel}: {bestStreak}
            </span>
          </>
        )}
        <span>
          {progressLabel}: {correctCount}/{total}
        </span>
      </div>
      {startTime && (
        <div style={defaultTimeStyle}>
          {timeLabel}: {getElapsedTime()}
        </div>
      )}
    </div>
  );
}