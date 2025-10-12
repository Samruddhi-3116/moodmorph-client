import React, { useState } from 'react';
import Companion from '../components/Companion';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

function Mood() {
  const [mood, setMood] = useState('');
  const [response, setResponse] = useState('');
  const [suggestedTasks, setSuggestedTasks] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCompanion, setShowCompanion] = useState(false);

  const { user } = useAuth();

  const saveMoodEntry = async (moodText) => {
    if (!user || !moodText.trim()) return;

    await addDoc(collection(db, 'moodEntries'), {
      uid: user.uid,
      mood: moodText,
      timestamp: Timestamp.now()
    });
  };

  const handleMoodSubmit = async (e) => {
    e.preventDefault();

    await saveMoodEntry(mood);
    setShowCompanion(true);

    let suggestions = [];
    const moodLower = mood.toLowerCase();

    if (moodLower.includes('sad') || moodLower.includes('low')) {
      suggestions = [
        'Take a short walk',
        'Listen to calming music',
        'Write down 3 things you’re grateful for',
      ];
    } else if (moodLower.includes('anxious') || moodLower.includes('nervous')) {
      suggestions = [
        'Try 5-minute breathwork',
        'Declutter one small space',
        'Do a quick body scan meditation',
      ];
    } else if (moodLower.includes('happy') || moodLower.includes('excited')) {
      suggestions = [
        'Share your joy with someone',
        'Plan a creative activity',
        'Celebrate with a small treat',
      ];
    } else {
      suggestions = [
        'Reflect on your goals',
        'Organize your day',
        'Do one thing that energizes you',
      ];
    }

    setResponse(`Based on your mood, here are some suggestions:`);
    setSuggestedTasks(suggestions);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center px-4 sm:px-6 md:px-12 py-8">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-teal-400 mb-8 text-center">How are you feeling today?</h1>
    
        <form onSubmit={handleMoodSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Type your mood (e.g., calm, anxious, excited)"
            className="w-full p-4 rounded bg-gray-700 text-white text-lg"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            required
        />
        <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button type="submit" className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-600 px-6 py-3 rounded font-bold text-lg bg-teal-500 mx-auto block">
          Analyze Mood
        </button>
        </div>
      </form>

      {showCompanion && (
        <div className="animate-fadeIn">
          <Companion mood={mood} />
        </div>
     )}

      {response && <p className="mt-8 text-xl text-teal-300 text-center">{response}</p>}

      {suggestedTasks.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          onClick={() => setShowSuggestions(true)}
          className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-600 px-6 py-3 rounded font-bold text-lg bg-teal-500 mx-auto block"
        >
          Show Suggested Routines
        </button>
        </div>
      )}

      {showSuggestions && (
        <ul className="mt-6 space-y-3">
          {suggestedTasks.map((task, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded text-white text-lg">
              • {task}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
  );
}

export default Mood;