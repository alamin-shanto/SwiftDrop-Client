// src/components/layout/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Button from "../common/Button";
import { FaBars, FaUserCircle } from "react-icons/fa";

type Props = {
  onOpenSidebar?: () => void;
};

export const Navbar: React.FC<Props> = ({ onOpenSidebar }) => {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <nav className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onOpenSidebar} className="md:hidden p-2 text-lg">
          <FaBars />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/Images/SwiftDrop Logo.png"
            alt="SwiftDrop"
            className="w-8 h-8"
          />
          <span className="font-semibold">SwiftDrop</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/features" className="hidden md:inline text-sm">
          Features
        </Link>
        <Link to="/tracking" className="text-sm">
          Track
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/profile" className="flex items-center gap-2 text-sm">
              <FaUserCircle />
              <span>{user.name}</span>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                /* logout handler in Navbar? */
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/auth/login">
              <Button variant="ghost" size="md">
                Login
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button variant="primary" size="md">
                Sign up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
