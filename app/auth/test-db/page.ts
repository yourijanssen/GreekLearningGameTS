// "use client";
// import pool from "@/app/utils/db";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Test query to check database connection
//     console.log("Attempting to test database connection...");
//     const result = await pool.query("SELECT NOW()");
//     console.log("Database connection successful:", result.rows[0]);
//     return NextResponse.json(
//       {
//         success: true,
//         message: "Database connection successful",
//         data: result.rows[0],
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error testing database connection:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Database connection failed",
//         error: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }
