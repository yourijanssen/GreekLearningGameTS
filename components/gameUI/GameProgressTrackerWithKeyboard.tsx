import React from "react";
import KeyboardLanguageStatus from "./KeyboardLanguageStatus";

interface GameProgressTrackerWithKeyboardProps {
  streak: number;
  bestStreak: number;
  correctCount: number;
  total: number;
  startTime: number | null;
  finishTime: number | null;
  streakLabel?: string;
  bestStreakLabel?: string;
  progressLabel?: string;
  timeLabel?: string;
  /** Whether the component is in sidebar mode */
  sidebarMode?: boolean;
}

/**
 * Enhanced GameProgressTracker that includes keyboard language status
 * Adapts layout based on whether it's in sidebar or inline mode
 */
const GameProgressTrackerWithKeyboard: React.FC<GameProgressTrackerWithKeyboardProps> = ({
  streak,
  bestStreak,
  correctCount,
  total,
  startTime,
  finishTime,
  streakLabel = "Current Streak",
  bestStreakLabel = "Top Streak",
  progressLabel = "Completed",
  timeLabel = "Time Taken",
  sidebarMode = false,
}) => {
  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 
      ? `${minutes}m ${remainingSeconds}s` 
      : `${remainingSeconds}s`;
  };

  const getElapsedTime = (): string => {
    if (!startTime) return "0s";
    const endTime = finishTime || Date.now();
    return formatTime(endTime - startTime);
  };

  const progressPercentage = total > 0 ? (correctCount / total) * 100 : 0;

  const containerStyles: React.CSSProperties = {
    margin: sidebarMode ? "0" : "1.5rem auto 0",
    maxWidth: sidebarMode ? "none" : 500,
    padding: sidebarMode ? "1rem" : "1.2rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
    position: sidebarMode ? "sticky" : "relative",
    top: sidebarMode ? "2rem" : "auto",
  };

  return (
    <div style={containerStyles}>
      {/* Header with Keyboard Status */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: sidebarMode ? "1rem" : "1.1rem",
            color: "#495057",
            fontWeight: "600",
          }}
        >
          {sidebarMode ? "Progress" : "Game Progress"}
        </h3>
        
        <KeyboardLanguageStatus compact={true} />
      </div>

      {/* Progress Stats - Adapted for sidebar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: sidebarMode ? "1fr" : "1fr 1fr",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        {/* Streak Stats */}
        <div style={{ 
          textAlign: "center",
          ...(sidebarMode && {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "left" as const,
          })
        }}>
          <div style={{ 
            fontSize: "0.8rem", 
            color: "#6c757d", 
            marginBottom: sidebarMode ? "0" : "4px"
          }}>
            {streakLabel}
          </div>
          <div style={{ 
            fontSize: sidebarMode ? "1.2rem" : "1.5rem", 
            fontWeight: "bold", 
            color: "#28a745" 
          }}>
            {streak}
          </div>
        </div>

        <div style={{ 
          textAlign: "center",
          ...(sidebarMode && {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "left" as const,
          })
        }}>
          <div style={{ 
            fontSize: "0.8rem", 
            color: "#6c757d", 
            marginBottom: sidebarMode ? "0" : "4px"
          }}>
            {bestStreakLabel}
          </div>
          <div style={{ 
            fontSize: sidebarMode ? "1.2rem" : "1.5rem", 
            fontWeight: "bold", 
            color: "#ffc107" 
          }}>
            {bestStreak}
          </div>
        </div>

        {/* Progress Stats */}
        <div style={{ 
          textAlign: "center",
          ...(sidebarMode && {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "left" as const,
          })
        }}>
          <div style={{ 
            fontSize: "0.8rem", 
            color: "#6c757d", 
            marginBottom: sidebarMode ? "0" : "4px"
          }}>
            {progressLabel}
          </div>
          <div style={{ 
            fontSize: "1.2rem", 
            fontWeight: "600", 
            color: "#007bff" 
          }}>
            {correctCount}/{total}
          </div>
        </div>

        <div style={{ 
          textAlign: "center",
          ...(sidebarMode && {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "left" as const,
          })
        }}>
          <div style={{ 
            fontSize: "0.8rem", 
            color: "#6c757d", 
            marginBottom: sidebarMode ? "0" : "4px"
          }}>
            {timeLabel}
          </div>
          <div style={{ 
            fontSize: "1.2rem", 
            fontWeight: "600", 
            color: "#6f42c1" 
          }}>
            {getElapsedTime()}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginTop: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "0.85rem", color: "#6c757d" }}>
            Progress
          </span>
          <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#495057" }}>
            {progressPercentage.toFixed(1)}%
          </span>
        </div>
        
        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "#e9ecef",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              backgroundColor: "#28a745",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GameProgressTrackerWithKeyboard;