const API_URL =
  process.env.API_URL ||
  "https://express-vercel-deployment-ashen.vercel.app" ||
  "http://localhost:8080";

export async function fetchComments() {
  const res = await fetch(`${API_URL}/comments`);
  const data = await res.json();
  // Defensive: provide [] as fallback if comments is not present
  return data.comments || [];
}

export async function postComment(comment: string) {
  const res = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment }),
  });
  const data = await res.json();
  return data.comment;
}
