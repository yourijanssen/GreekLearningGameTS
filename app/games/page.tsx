"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const GamesPage: React.FC = () => {
  const router = useRouter();

  const gameCategories = [
    {
      title: "Beginner Games",
      games: [
        { id: 'alphabet', title: "Alphabet", description: "Learn the Greek alphabet", path: "/games/alphabet" },
        { id: 'numbers', title: "Numbers", description: "Practice Greek numbers", path: "/games/numbers" },
        { id: 'weekdays', title: "Weekdays", description: "Learn the days of the week", path: "/games/weekdays" },
      ]
    },
    {
      title: "Intermediate Games",
      games: [
        { id: 'names', title: "Names", description: "Common Greek names", path: "/games/names" },
        { id: 'tobe', title: "To Be", description: "Learn verb 'to be' conjugations", path: "/games/to-be" },
      ]
    }
  ];

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Greek Learning Games</h1>
      
      {gameCategories.map((category) => (
        <div key={category.title} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{category.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.games.map((game) => (
              <button
                key={game.id}
                onClick={() => router.push(game.path)}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-medium text-gray-800">{game.title}</h3>
                <p className="text-gray-600 mt-2">{game.description}</p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamesPage;