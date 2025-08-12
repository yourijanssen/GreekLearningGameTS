"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import '@/styles/navbar.css';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => (
    pathname === path ? "navbar-link active" : "navbar-link"
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar" aria-label="main navigation">
      <div className="navbar-content">
        <div className="navbar-row">
          <div className="navbar-left">
            <Link href="/" className="navbar-logo">
              🏛️ Greek Learning
            </Link>
            {/* Games Dropdown */}
            <div className="dropdown-group">
              <button className="dropdown-toggle" tabIndex={0} aria-haspopup="true" aria-expanded="false">
                Games ▾
              </button>
              <div className="dropdown-content" role="menu">
                <Link href="/games/alphabet" className={isActive('/games/alphabet') + " dropdown-link"}>Alphabet</Link>
                <Link href="/games/numbers" className={isActive('/games/numbers') + " dropdown-link"}>Numbers</Link>
                <Link href="/games/weekdays" className={isActive('/games/weekdays') + " dropdown-link"}>Weekdays</Link>
                <Link href="/games/names" className={isActive('/games/names') + " dropdown-link"}>Names</Link>
                <Link href="/games/to-be" className={isActive('/games/to-be') + " dropdown-link"}>To Be</Link>
              </div>
            </div>
          </div>
          <div className="navbar-right">
            <Link href="/games" className={isActive('/games')}>
              All Games
            </Link>
            {isAuthenticated ? (
              <>
                <span style={{ 
                  marginRight: '1rem', 
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  Welcome, {user?.name || user?.email}
                </span>
                <button 
                  onClick={handleLogout}
                  className="navbar-link"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    font: 'inherit',
                    padding: '0.5rem 1rem',
                    color: '#333',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className={isActive('/auth/login')}>
                  Login
                </Link>
                <Link href="/auth/register" className={isActive('/auth/register')}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;