import { NavLink, useParams } from 'react-router-dom';
import {
    LayoutDashboard,
    Settings,
    Database,
    Users,
    Activity,
    Key,
    ChevronLeft,
    ChevronRight,
    AlignEndHorizontalIcon,
    GripVertical,
    Boxes
} from 'lucide-react';
import './ProjectSidebar.css';

interface ProjectSidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export default function ProjectSidebar({ isCollapsed, onToggle }: ProjectSidebarProps) {
    const { projectId } = useParams();

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: `/dashboard/projects/${projectId}` },
        { icon: AlignEndHorizontalIcon, label: 'Usage', path: `/dashboard/projects/${projectId}/usage` },
        { icon: Database, label: 'Data Browser', path: `/dashboard/projects/${projectId}/data-browser` },
        { icon: Key, label: 'API Keys', path: `/dashboard/projects/${projectId}/keys` },
        { icon: Activity, label: 'Logs', path: `/dashboard/projects/${projectId}/logs` },
        { icon: Settings, label: 'Settings', path: `/dashboard/projects/${projectId}/settings` },
    ];

    return (
        <aside className={`project-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="project-sidebar-header">
                {!isCollapsed ? <h3> <Boxes size={30} />  Project</h3> : <h3> <Boxes size={30} /> </h3>}

            </div>
            <nav className="project-sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === `/dashboard/projects/${projectId}`}
                        className={({ isActive }) => `project-nav-item ${isActive ? 'active' : ''}`}
                        title={isCollapsed ? item.label : ''}
                    >
                        <item.icon size={18} />
                        {!isCollapsed && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </nav>
            <div
                className="project-resizer-handle"
                onMouseDown={(e) => {
                    const startX = e.clientX;
                    document.body.style.userSelect = 'none';
                    document.body.style.cursor = 'col-resize';

                    const handleMouseMove = (moveEvent: MouseEvent) => {
                        const diff = moveEvent.clientX - startX;
                        if (isCollapsed && diff > 50) {
                            onToggle();
                            cleanup();
                        } else if (!isCollapsed && diff < -50) {
                            onToggle();
                            cleanup();
                        }
                    };

                    const cleanup = () => {
                        document.body.style.userSelect = '';
                        document.body.style.cursor = '';
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                    };

                    const handleMouseUp = () => {
                        cleanup();
                    };

                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                }}
                onClick={onToggle}
            >
                <GripVertical size={14} />
            </div>
        </aside>
    );
}
