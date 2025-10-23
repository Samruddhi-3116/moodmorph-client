import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
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
      navigate('/dashboard'); // ✅ Redirect only after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;  
      // ✅ Save user info to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
      console.log('User saved to Firestore:', user.displayName);
      // Optionally save user info to Firestore
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 sm:px-6 md:px-12">
      <form onSubmit={handleSignup} className="bg-gray-800 p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-teal-400">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-4 rounded bg-gray-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-400 mb-2">{error}</p>}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          onClick={handleGoogleSignup}
          className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-600 px-6 py-3 rounded font-bold text-lg bg-teal-500 mx-auto block">
            Sign up with Google
        </button>
        <button type="submit" className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-600 px-6 py-3 rounded font-bold text-lg bg-teal-500 mx-auto block">
          Create Account
        </button>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-400 hover:underline">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;