import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { navigation } from "../../config/navigation";

type Props = {
  open?: boolean;
  onClose?: () => void;
};

const Sidebar: React.FC<Props> = ({ open = true, onClose }) => {
  const user = useAppSelector((s) => s.auth.user);
  const role = user?.role ?? "guest";
  const isAuth = Boolean(user);

  const activeClass =
    "block py-2 px-3 rounded bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-white";
  const baseLinkClass =
    "block py-2 px-3 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200";
  const sidebarLinks = navigation.filter((item) => {
    if (item.auth && !isAuth) return false;
    if (item.role && item.role !== role) return false;
    return true;
  });

  return (
    <aside
      aria-hidden={!open}
      className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 ${
        open ? "block" : "hidden"
      } w-64`}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-gray-500 dark:text-slate-400">
            Welcome
          </div>
          <div className="font-semibold text-slate-800 dark:text-slate-100">
            {user?.name ?? "Guest"}
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="ml-2 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-sm"
          >
            ✕
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {sidebarLinks.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? activeClass : baseLinkClass
              }
            >
              <div className="flex items-center gap-2">
                {Icon && <Icon className="w-5 h-5" />}
                <span>{item.name}</span>
              </div>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-6 text-xs text-gray-500 dark:text-slate-500">
        © SwiftDrop
      </div>
    </aside>
  );
};

export default Sidebar;
