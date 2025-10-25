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
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* 🌌 Background image */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center blur-sm opacity-100"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />

      {/* 🌙 Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-moon-dark/70 to-black/80 z-0" />

      {/* 🌟 Foreground content */}
      <div className="relative z-10 flex flex-col justify-center px-4 sm:px-6 md:px-12 py-8">
        <div className="max-w-3xl mx-auto w-full text-center animate-fadeIn">
          <h1 className="text-4xl font-extrabold text-moon-light mb-4 tracking-tight">
            Welcome to MoodMorph, {user?.email}!
          </h1>
          <p className="text-xl text-moon-light mb-6">{greeting}</p>

          {affirmation && (
            <div className="bg-moon-dark/80 p-5 rounded-lg shadow-lg text-moon-light text-lg italic mb-4">
              {affirmation}
              <p className="text-sm text-moon-light italic mt-2">{quote}</p>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <button
              onClick={() => navigate('/mood')}
              className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-moon-light/40 px-6 py-3 rounded font-bold text-lg bg-moon-light text-black"
            >
              Check Mood
            </button>
            <button
              onClick={() => navigate('/planner')}
              className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 px-6 py-3 rounded font-bold text-lg bg-purple-500"
            >
              Plan My Day
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;