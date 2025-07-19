import Link from "next/link";
import { BadgeProps, GameLinkProps, HeaderProps, ProgressData } from "../interfaces/types";

// Reusable Header Component
export const Header: React.FC<HeaderProps> = ({ level, completedGames, overallProgress }) => {
  return (
    <header
      style={{
        textAlign: "center",
        marginBottom: "2rem",
        borderBottom: "2px solid #004d82",
        paddingBottom: "1rem",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          color: "#004d82",
          margin: 0,
        }}
      >
        Greek Learning Odyssey 🇬🇷
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#555", margin: "0.5rem 0" }}>
        Level {level} Learner | {completedGames} Games Mastered
      </p>
      {/* Overall Progress Bar */}
      <div
        style={{
          width: "80%",
          height: "20px",
          background: "#ddd",
          borderRadius: "10px",
          overflow: "hidden",
          margin: "1rem auto",
          border: "1px solid #bbb",
        }}
      >
        <div
          style={{
            width: `${overallProgress}%`,
            height: "100%",
            background: "#047c2a",
            transition: "width 0.5s ease",
          }}
        />
      </div>
      <small style={{ color: "#777" }}>
        Overall Progress: {overallProgress}%
      </small>
    </header>
  );
};

// Reusable Welcome Section Component
export const WelcomeSection: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <section
      style={{
        textAlign: "center",
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        marginBottom: "2rem",
      }}
    >
      <h2 style={{ fontSize: "1.8rem", color: "#004d82", marginTop: 0 }}>
        Welcome to Your Greek Journey!
      </h2>
      <p style={{ fontSize: "1.1rem", color: "#333", marginBottom: "1rem" }}>
        Learn Greek through interactive typing games. Progress through levels,
        earn badges, and master the language one step at a time!
      </p>
      <button
        onClick={onStart}
        style={{
          padding: "0.7rem 1.5rem",
          fontSize: "1.1rem",
          background: "#047c2a",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#035f20")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#047c2a")}
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
      style={{
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        borderLeft: `5px solid ${borderColor}`,
      }}
    >
      <h3
        style={{
          fontSize: "1.5rem",
          color: "#004d82",
          marginTop: 0,
          marginBottom: "1rem",
        }}
      >
        {title} {emoji}
      </h3>
      <p style={{ color: "#555", marginBottom: "1rem" }}>{description}</p>
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
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
    <section style={{ marginBottom: "2rem" }}>
      <h2
        style={{
          fontSize: "1.8rem",
          color: "#004d82",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        Your Achievements
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1.5rem",
          background: "#fff",
          padding: "1.5rem",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
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
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Link
        href={href}
        style={{
          color: progress === 100 ? "#047c2a" : "#004d82",
          textDecoration: "none",
          fontWeight: progress > 0 ? 600 : 400,
          transition: "color 0.3s ease",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.color = progress === 100 ? "#035f20" : "#002a5c")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.color = progress === 100 ? "#047c2a" : "#004d82")
        }
      >
        {title}
      </Link>
      {progress > 0 && progress < 100 && (
        <span style={{ color: "#efb958", fontSize: "0.8rem" }}>{progress}%</span>
      )}
      {progress === 100 && (
        <span style={{ color: "#047c2a", fontSize: "0.8rem" }}>✓</span>
      )}
    </div>
  );
};

// Reusable Badge Component for Achievements (already in your code)
export const Badge: React.FC<BadgeProps> = ({ title, unlocked, emoji }) => {
  return (
    <div
      style={{
        textAlign: "center",
        width: "120px",
        padding: "1rem 0.5rem",
        background: unlocked ? "#e8f4ff" : "#f0f0f0",
        borderRadius: "8px",
        border: unlocked ? "2px solid #62a0ff" : "2px solid #ccc",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{emoji}</div>
      <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#333" }}>{title}</div>
      <div
        style={{
          fontSize: "0.7rem",
          color: unlocked ? "#047c2a" : "#888",
          marginTop: "0.3rem",
        }}
      >
        {unlocked ? "Unlocked!" : "Locked"}
      </div>
    </div>
  );
};