// hooks/useAutoNavigation.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAutoNavigation(
  isGameFinished: boolean,
  finishTime: number | null,
  delay: number = 1600
): void {
  const router = useRouter();

  useEffect(() => {
    if (isGameFinished && finishTime != null) {
      const timeout = setTimeout(() => {
        router.push("/");
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isGameFinished, finishTime, router, delay]);
}
