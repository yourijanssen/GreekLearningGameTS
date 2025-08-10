import React from "react";
import { LearningPath } from "@/components/gameUI/homePageUI";
import { ProgressData } from "@/types/game";
import { GameConfigService, PathConfig } from "@/lib/services/GameConfigService";

interface LearningPathsSectionProps {
  progress: ProgressData;
}

export const LearningPathsSection: React.FC<LearningPathsSectionProps> = ({
  progress,
}) => {
  const paths = GameConfigService.getAllPaths(progress);

  return (
    <section className="home-section">
      <h2 className="home-section-title">Learning Paths</h2>
      <div className="home-paths-grid">
        {paths.map((path: PathConfig) => (
          <LearningPath
            key={path.title}
            title={path.title}
            emoji={path.emoji}
            description={path.description}
            borderColor={path.borderColor}
            games={path.games}
          />
        ))}
      </div>
    </section>
  );
};