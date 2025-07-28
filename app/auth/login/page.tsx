// app/login/page.tsx
"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
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
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem", fontSize: "1rem", background: "#047c2a", color: "#fff", border: "none" }}
        >
          Sign In
        </button>
        {error && <p style={{ color: "#c43219" }}>{error}</p>}
      </form>
      <p style={{ marginTop: "1rem" }}>
        Don&apos;t have an account? <a href="/register">Register</a>
      </p>
    </main>
  );
}