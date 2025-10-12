import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React, { useState } from 'react';
import Companion from '../components/Companion';

function getTimeGreeting(name) {
  const hour = new Date().getHours();

  if (hour < 12) {
    return `Good morning, ${name} 🌅 Let’s set the tone for today.`;
  } else if (hour < 18) {
    return `Hey ${name} 👋 Ready to refocus?`;
  } else {
    return `Winding down, ${name}? 🌙 Let’s reflect and recharge.`;
  }
}

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mood, setMood] = useState('');
  const [showCompanion, setShowCompanion] = useState(false);
  const greeting = getTimeGreeting(user?.displayName || 'friend');
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center px-4 sm:px-6 md:px-12 py-8">
      <div className="max-w-3xl mx-auto w-full text-center">
        <h1 className="text-3xl font-bold text-teal-400 mb-4">
          Welcome to MoodMorph, {user?.email}!
        </h1>
        <p className="text-xl text-teal-300 mb-8">{greeting}</p>

        {!showCompanion ? (
          <>
            <p className="text-lg mb-4">How are you feeling today?</p>
            <input
              type="text"
              placeholder="Type your mood or skip"
              className="w-full p-4 rounded bg-gray-700 text-white text-lg mb-4"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
            <div className="flex justify-center gap-6 mt-6">
              <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button
                onClick={() => setShowCompanion(true)}
                className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-600 px-6 py-3 rounded font-bold text-lg bg-teal-500"
              >
                Reflect
              </button>
              <button
                onClick={handleLogout}
                className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600 px-6 py-3 rounded font-bold text-lg bg-red-500"
              >
                
                Logout
              </button>
              </div>
            </div>

          </>
        ) : (
          <div className="animate-fadeIn">
            <Companion mood={mood || 'neutral'} />
          </div>

        )}
      </div>
    </div>
  );
}

export default Dashboard;