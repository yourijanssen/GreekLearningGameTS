import React, { useState } from "react";
import { StorageService } from "@/lib/services/StorageService";

interface ResetGamesButtonProps {
  onReset?: () => void;
  className?: string;
}

export const ResetGamesButton: React.FC<ResetGamesButtonProps> = ({
  onReset,
  className = "",
}) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const hasGameStates = StorageService.hasAnyGameState();

  const handleClearClick = () => {
    setIsConfirming(true);
  };

  const handleConfirmClear = async () => {
    setIsClearing(true);
    try {
      StorageService.clearAllGameStates();
      setIsConfirming(false);
      
      // Call the optional callback
      if (onReset) {
        onReset();
      }
      
      // Optional: Show success message or refresh page
      setTimeout(() => {
        window.location.reload(); // Refresh to update UI
      }, 500);
      
    } catch (error) {
      console.error("Failed to clear game states:", error);
      alert("Failed to clear game states. Please try again.");
    } finally {
      setIsClearing(false);
    }
  };

  const handleCancelClear = () => {
    setIsConfirming(false);
  };

  if (!hasGameStates) {
    return null; // Don't show button if no game states exist
  }

  if (isConfirming) {
    return (
      <div className={`reset-games-section ${className}`}>
        <div className="confirmation-dialog">
          <h4>⚠️ Clear All Game Progress?</h4>
          <p>This will permanently delete all saved game states and progress. This action cannot be undone.</p>
          <div className="confirmation-buttons">
            <button
              className="confirm-button danger"
              onClick={handleConfirmClear}
              disabled={isClearing}
            >
              {isClearing ? "Clearing..." : "Yes, Clear All"}
            </button>
            <button
              className="cancel-button"
              onClick={handleCancelClear}
              disabled={isClearing}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`reset-games-section ${className}`}>
      <button
        className="reset-games-button"
        onClick={handleClearClick}
        title="Clear all saved game progress"
      >
        🗑️ Reset All Games
      </button>
    </div>
  );
};