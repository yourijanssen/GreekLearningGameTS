// import { Pool } from "pg";

// // Use environment variables for local PostgreSQL
// const pool = new Pool({
//   host: process.env.POSTGRES_HOST,
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE,
//   port: Number(process.env.POSTGRES_PORT),
//   max: 20, // Maximum number of clients in the pool
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// // Test the connection
// pool.query("SELECT NOW()", (err, res) => {
//   if (err) {
//     console.error("Database connection error:", err);
//   } else {
//     console.log("Database connected successfully at:", res.rows[0].now);
//   }
// });

// export default pool;
