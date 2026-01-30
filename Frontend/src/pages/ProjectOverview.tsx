import { useParams } from 'react-router-dom';
import { Database, Users, Activity, Clock, User } from 'lucide-react';
import ShieldIcon from '../components/Common/ShieldIcon';
import styles from './ProjectOverview.module.css';

export default function ProjectOverview() {
    const { projectId } = useParams();

    // Mock data for the specific project
    const project = {
        id: projectId,
        name: 'E-commerce Platform',
        description: 'Production API for e-commerce platform',
        status: 'active',
        stats: [
            { label: 'Total Requests', value: '1.2M', icon: Activity, color: '#6366f1' },
            { label: 'Active Users', value: '1,250', icon: Users, color: '#10b981' },
            { label: 'Databases', value: '3', icon: Database, color: '#f59e0b' },
            { label: 'Security Score', value: '98%', icon: ShieldIcon, color: '#ef4444' },
        ]
    };

    return (
        <div className={styles['branch-overview']}>

            {/* HEADER */}
            <div className={styles['branch-header']}>
                <div className={styles['branch-title-row']}>
                    <h2 className={styles['branch-title']}>Branch overview</h2>

                    <div className={styles['branch-meta']}>
                        <span className={styles['branch-name']}>production</span>
                        <span className={styles['branch-badge']}>Default</span>
                    </div>
                </div>
            </div>

            {/* METRICS CARD */}
            <div className={styles['overview-card']}>
                <div className={styles['metric-grid']}>
                    <div className={styles['metric-box']}>
                        <div className={styles['metric-label']}>Storage</div>
                        <div className={styles['metric-value']}>38.76 MB</div>
                    </div>

                    <div className={styles['divider']} />

                    <div className={styles['info-item']}>
                        <div className={styles['info-label']}>Created on</div>
                        <div className={styles['info-value']}>
                            2026-01-14 23:22:44 +05:30
                        </div>
                    </div>

                    <div className={styles['divider']} />

                    <div className={styles['info-item']}>
                        <div className={styles['info-label']}>Created by</div>

                        <div className={styles['user-row']}>
                            <div className={styles['user-avatar']}>
                                <User size={16} />
                            </div>
                            <div className={styles['user-name']}>Mudit</div>
                        </div>
                    </div>

                </div>
            </div>

            {/* {INFO CARD} */}
            <div className={styles['info-card']}>
                <div className={styles['info-grid']}>

                    <div className={styles['info-item']}>
                        <div className={styles['info-label']}>ID</div>
                        <div className={styles['info-value']}>br-floral-sun-ah65r1uw</div>
                    </div>

                    <div className={styles['divider']} />

                    <div className={styles['info-item']}>
                        <div className={styles['info-label']}>Created on</div>
                        <div className={styles['info-value']}>
                            2026-01-14 23:22:44 +05:30
                        </div>
                    </div>

                    <div className={styles['divider']} />

                    <div className={styles['info-item']}>
                        <div className={styles['info-label']}>Created by</div>
                        <div className={styles['info-value']}>Mudit</div>
                    </div>

                </div>
            </div>
        </div>
    );
}
