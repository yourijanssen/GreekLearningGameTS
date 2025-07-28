// components/LogoutButton.tsx or inline in your homepage
"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        background: "#c43219",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}