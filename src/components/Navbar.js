import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-between md:items-center">
      <h1 className="text-xl font-bold text-teal-400 mb-2 md:mb-0">MoodMorph</h1>
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
        {!user && (
          <>
            <Link to="/" className="hover:underline">Signup</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/mood" className="hover:underline">Mood</Link>
            <Link to="/history" className="hover:text-teal-300">History</Link>
            <Link to="/planner" className="hover:underline">Planner</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;