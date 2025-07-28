"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '@/styles/navbar.css';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => (
    pathname === path ? "navbar-link active" : "navbar-link"
  );

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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;