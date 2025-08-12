const API_URL =
  process.env.API_URL ||
  "http://localhost:8080" ||
  "https://express-vercel-deployment-ashen.vercel.app";

export interface RegisterCredentials {
  email: string;
  name?: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  error?: string;
}

export async function registerUser(
  credentials: RegisterCredentials
): Promise<RegisterResponse> {
  console.log("=== registerUser called ===");
  console.log("API URL:", API_URL);
  console.log("Endpoint:", `${API_URL}/register`);
  console.log("Credentials:", {
    email: credentials.email,
    name: credentials.name,
    password: "[HIDDEN]",
  });

  try {
    console.log("Sending registration request...");
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    console.log("Response received:");
    console.log("- Status:", response.status);
    console.log("- OK:", response.ok);

    const data = await response.json();
    console.log("Response data:", data);

    if (!response.ok) {
      console.log("Registration failed - response not OK");
      return {
        success: false,
        error: data.error || "Registration failed",
      };
    }

    console.log("Registration successful!");
    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    console.error("=== ERROR in registerUser ===");
    console.error("Error:", error);
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}
