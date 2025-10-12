import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

function MoodHistory() {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchMoodEntries = async () => {
      if (!user) return;

      const q = query(
        collection(db, 'moodEntries'),
        where('uid', '==', user.uid),
        orderBy('timestamp', 'desc')
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().timestamp.toDate().toLocaleDateString(),
        time: doc.data().timestamp.toDate().toLocaleTimeString()
      }));

      setEntries(data);
    };

    fetchMoodEntries();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 md:px-12 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-400 mb-6 text-center">Your Mood History</h1>
        {entries.length === 0 ? (
          <p className="text-center text-teal-300">No mood entries yet. Start reflecting today!</p>
        ) : (
          <ul className="space-y-4">
            {entries.map(entry => (
              <li key={entry.id} className="bg-gray-800 p-4 rounded text-lg">
                <span className="text-teal-300 font-semibold">{entry.date} at {entry.time}</span>
                <br />
                Mood: <span className="italic">{entry.mood}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MoodHistory;