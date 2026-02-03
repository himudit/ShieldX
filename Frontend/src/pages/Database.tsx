import { Plus, Filter, Loader2 } from 'lucide-react';
import styles from './Database.module.css';
import { XTable } from '@/components/ui/x-table/XTable';
import type { ProjectUserRowResponseDto } from '@/modules/projectUser/dto/projectUserRow-response.dto';
import { ProjectRole } from '@/enums/enum';
import type { Column } from '@/components/ui/x-table/types';
import { useEffect, useState } from 'react';
import { getProjectUsers } from '@/services/project.api';
// import { toast } from 'react-hot-toast';

export default function Database() {
  const [users, setUsers] = useState<ProjectUserRowResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await getProjectUsers();
        if (response.success) {
          setUsers(response.data);
        } else {
          // toast.error(response.message || 'Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        // toast.error('An error occurred while fetching users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns: Column<ProjectUserRowResponseDto>[] = [
    { key: 'id', label: 'User Id', copyable: true },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'isVerified', label: 'Verified' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'lastLoginAt', label: 'Last Login' },
  ];

  if (isLoading) {
    return (
      <div className={styles['database-page']} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className={styles['database-page']}>
      <div className={styles['tables-section']}>
        <div className={styles['section-header']}>
          <h2>Project Users</h2>
          <span className={styles['section-count']}>{users.length} users</span>
        </div>

        <div className={styles['table-container']}>
          <XTable
            data={users}
            columns={columns}
            onRowClick={(row) => console.log('Clicked row:', row)}
          />
        </div>
      </div>
    </div>
  );
}

