import { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, ChevronDown, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { logout } from '../../store/slices/authSlice';
import styles from './Header.module.css';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className={styles.header}>
      <div className={styles['header-left']}>
        <div className={styles['search-container']}>
          <Search size={18} className={styles['search-icon']} />
          <input
            type="text"
            placeholder="Search projects, databases..."
            className={styles['search-input']}
          />
        </div>
      </div>
      <div className={styles['header-right']}>
        <button className={styles['header-icon-btn']}>
          <Bell size={18} />
        </button>
        <div className={styles['user-menu-container']} ref={dropdownRef}>
          <div
            className={styles['user-menu']}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className={styles['user-avatar']}>
              <User size={16} />
            </div>
            <ChevronDown size={16} />
          </div>

          {isDropdownOpen && (
            <div className={styles['dropdown-menu']}>
              <div className={styles['dropdown-header']}>
                <p className={styles['user-name']}>{user?.name}</p>
                <p className={styles['user-email']}>{user?.email}</p>
              </div>
              <div className={styles['dropdown-divider']} />
              <button className={styles['logout-btn']} onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
