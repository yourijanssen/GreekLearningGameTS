"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const GamesPage = () => {
  const router = useRouter();

  const gameCategories = [
    {
      title: "Beginner Games",
      color: "from-emerald-400 to-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-300",
      description: "Perfect for those just starting to learn Greek. Master the basics!",
      games: [
        { id: 'alphabet', title: "Alphabet", description: "Learn the Greek alphabet", path: "/games/alphabet", icon: "🔤", difficulty: 1 },
        { id: 'numbers', title: "Numbers", description: "Practice Greek numbers 1-100", path: "/games/numbers", icon: "🔢", difficulty: 1 },
        { id: 'weekdays', title: "Weekdays", description: "Learn the days of the week", path: "/games/weekdays", icon: "📅", difficulty: 1 },
        { id: 'months', title: "Months", description: "Master the months of the year", path: "/games/months", icon: "🗓️", difficulty: 1 },
        { id: 'colors', title: "Colors", description: "Learn basic colors in Greek", path: "/games/colors", icon: "🎨", difficulty: 1 },
        { id: 'greetings', title: "Greetings", description: "Common Greek greetings", path: "/games/greetings", icon: "👋", difficulty: 1 },
        { id: 'family', title: "Family", description: "Family member vocabulary", path: "/games/family", icon: "👨‍👩‍👧‍👦", difficulty: 2 },
        { id: 'animals', title: "Animals", description: "Common animal names", path: "/games/animals", icon: "🦁", difficulty: 2 },
        { id: 'fruits', title: "Fruits", description: "Learn fruit vocabulary", path: "/games/fruits", icon: "🍎", difficulty: 2 },
        { id: 'vegetables', title: "Vegetables", description: "Learn vegetable names", path: "/games/vegetables", icon: "🥦", difficulty: 2 },
        { id: 'shapes', title: "Shapes", description: "Basic shapes in Greek", path: "/games/shapes", icon: "🔶", difficulty: 1 },
        { id: 'household', title: "Household Items", description: "Common objects at home", path: "/games/household", icon: "🏠", difficulty: 2 },
      ]
    },
    {
      title: "Intermediate Games",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      description: "Build on your foundation with more complex vocabulary and grammar.",
      games: [
        { id: 'names', title: "Names", description: "Common Greek names", path: "/games/names", icon: "👤", difficulty: 3 },
        { id: 'tobe', title: "To Be", description: "Master 'είμαι' conjugations", path: "/games/to-be", icon: "💭", difficulty: 3 },
        { id: 'food', title: "Food & Drinks", description: "Greek cuisine vocabulary", path: "/games/food", icon: "🍽️", difficulty: 3 },
        { id: 'body', title: "Body Parts", description: "Learn human body vocabulary", path: "/games/body", icon: "🦵", difficulty: 3 },
        { id: 'clothing', title: "Clothing", description: "Clothes and accessories", path: "/games/clothing", icon: "👕", difficulty: 3 },
        { id: 'time', title: "Telling Time", description: "Learn to tell time in Greek", path: "/games/time", icon: "⏰", difficulty: 4 },
        { id: 'weather', title: "Weather", description: "Weather conditions and seasons", path: "/games/weather", icon: "🌤️", difficulty: 3 },
        { id: 'verbs-present', title: "Present Tense", description: "Common verbs in present", path: "/games/verbs-present", icon: "🏃", difficulty: 4 },
        { id: 'directions', title: "Directions", description: "Navigate in Greek", path: "/games/directions", icon: "🧭", difficulty: 4 },
        { id: 'professions', title: "Professions", description: "Learn job and career terms", path: "/games/professions", icon: "👨‍💼", difficulty: 4 },
        { id: 'travel', title: "Travel", description: "Vocabulary for travel and tourism", path: "/games/travel", icon: "✈️", difficulty: 3 },
        { id: 'shopping', title: "Shopping", description: "Terms for buying and selling", path: "/games/shopping", icon: "🛒", difficulty: 4 },
      ]
    },
    {
      title: "Advanced Games",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      description: "Challenge yourself with advanced grammar and nuanced expressions.",
      games: [
        { id: 'past-tense', title: "Past Tense", description: "Master past tense verbs", path: "/games/past-tense", icon: "⏮️", difficulty: 5 },
        { id: 'future-tense', title: "Future Tense", description: "Learn future conjugations", path: "/games/future-tense", icon: "⏭️", difficulty: 5 },
        { id: 'adjectives', title: "Adjectives", description: "Descriptive words & agreement", path: "/games/adjectives", icon: "📝", difficulty: 5 },
        { id: 'prepositions', title: "Prepositions", description: "Master Greek prepositions", path: "/games/prepositions", icon: "📍", difficulty: 5 },
        { id: 'pronouns', title: "Pronouns", description: "Personal & possessive pronouns", path: "/games/pronouns", icon: "🗣️", difficulty: 5 },
        { id: 'idioms', title: "Idioms", description: "Common Greek expressions", path: "/games/idioms", icon: "💬", difficulty: 5 },
        { id: 'subjunctive', title: "Subjunctive", description: "Master the subjunctive mood", path: "/games/subjunctive", icon: "🤔", difficulty: 5 },
        { id: 'passive-voice', title: "Passive Voice", description: "Learn passive constructions", path: "/games/passive-voice", icon: "🔄", difficulty: 5 },
        { id: 'cultural-phrases', title: "Cultural Phrases", description: "Everyday Greek sayings", path: "/games/cultural-phrases", icon: "🏛️", difficulty: 5 },
        { id: 'advanced-vocab', title: "Advanced Vocabulary", description: "Expand with nuanced words", path: "/games/advanced-vocab", icon: "📚", difficulty: 5 },
      ]
    },
    {
      title: "Expert Games",
      color: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-300",
      description: "Test your fluency with expert-level challenges and cultural depth.",
      games: [
        { id: 'literature', title: "Greek Literature", description: "Explore famous Greek texts", path: "/games/literature", icon: "📖", difficulty: 6 },
        { id: 'history', title: "Historical Terms", description: "Learn history-related vocabulary", path: "/games/history", icon: "🏺", difficulty: 6 },
        { id: 'mythology', title: "Mythology", description: "Dive into Greek gods and myths", path: "/games/mythology", icon: "⚡", difficulty: 6 },
        { id: 'proverbs', title: "Proverbs", description: "Master traditional Greek wisdom", path: "/games/proverbs", icon: "🦉", difficulty: 6 },
        { id: 'dialogues', title: "Conversational Dialogues", description: "Practice real-life scenarios", path: "/games/dialogues", icon: "💬", difficulty: 6 },
        { id: 'slang', title: "Slang", description: "Learn informal Greek terms", path: "/games/slang", icon: "😎", difficulty: 6 },
        { id: 'business', title: "Business Greek", description: "Professional language skills", path: "/games/business", icon: "💼", difficulty: 6 },
      ]
    },
    {
      title: "Fun & Culture",
      color: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-300",
      description: "Enjoy learning with games inspired by Greek culture and traditions.",
      games: [
        { id: 'festivals', title: "Festivals", description: "Learn about Greek celebrations", path: "/games/festivals", icon: "🎉", difficulty: 3 },
        { id: 'songs', title: "Traditional Songs", description: "Practice with Greek music", path: "/games/songs", icon: "🎵", difficulty: 4 },
        { id: 'folklore', title: "Folklore", description: "Discover Greek stories and tales", path: "/games/folklore", icon: "📜", difficulty: 5 },
        { id: 'cuisine', title: "Cuisine Challenge", description: "Test your Greek food knowledge", path: "/games/cuisine", icon: "🥘", difficulty: 3 },
        { id: 'trivia', title: "Greek Trivia", description: "Fun facts about Greece", path: "/games/trivia", icon: "❓", difficulty: 4 },
      ]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // Updated item variants for left-to-right animation
  const itemVariants = {
    hidden: { opacity: 0, x: -50 }, // Start from the left
    visible: { opacity: 1, x: 0 }, // Move to original position
    transition: { type: "spring", stiffness: 120 }
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Greek Learning Games</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Dive into the beauty of the Greek language with interactive games for all levels. 
          Learn, play, and master Greek today!
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="space-y-16"> {/* Increased spacing between categories */}
        {gameCategories.map((category) => (
          <motion.div 
            key={category.title}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`rounded-2xl shadow-xl overflow-hidden border-2 ${category.borderColor} bg-white`}
          >
            {/* Category Header */}
            <div className={`p-6 bg-gradient-to-r ${category.color} text-white`}>
              <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
              <p className="text-sm opacity-90">{category.description}</p>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6"> {/* Increased gap */}
              {category.games.map((game) => (
                <motion.div
                  key={game.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.97 }}
                  className={`p-5 bg-white border-2 ${category.borderColor} rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-start space-x-4`}
                  onClick={() => router.push(game.path)}
                >
                  <div className="text-3xl">{game.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{game.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{game.description}</p>
                    <div className="flex mt-3">
                      {[...Array(game.difficulty)].map((_, i) => (
                        <span key={i} className={`h-2.5 w-2.5 rounded-full mr-1.5 ${category.bgColor}`}></span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Call-to-Action */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center mt-16"
      >
        <p className="text-gray-700 text-lg mb-4">Have ideas for new games or categories?</p>
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-indigo-700 transition-all">
          Suggest a Game
        </button>
      </motion.div>
    </div>
  );
};

export default GamesPage;