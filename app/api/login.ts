/* eslint-disable @typescript-eslint/no-explicit-any */

const API_URL =
  process.env.API_URL ||
  "https://express-vercel-deployment-ashen.vercel.app" ||
  "http://localhost:8080";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  error?: string;
}

export async function loginUser(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  try {
    console.log("Sending login request...");
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    console.log("Response data:", data);

    if (!response.ok) {
      console.log("Login failed - response not OK");
      console.log(
        "Error message:",
        data.message || "Invalid email or password"
      );
      return {
        success: false,
        error: data.message || "Invalid email or password",
      };
    }

    // Store token if your API returns one
    if (data.token) {
      console.log("Token received, storing in localStorage");
      localStorage.setItem("authToken", data.token);
    } else {
      console.log("No token received in response");
    }

    console.log("Login successful!");
    console.log("User data:", data.user);

    return {
      success: true,
      token: data.token,
      user: data.user,
    };
  } catch (error) {
    console.error("=== ERROR in loginUser ===");
    console.error(
      "Error type:",
      error instanceof Error ? error.name : typeof error
    );
    console.error(
      "Error message:",
      error instanceof Error ? error.message : String(error)
    );
    console.error("Full error:", error);

    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.error("Network error - unable to reach server");
    }

    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}

export async function fetchUserProfile(): Promise<any> {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No authentication token");
  }

  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
}

export function logout() {
  localStorage.removeItem("authToken");
}
