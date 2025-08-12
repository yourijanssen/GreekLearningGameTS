/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchComments, postComment } from "../api/comments";


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