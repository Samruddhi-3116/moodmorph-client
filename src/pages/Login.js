import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 sm:px-6 md:px-12">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-teal-400">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
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
        <button type="submit" className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-600 px-6 py-3 rounded font-bold text-lg bg-teal-500 mx-auto block">
          Log In
        </button>
        </div>
        <p className="mt-4 text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/" className="text-teal-400 hover:underline">
                Sign up here
            </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;