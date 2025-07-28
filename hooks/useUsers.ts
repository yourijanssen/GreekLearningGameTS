import { useQuery } from "@tanstack/react-query";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "/https://express-vercel-deployment-ashen.vercel.app/";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });
}
