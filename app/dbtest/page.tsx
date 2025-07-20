'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useQuery } from '@tanstack/react-query';

const API_URL = 'https://express-vercel-deployment-ashen.vercel.app/users';

const UserList: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Network response was not OK');
      return res.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>User List</h1>
      <ul>
        {data?.users?.map((user: any) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;