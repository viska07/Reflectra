import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AddReflection from './pages/AddReflection';
import Reflections from './pages/Reflections';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-reflection" element={<AddReflection />} />
      <Route path="/reflections" element={<Reflections />} />
    </Routes>
  );
}
