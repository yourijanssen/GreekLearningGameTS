'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// Define types for the expected data structure
interface User {
  id: number;
  email: string;
  name: string;
}

interface ApiResponse {
  success: boolean;
  users: User[];
}

// Use environment variable for API URL, fallback to Vercel backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://express-vercel-deployment-ashen.vercel.app/users';

const UserList: React.FC = () => {
  const { data, error, isLoading } = useQuery<ApiResponse>({
    queryKey: ['users'],
    queryFn: async () => {
      console.log(`Fetching users from: ${API_URL}`); // Log for debugging
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Network response was not OK: ${res.status} ${res.statusText}`);
      return res.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  // Check if data exists and success is true
  if (!data || !data.success) {
    return <div>No user data available</div>;
  }

  // Handle empty user list
  if (data.users.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <h1>User List</h1>
        <p>No users found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>User List</h1>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email.trim()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;