import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { googleProvider } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white flex items-center justify-center px-4 sm:px-6 md:px-12">
      {/* 🌌 Background */}
      <div className="absolute inset-0 bg-fixed bg-cover bg-center blur-sm opacity-80" style={{ backgroundImage: "url('/background.jpg')" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-moon-dark/70 to-black/80 z-0" />

      {/* 🌟 Foreground */}
      <form onSubmit={handleSignup} className="relative z-10 bg-moon-dark/80 p-8 rounded-lg shadow-lg w-80 backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 text-moon-light text-center">Sign Up</h2>
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
            onClick={handleGoogleSignup}
            type="button"
            className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-600 px-6 py-3 rounded font-bold text-lg bg-indigo-500 text-white"
          >
            Sign up with Google
          </button>
          <button
            type="submit"
            className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-600 px-6 py-3 rounded font-bold text-lg bg-indigo-500 text-white"
          >
            Create Account
          </button>
        </div>
        <p className="mt-4 text-sm text-moon-light text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-moon-light hover:underline">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;