import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path 
      ? "bg-blue-100 text-blue-700 border-r-4 border-blue-700" 
      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
  };

  const menuItems = [
    { name: 'Dashboard', path: '/' },
    ...(user?.role?.toLowerCase() === 'admin' ? [{ name: 'Teams', path: '/teams' }] : []),
    { name: 'Tasks', path: '/tasks' },

  ];

  return (
    <aside className="w-64 bg-white shadow-lg hidden md:block flex-shrink-0">
      <div className="h-full flex flex-col py-6">
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`${isActive(item.path)} flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
