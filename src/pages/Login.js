import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white flex items-center justify-center px-4 sm:px-6 md:px-12">
      {/* 🌌 Background */}
      <div className="absolute inset-0 bg-fixed bg-cover bg-center blur-sm opacity-80" style={{ backgroundImage: "url('/background.jpg')" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-moon-dark/70 to-black/80 z-0" />

      {/* 🌟 Foreground */}
      <form onSubmit={handleLogin} className="relative z-10 bg-moon-dark/80 p-8 rounded-lg shadow-lg w-80 backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 text-moon-light text-center">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-black/40 text-white placeholder-moon-light focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-black/40 text-white placeholder-moon-light focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-400 mb-2 text-sm italic">{error}</p>}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button
            type="submit"
            className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-600 px-6 py-3 rounded font-bold text-lg bg-indigo-500 text-white"
          >
            Log In
          </button>
        </div>
        <p className="mt-4 text-sm text-moon-light text-center">
          Don't have an account?{' '}
          <Link to="/" className="text-moon-light hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;