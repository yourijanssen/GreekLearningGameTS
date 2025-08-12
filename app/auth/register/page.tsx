"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/api/register";


export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await registerUser({ email, name, password });

    setIsLoading(false);

    if (!result.success) {
      setError(result.error || "Registration failed");
    } else {
      // Redirect to login after successful registration
      router.push("/login");
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
          disabled={isLoading}
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
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
          {isLoading ? "Registering..." : "Register"}
        </button>
        {error && <p style={{ color: "#c43219" }}>{error}</p>}
      </form>
      <p style={{ marginTop: "1rem" }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </main>
  );
}