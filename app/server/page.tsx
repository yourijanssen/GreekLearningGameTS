/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = process.env.API_URL || "https://express-vercel-deployment-ashen.vercel.app" || "http://localhost:8080";

// FIXED: Use the /comments endpoint, not /users
async function fetchComments() {
  const res = await fetch(`${API_URL}/comments`);
  const data = await res.json();
  // Defensive: provide [] as fallback if comments is not present
  return data.comments || [];
}

async function postComment(comment: string) {
  const res = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment }),
  });
  const data = await res.json();
  return data.comment;
}

export default function Page() {
  const queryClient = useQueryClient();

  // FIXED: Use object version of useQuery API
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
  });

  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem(
            "comment"
          ) as HTMLInputElement;
          mutation.mutate(input.value);
          input.value = "";
        }}
      >
        <input type="text" name="comment" placeholder="Write a comment" />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <h2>All Comments:</h2>
      {isLoading ? (
        "Loading..."
      ) : (
        <ul>
          {/* data: comments is always an array now */}
          {comments.map((row: any) => (
            <li key={row.id}>{row.comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
}