import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  updateDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import Companion from '../components/Companion';

function Planner() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const { user } = useAuth();
  const [mood, setMood] = useState(() => localStorage.getItem('mood') || 'neutral');

  const addTask = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await addDoc(collection(db, 'tasks'), {
      text: input,
      done: false,
      uid: user.uid
    });

    setInput('');
  };

  const toggleTask = async (task) => {
    const taskRef = doc(db, 'tasks', task.id);
    await updateDoc(taskRef, {
      done: !task.done,
    });
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  const clearCompletedTasks = async () => {
    const completed = tasks.filter(t => t.done);
    await Promise.all(completed.map(task => deleteDoc(doc(db, 'tasks', task.id))));
  };

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'tasks'), where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(fetched);
    });

    return () => unsubscribe();
  }, [user]);

  const pendingCount = tasks.filter(t => !t.done).length;

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* 🌌 Background image */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center blur-sm opacity-100"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-moon-dark/70 to-black/80 z-0" />

      {/* 🌟 Foreground content */}
      <div className="relative z-10 flex flex-col items-center p-6 px-4 sm:px-6 md:px-12">
        <h1 className="text-4xl font-bold text-moon-light mb-6 text-center">Let’s plan your day</h1>

        <div className="w-full max-w-2xl mb-6 animate-fadeIn">
          <Companion mood={mood} mode="planner" />
        </div>

        <div className="text-center text-moon-light text-lg mb-6 animate-fadeIn">
          <p>
            <strong>Mood:</strong> {mood} • <strong>{pendingCount}</strong> task{pendingCount !== 1 && 's'} pending
          </p>
          <p className="text-sm text-moon-light italic mt-1">
            Let’s make today gentle and productive.
          </p>
        </div>

        <form onSubmit={addTask} className="w-full max-w-md flex mb-6">
          <input
            type="text"
            placeholder="Add a task..."
            className="w-full p-4 text-base sm:text-lg flex-grow rounded-l bg-moon-dark/80 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-moon-light/40 px-6 py-3 rounded font-bold text-lg bg-moon-light text-black"
          >
            Add
          </button>
        </form>

        <ul className="w-full max-w-md mb-4">
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center bg-moon-dark/80 p-3 mb-2 rounded">
              <span
                onClick={() => toggleTask(task)}
                className={`cursor-pointer ${task.done ? 'line-through text-gray-400' : ''}`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600 px-4 py-2 rounded font-bold text-lg"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {tasks.some(t => t.done) && (
          <button
            onClick={clearCompletedTasks}
            className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 px-6 py-3 rounded font-bold text-lg bg-purple-500"
          >
            Clear Completed Tasks
          </button>
        )}
      </div>
    </div>
  );
}

export default Planner;