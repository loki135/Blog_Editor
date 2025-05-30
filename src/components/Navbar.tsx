import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Home, FileEdit } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center text-xl font-semibold text-blue-600">
                <FileText className="h-6 w-6 mr-2" />
                <span>BlogEditor</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
              <Link
                to="/new"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/new'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <FileEdit className="h-4 w-4 mr-1" />
                New Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden border-t border-gray-200 pt-2 pb-3 space-y-1">
        <Link
          to="/"
          className={`flex items-center px-3 py-2 text-base font-medium ${
            location.pathname === '/'
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
          }`}
        >
          <Home className="h-5 w-5 mr-2" />
          Home
        </Link>
        <Link
          to="/new"
          className={`flex items-center px-3 py-2 text-base font-medium ${
            location.pathname === '/new'
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
          }`}
        >
          <FileEdit className="h-5 w-5 mr-2" />
          New Blog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;