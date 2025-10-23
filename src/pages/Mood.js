import React, { useState, useEffect } from 'react';
import Companion from '../components/Companion';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import Sentiment from 'sentiment';
import { getAffirmation } from '../utils/affirmations';

function Mood() {
  const [mood, setMood] = useState('');
  const [detectedMood, setDetectedMood] = useState('neutral');
  const [suggestedTasks, setSuggestedTasks] = useState([]);
  const [affirmation, setAffirmation] = useState('');
  const [showCompanion, setShowCompanion] = useState(false);
  const [isAskMode, setIsAskMode] = useState(false);
  const [showToast, setShowToast] = useState(false); // ✅ Toast
  const { user } = useAuth();
  const sentiment = new Sentiment();

  const suggestions = {
    sad: [
      'Take a short walk',
      'Listen to calming music',
      'Write down 3 things you’re grateful for',
    ],
    anxious: [
      'Try 5-minute breathwork',
      'Declutter one small space',
      'Do a quick body scan meditation',
    ],
    happy: [
      'Share your joy with someone',
      'Plan a creative activity',
      'Celebrate with a small treat',
    ],
    neutral: [
      'Reflect on your goals',
      'Organize your day',
      'Do one thing that energizes you',
    ],
  };

  useEffect(() => {
    if (!mood.trim()) {
      setSuggestedTasks([]);
      setAffirmation('');
      setDetectedMood('neutral');
      return;
    }

    const result = sentiment.analyze(mood);
    const score = result.score;

    let moodType = 'neutral';
    if (score > 2) moodType = 'happy';
    else if (score < -2) moodType = 'sad';
    else if (score < 0) moodType = 'anxious';

    setDetectedMood(moodType);
    setAffirmation(getAffirmation(moodType));
    setSuggestedTasks(suggestions[moodType]);
  }, [mood]);

  const handleAnalyze = async () => {
    if (!user || !mood.trim()) return;
    await addDoc(collection(db, 'moodEntries'), {
      uid: user.uid,
      mood: detectedMood,
      journal: mood,
      timestamp: Timestamp.now(),
    });
    setShowCompanion(true);
    setIsAskMode(false);
    setShowToast(true);
    localStorage.setItem('mood', detectedMood);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center px-4 sm:px-6 md:px-12 py-8">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-teal-400 mb-8 text-center">
          How are you feeling today?
        </h1>

        <textarea
          placeholder="Write a short journal entry or describe your day"
          className="w-full p-4 rounded bg-gray-700 text-white text-lg mb-6"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          rows={5}
        />

        {affirmation && (
          <div className="animate-fadeIn bg-gray-800 p-4 rounded shadow text-teal-200 text-lg italic text-center mb-6">
            {affirmation}
          </div>
        )}

        {suggestedTasks.length > 0 && (
          <div className="animate-fadeIn">
            <p className="text-xl text-teal-300 text-center mb-4">
              Based on your journal, you seem to be feeling <strong>{detectedMood}</strong>. Here are some suggestions:
            </p>
            <ul className="space-y-3">
              {suggestedTasks.map((task, index) => (
                <li key={index} className="bg-gray-800 p-4 rounded text-white text-lg">
                  • {task}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={handleAnalyze}
            className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-600 px-6 py-3 rounded font-bold text-lg bg-teal-500"
          >
            Analyze Journal
          </button>
          <button
            onClick={() => {
              setIsAskMode(true);
              setShowCompanion(true);
            }}
            className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-600 px-6 py-3 rounded font-bold text-lg bg-indigo-500"
          >
            🎤 Talk to MoodMorph
          </button>
        </div>

        {showToast && (
          <div className="mt-4 text-center text-sm text-green-400 animate-fadeIn">
            ✅ Journal saved successfully
          </div>
        )}

        {showCompanion && (
          <div className="animate-fadeIn mt-8">
            {isAskMode && (
              <div className="text-center mb-4">
                <button
                  onClick={() => setIsAskMode(false)}
                  className="text-sm text-teal-400 underline hover:text-teal-200"
                >
                  ← Back to Journal
                </button>
              </div>
            )}
            <Companion
              mood={detectedMood}
              affirmation={affirmation}
              mode={isAskMode ? 'ask' : 'journal'}
              journalText={mood}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Mood;