import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Automatically collapse sidebar when entering a project's detail view
  useEffect(() => {
    const isProjectDetail = location.pathname.includes('/dashboard/projects/') &&
      location.pathname.split('/').length > 3;

    if (isProjectDetail) {
      setIsCollapsed(true);
    }
  }, [location.pathname]);

  return (
    <div className={`layout ${isCollapsed ? 'collapsed' : ''}`}>
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
