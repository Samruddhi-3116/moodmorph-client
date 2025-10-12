import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-teal-400">MoodMorph</h1>
      <div className="space-x-4">
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
            {user && <Link to="/planner" className="hover:underline">Planner</Link>}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;