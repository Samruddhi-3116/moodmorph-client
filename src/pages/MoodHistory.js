import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function getMoodEmoji(mood) {
  const map = {
    happy: '😊',
    sad: '😔',
    anxious: '😟',
    tired: '😴',
    angry: '😠',
    neutral: '😐',
  };
  return map[mood] || '🧠';
}

function MoodHistory() {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchMoodEntries = async () => {
      if (!user) return;

      const q = query(
        collection(db, 'moodEntries'),
        where('uid', '==', user.uid),
        orderBy('timestamp', 'asc')
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => {
        const raw = doc.data();
        return {
          id: doc.id,
          mood: raw.mood,
          journal: raw.journal,
          timestamp: raw.timestamp?.toDate() || new Date(),
          date: raw.timestamp?.toDate().toLocaleDateString(),
          time: raw.timestamp?.toDate().toLocaleTimeString(),
        };
      });

      setEntries(data);
    };

    fetchMoodEntries();
  }, [user]);

  // 🎯 Prepare chart data
  const moodToScore = {
    sad: 1,
    tired: 2,
    anxious: 3,
    neutral: 4,
    happy: 5,
  };

  const chartData = {
    labels: entries.map(e => e.date),
    datasets: [
      {
        label: 'Mood Trend',
        data: entries.map(e => moodToScore[e.mood] || 3),
        fill: false,
        borderColor: '#14b8a6',
        backgroundColor: '#2dd4bf',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 6,
        ticks: {
          stepSize: 1,
          callback: value => {
            const scoreToMood = {
              1: '😔 Sad',
              2: '😴 Tired',
              3: '😟 Anxious',
              4: '😐 Neutral',
              5: '😊 Happy',
            };
            return scoreToMood[value] || '';
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 md:px-12 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-400 mb-6 text-center">Your Mood History</h1>

        {entries.length === 0 ? (
          <p className="text-center text-teal-300">No mood entries yet. Start reflecting today!</p>
        ) : (
          <>
            <div className="bg-gray-800 p-4 rounded-lg mb-8">
              <Line data={chartData} options={chartOptions} />
            </div>

            <ul className="space-y-6">
              {entries
                .slice()
                .reverse()
                .map(entry => (
                  <li key={entry.id} className="bg-gray-800 p-5 rounded-lg shadow-md animate-fadeIn">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-teal-300 font-semibold">
                        {entry.date} • {entry.time}
                      </span>
                      <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                    </div>
                    <p className="text-lg text-white mb-1">
                      <strong>Mood:</strong>{' '}
                      <span className="italic text-teal-200">{entry.mood}</span>
                    </p>
                    <p className="text-sm text-teal-400 italic">
                      {entry.journal
                        ? entry.journal.length > 120
                          ? `${entry.journal.slice(0, 120)}...`
                          : entry.journal
                        : 'No journal entry provided.'}
                    </p>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default MoodHistory;