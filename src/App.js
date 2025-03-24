// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import HackathonsPage from './pages/HackathonsPage';
import HackathonDetailsPage from './pages/HackathonDetailsPage';
import UserProfilePage from './pages/UserProfilePage';
import CreateHackathonPage from './pages/CreateHackathonPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OrganizerDashboardPage from './pages/OrganizerDashboardPage';
import OrganizerHackathonsPage from './pages/OrganizerHackathonsPage';
import SubmissionsPage from './pages/SubmissionsPage';
import SubmitProjectPage from './pages/SubmitProjectPage';
import './App.css';
import './global.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hackathons" element={<HackathonsPage />} />
        <Route path="/hackathons/:id" element={<HackathonDetailsPage />} />
        <Route path="/hackathons/:id/submissions" element={<SubmissionsPage />} /> {/* Fixed route */}
        <Route path="/hackathons/:id/submit" element={<SubmitProjectPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/create-hackathon" element={<CreateHackathonPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboardPage />} />
        <Route path="/organizer-hackathons" element={<OrganizerHackathonsPage />} />
        {/* Placeholder routes for other links */}
        <Route path="/features" element={<div className="min-h-screen flex justify-center items-center text-gray-400">Features Page (Coming Soon)</div>} />
        <Route path="/pricing" element={<div className="min-h-screen flex justify-center items-center text-gray-400">Pricing Page (Coming Soon)</div>} />
        <Route path="/about" element={<div className="min-h-screen flex justify-center items-center text-gray-400">About Page (Coming Soon)</div>} />
        <Route path="/blog" element={<div className="min-h-screen flex justify-center items-center text-gray-400">Blog Page (Coming Soon)</div>} />
        <Route path="/docs" element={<div className="min-h-screen flex justify-center items-center text-gray-400">Docs Page (Coming Soon)</div>} />
        <Route path="*" element={<div className="min-h-screen flex justify-center items-center text-gray-400">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;