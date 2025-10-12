import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Mood from './pages/Mood';
import Planner from './pages/Planner';
import MoodHistory from './pages/MoodHistory'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/mood" element={<Mood />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/history" element={<MoodHistory />} />
      </Routes>
    </Router>
  );
}

export default App;