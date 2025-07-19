/**
 * Displays game progress statistics and elapsed time for a quiz or learning session.
 */
export function GameProgressTracker({ streak, bestStreak, correctCount, total, startTime, finishTime }: {
  streak: number,
  bestStreak: number,
  correctCount: number,
  total: number,
  startTime: number | null,
  finishTime: number | null
}) {
  let display = "";
  if (startTime) {
    const end = finishTime || Date.now();
    const elapsed = Math.floor((end - startTime) / 1000); // sec
    const min = Math.floor(elapsed / 60);
    const sec = elapsed % 60;
    display = `${min > 0 ? min + "m " : ""}${sec < 10 ? "0" : ""}${sec}s`;
  }
  return (
    <div style={{ marginTop: "2.3rem", fontWeight: 500, fontSize: "1.22rem" }}>
      <div>
        Streak: {streak} &nbsp;|&nbsp; Best: {bestStreak} &nbsp;|&nbsp;
        Progress: {correctCount}/{total}
      </div>
      <div style={{ marginTop: "0.5rem", color: "#555" }}>
        Time elapsed: {display}
      </div>
    </div>
  );
}