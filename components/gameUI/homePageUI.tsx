import { BadgeProps, GameLinkProps, HeaderProps, ProgressData } from "@/types/game";
import Link from "next/link";
import "@/styles/homePageUI.css"; // adjust path as needed

// Reusable Header Component
export const Header: React.FC<HeaderProps> = ({ level, completedGames, overallProgress }) => {
  return (
    <header className="hpui-header">
      <h1 className="hpui-header-title">
        Greek Learning Odyssey 🇬🇷
      </h1>
      <p className="hpui-header-desc">
        Level {level} Learner | {completedGames} Games Mastered
      </p>
      {/* Overall Progress Bar */}
      <div className="hpui-progress-bar-bg">
        <div
          className="hpui-progress-bar"
          style={{ width: `${overallProgress}%` }}
        />
      </div>
      <small className="hpui-progress-bar-label">
        Overall Progress: {overallProgress}%
      </small>
    </header>
  );
};

// Reusable Welcome Section Component
export const WelcomeSection: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
   <section className="hpui-welcome-section">
      <h2 className="hpui-welcome-title">Welcome to Your Greek Journey!</h2>
      <p className="hpui-welcome-desc">
        Learn Greek through interactive typing games. Progress through levels,
        earn badges, and master the language one step at a time!
      </p>
      <button
        className="hpui-welcome-btn"
        onClick={onStart}
      >
        Start Learning Now
      </button>
    </section>
  );
};

// Reusable Learning Path Component
interface LearningPathProps {
  title: string;
  emoji: string;
  description: string;
  borderColor: string;
  games: Array<{ href: string; title: string; progress: number }>;
}

export const LearningPath: React.FC<LearningPathProps> = ({ title, emoji, description, borderColor, games }) => {
  return (
    <div
      className="hpui-path"
      style={{ borderLeft: `5px solid ${borderColor}` }}
    >
      <h3 className="hpui-path-title">{title} {emoji}</h3>
      <p className="hpui-path-desc">{description}</p>
      <nav className="hpui-path-games">
        {games.map((game) => (
          <GameLink
            key={game.href}
            href={game.href}
            title={game.title}
            progress={game.progress}
          />
        ))}
      </nav>
    </div>
  );
};

// Reusable Achievements Section Component
interface AchievementsProps {
  progress: ProgressData;
  level: number;
}

export const Achievements: React.FC<AchievementsProps> = ({ progress, level }) => {
  return (
    <section className="hpui-achievements-section">
      <h2 className="hpui-achievements-title">Your Achievements</h2>
      <div className="hpui-achievements-list">
        <Badge title="Alphabet Ace" unlocked={progress.alphabet === 100} emoji="🔤" />
        <Badge title="Number Ninja" unlocked={progress.numbers === 100} emoji="🔢" />
        <Badge title="Grammar Guru" unlocked={progress["to-be"] === 100} emoji="📘" />
        <Badge title="Sentence Sage" unlocked={progress.sentences === 100} emoji="💬" />
        <Badge title="Level 3 Learner" unlocked={level >= 3} emoji="⭐" />
      </div>
    </section>
  );
};

// Reusable Game Link Component with Progress Indicator (already in your code)
export const GameLink: React.FC<GameLinkProps> = ({ href, title, progress }) => {
  let linkClass = "hpui-gamelink-link";
  if (progress === 100) linkClass += " completed";
  if (progress > 0 && progress < 100) linkClass += " progress";
  return (
    <div className="hpui-gamelink">
      <Link href={href} className={linkClass}>
        {title}
      </Link>
      {progress > 0 && progress < 100 && (
        <span className="hpui-gamelink-progress">{progress}%</span>
      )}
      {progress === 100 && (
        <span className="hpui-gamelink-completed">✓</span>
      )}
    </div>
  );
};

// Reusable Badge Component for Achievements (already in your code)
export const Badge: React.FC<BadgeProps> = ({ title, unlocked, emoji }) => {
  return (
    <div className={`hpui-badge ${unlocked ? "unlocked" : "locked"}`}>
      <div className="hpui-badge-emoji">{emoji}</div>
      <div className="hpui-badge-title">{title}</div>
      <div className={`hpui-badge-status ${unlocked ? "unlocked" : "locked"}`}>
        {unlocked ? "Unlocked!" : "Locked"}
      </div>
    </div>
  );
};