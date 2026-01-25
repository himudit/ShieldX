import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ProjectSidebar from './ProjectSidebar';
import './ProjectLayout.css';

export default function ProjectLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`project-layout ${isCollapsed ? 'collapsed' : ''}`}>
            <ProjectSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
            <div className="project-content">
                <Outlet />
            </div>
        </div>
    );
}
