import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { FaBars, FaTimes, FaSmile, FaCalendarAlt, FaHistory, FaBrain } from 'react-icons/fa';

function Navbar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-teal-400">MoodMorph</h1>
        <button
          className="md:hidden text-teal-300 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`flex-col md:flex md:flex-row md:space-x-6 mt-3 md:mt-0 ${
          menuOpen ? 'flex' : 'hidden'
        }`}
      >
        {!user && (
          <>
            <Link to="/" className="hover:text-teal-300">Signup</Link>
            <Link to="/login" className="hover:text-teal-300">Login</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/dashboard" className="hover:text-teal-300 flex items-center gap-2">
              <FaBrain /> Dashboard
            </Link>
            <Link to="/mood" className="hover:text-teal-300 flex items-center gap-2">
              <FaSmile /> Mood
            </Link>
            <Link to="/planner" className="hover:text-teal-300 flex items-center gap-2">
              <FaCalendarAlt /> Planner
            </Link>
            <Link to="/history" className="hover:text-teal-300 flex items-center gap-2">
              <FaHistory /> History
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;