"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/api/login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await loginUser({ email, password });

    setIsLoading(false);

    if (!result.success) {
      setError(result.error || "Invalid email or password");
    } else {
      // Optionally store user data in a global state management solution
      // or context if needed
      router.push("/"); // Redirect to homepage after login
    }
  };

  return (
    <main style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <h1>Login to Greek Learning</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
          disabled={isLoading}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
          disabled={isLoading}
        />
        <button
          type="submit"
          style={{ 
            padding: "0.5rem", 
            fontSize: "1rem", 
            background: isLoading ? "#ccc" : "#047c2a", 
            color: "#fff", 
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        {error && <p style={{ color: "#c43219" }}>{error}</p>}
      </form>
      <p style={{ marginTop: "1rem" }}>
        Don&apos;t have an account? <a href="/auth/register">Register</a>
      </p>
    </main>
  );
}