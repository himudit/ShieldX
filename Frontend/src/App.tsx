import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Landing from './pages/Landing';
import Overview from './pages/Overview';
import Projects from './pages/Projects';
import SDK from './pages/SDK';
import API from './pages/API';
import Functions from './pages/Functions';
import Settings from './pages/Settings';
import ProjectLayout from './components/ProjectLayout/ProjectLayout';
import ProjectOverview from './pages/ProjectOverview';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PublicRoute from './components/Auth/PublicRoute';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Public Routes - Only accessible when NOT logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes - Only accessible when logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<ProjectLayout />}>
              <Route index element={<ProjectOverview />} />
              <Route path="usage" element={<div>Users Page</div>} />
              <Route path="data-browser" element={<div>Security Page</div>} />
              <Route path="keys" element={<div>API Keys Page</div>} />
              <Route path="logs" element={<div>Logs Page</div>} />
              <Route path="settings" element={<div>Project Settings Page</div>} />
            </Route>
            <Route path="sdk" element={<SDK />} />
            <Route path="api" element={<API />} />
            <Route path="functions" element={<Functions />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
