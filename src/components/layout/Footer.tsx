import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 mt-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="font-semibold">SwiftDrop</div>
          <div className="text-sm text-gray-500">
            Reliable parcel delivery — local & nationwide.
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <Link to="/about" className="text-slate-600 dark:text-slate-300">
            About
          </Link>
          <Link to="/features" className="text-slate-600 dark:text-slate-300">
            Features
          </Link>
          <Link to="/contact" className="text-slate-600 dark:text-slate-300">
            Contact
          </Link>
        </div>

        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} SwiftDrop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
