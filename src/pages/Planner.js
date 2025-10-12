import React, { useState } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { updateDoc } from 'firebase/firestore';

function Planner() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const { user } = useAuth();

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

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6 px-4 sm:px-6 md:px-12">
      <h1 className="text-3xl font-bold text-teal-400 mb-6">Your Daily Planner</h1>
      <form onSubmit={addTask} className="w-full max-w-md flex mb-4">
        <input
          type="text"
          placeholder="Add a task..."
          className="w-full p-4 text-base sm:text-lg flex-grow p-3 rounded-l bg-gray-700 text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button type="submit" className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-600 px-6 py-3 rounded font-bold text-lg bg-teal-500 mx-auto block">
          Add
        </button>
        </div>
      </form>
      <ul className="w-full max-w-md">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-800 p-3 mb-2 rounded">
            <span
              onClick={() => toggleTask(task)}
              className={`cursor-pointer ${task.done ? 'line-through text-gray-400' : ''}`}>
              {task.text}
            </span>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button onClick={() => deleteTask(task.id)} className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-600 px-6 py-3 rounded font-bold text-lg">
              ✕
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Planner;