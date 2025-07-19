/**
 * Renders the main view for a single quiz question, including input, submission, and feedback.
 */
export function QuizQuestionView({ question, input, onInput, onSubmit, feedback, feedbackColor, inputRef, disabled, onMenu, onListen }: {
  question: string,
  input: string,
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onSubmit: (e: React.FormEvent) => void,
  feedback: string | null,
  feedbackColor: string,
  inputRef: React.RefObject<HTMLInputElement | null>,
  disabled: boolean,
  onMenu: () => void,
  onListen: () => void,
}) {
  return (
    <>
      <h2>
        {isNaN(Number(question))
          ? <>Type the <b>number</b> for:</>
          : <>Type the <b>Greek word</b> for:</>
        }
      </h2>
      <div
        style={{
          color: "#001e87",
          fontSize: "2.4rem",
          margin: "1.5rem 0",
          fontFamily: "var(--font-geist-mono, monospace)",
        }}
      >
        {question}
      </div>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={onInput}
          placeholder="..."
          style={{
            fontSize: "2rem",
            padding: "0.5rem",
            textAlign: "center",
            width: "200px",
            letterSpacing: "0.075em",
          }}
          disabled={disabled}
        />
        <button
          type="submit"
          style={{ marginLeft: 18, fontSize: "1.15rem", padding: "0.55rem 1.3rem" }}
          disabled={disabled}
        >
          Check
        </button>
        <button
          type="button"
          onClick={onMenu}
          style={{
            marginLeft: 16,
            fontSize: "1.08rem",
            padding: "0.48rem 1.1rem",
            background: "#ddd",
            color: "#333",
            border: "1px solid #aaa",
          }}
          disabled={disabled}
          title="Return to menu"
        >
          Menu
        </button>
        <button
          type="button"
          onClick={onListen}
          style={{
            marginLeft: 16,
            fontSize: "1.08rem",
            padding: "0.48rem 1.1rem",
            background: "#e8f4ff",
            color: "#004d82",
            border: "1px solid #62a0ff",
          }}
          disabled={disabled}
          title="Hear the word in Greek"
        >
          Listen
        </button>
      </form>
      {feedback && (
        <div
          style={{
            marginTop: "1.6rem",
            color: feedbackColor,
            fontWeight: 600,
            fontSize: "1.15rem",
            minHeight: "2.2em",
          }}
        >
          {feedback}
        </div>
      )}
    </>
  );
}