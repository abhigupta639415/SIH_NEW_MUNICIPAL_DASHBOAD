import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Users, 
  Settings,
  Shield,
  Droplets,
  Zap,
  Hammer,
  Trash2,
  MapPin
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'issues', label: 'Issues Management', icon: FileText },
      { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    ];

    if (user?.role === 'municipal_admin') {
      baseItems.push(
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings }
      );
    }

    return baseItems;
  };

  const getDepartmentIcon = () => {
    switch (user?.role) {
      case 'municipal_admin':
        return Shield;
      case 'water_dept':
        return Droplets;
      case 'electricity_dept':
        return Zap;
      case 'pwd_dept':
        return Hammer;
      case 'sanitation_dept':
        return Trash2;
      case 'ward_supervisor':
        return MapPin;
      default:
        return Shield;
    }
  };

  const getDepartmentColor = () => {
    switch (user?.role) {
      case 'municipal_admin':
        return 'bg-government-primary';
      case 'water_dept':
        return 'bg-blue-600';
      case 'electricity_dept':
        return 'bg-yellow-600';
      case 'pwd_dept':
        return 'bg-green-600';
      case 'sanitation_dept':
        return 'bg-purple-600';
      case 'ward_supervisor':
        return 'bg-indigo-600';
      default:
        return 'bg-government-primary';
    }
  };

  const menuItems = getMenuItems();
  const DepartmentIcon = getDepartmentIcon();

  return (
    <div className="bg-white h-screen w-64 shadow-lg flex flex-col border-r border-gray-200 font-official">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className={`w-12 h-12 ${getDepartmentColor()} rounded-lg flex items-center justify-center mr-4`}>
            <DepartmentIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {user?.department || user?.role?.replace('_', ' ').toUpperCase()}
            </h2>
            <p className="text-sm text-gray-600">
              {user?.designation}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'bg-government-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>Municipal Corporation</p>
          <p>Digital India Initiative</p>
          <p className="mt-2">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;