// app/register/page.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Registration failed");
      } else {
        // Redirect to login after successful registration
        router.push("/login");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <main style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <h1>Register for Greek Learning</h1>
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
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
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
          Register
        </button>
        {error && <p style={{ color: "#c43219" }}>{error}</p>}
      </form>
      <p style={{ marginTop: "1rem" }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </main>
  );
}