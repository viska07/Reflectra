import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Dashboard';
import AddReflection from './pages/AddReflection';
import Reflections from './pages/Reflections';

export default function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/add-reflection"
        element={<AddReflection />}
      />

      <Route
        path="/reflections"
        element={<Reflections />}
      />

    </Routes>
  );
}