import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Mood from './pages/Mood';
import Planner from './pages/Planner';
import MoodHistory from './pages/MoodHistory';
import Footer from './components/Footer';       // ✅ NEW

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/mood"
              element={
                <PrivateRoute>
                  <Mood />
                </PrivateRoute>
              }
            />
            <Route
              path="/planner"
              element={
                <PrivateRoute>
                  <Planner />
                </PrivateRoute>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <MoodHistory />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Signup />} />
          </Routes>
        </div>

        <Footer />    {/* ✅ Calming footer */}
      </div>
    </Router>
  );
}

export default App;