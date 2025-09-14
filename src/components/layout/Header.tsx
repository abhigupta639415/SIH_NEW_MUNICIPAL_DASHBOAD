import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Bell, LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const getDepartmentTitle = () => {
    switch (user?.role) {
      case 'municipal_admin':
        return 'Municipal Corporation - Admin Dashboard';
      case 'water_dept':
        return 'Water Department - Issue Management';
      case 'electricity_dept':
        return 'Electricity Department - Issue Management';
      case 'pwd_dept':
        return 'Public Works Department - Issue Management';
      case 'sanitation_dept':
        return 'Sanitation Department - Issue Management';
      case 'ward_supervisor':
        return `Ward Supervisor - Field Operations (${user.ward})`;
      default:
        return 'Municipal Corporation';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-government-primary rounded-full flex items-center justify-center mr-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-government-primary font-official">
                {getDepartmentTitle()}
              </h1>
              <p className="text-sm text-gray-600">
                Government of India | Digital India Initiative
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            
            <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-government-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user?.name}</div>
                <div className="text-gray-500">{user?.designation}</div>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;