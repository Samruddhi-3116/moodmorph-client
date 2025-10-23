import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAffirmation } from '../utils/affirmations';

function getTimeGreeting(name) {
  const hour = new Date().getHours();
  if (hour < 12) return `Good morning, ${name} 🌅 Let’s set the tone for today.`;
  if (hour < 18) return `Hey ${name} 👋 Ready to refocus?`;
  return `Winding down, ${name}? 🌙 Let’s reflect and recharge.`;
}

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mood, setMood] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const greeting = getTimeGreeting(user?.displayName || 'friend');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const moodKey = mood.toLowerCase().includes('sad')
      ? 'sad'
      : mood.toLowerCase().includes('anxious')
      ? 'anxious'
      : mood.toLowerCase().includes('happy')
      ? 'happy'
      : 'neutral';
    setAffirmation(getAffirmation(moodKey));
  }, [mood]);

  const quote = "“Your present circumstances don’t determine where you can go; they merely determine where you start.” — Nido Qubein";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col justify-center px-4 sm:px-6 md:px-12 py-8">
      <div className="max-w-3xl mx-auto w-full text-center animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-teal-400 mb-4 tracking-tight">
          Welcome to MoodMorph, {user?.email}!
        </h1>
        <p className="text-xl text-teal-300 mb-6">{greeting}</p>

        {affirmation && (
          <div className="bg-gray-800 p-5 rounded-lg shadow-lg text-teal-200 text-lg italic mb-4">
            {affirmation}
            <p className="text-sm text-teal-500 italic mt-2">{quote}</p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <button
            onClick={() => navigate('/mood')}
            className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/40 px-6 py-3 rounded font-bold text-lg bg-teal-500"
          >
            Check Mood
          </button>
          <button
            onClick={() => navigate('/planner')}
            className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/40 px-6 py-3 rounded font-bold text-lg bg-indigo-500"
          >
            Plan My Day
          </button>
          <button
            onClick={handleLogout}
            className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/40 px-6 py-3 rounded font-bold text-lg bg-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;