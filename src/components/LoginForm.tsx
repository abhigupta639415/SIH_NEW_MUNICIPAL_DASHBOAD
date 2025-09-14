import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sampleCredentials } from '../utils/mockData';
import { Shield, Mail, Eye, EyeOff, AlertCircle, Building } from 'lucide-react';

const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const fillCredentials = (role: keyof typeof sampleCredentials) => {
    const creds = sampleCredentials[role];
    setEmail(creds.email);
    setPassword(creds.password);
    setError('');
  };

  const loginOptions = [
    { key: 'municipal_admin', label: 'Municipal Admin', icon: Shield, color: 'bg-government-primary' },
    { key: 'water_dept', label: 'Water Department', icon: Building, color: 'bg-blue-600' },
    { key: 'electricity_dept', label: 'Electricity Department', icon: Building, color: 'bg-yellow-600' },
    { key: 'pwd_dept', label: 'PWD Department', icon: Building, color: 'bg-green-600' },
    { key: 'sanitation_dept', label: 'Sanitation Department', icon: Building, color: 'bg-purple-600' },
    { key: 'ward_supervisor', label: 'Ward Supervisor', icon: Building, color: 'bg-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-government-light to-white flex items-center justify-center p-4 font-official">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-government-primary text-white p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-government-primary" />
            </div>
            <h1 className="text-xl font-bold">Municipal Corporation</h1>
            <p className="text-government-light text-sm mt-1">
              Civic Issue Management System
            </p>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Official Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-primary focus:border-transparent"
                    placeholder="Enter your official email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-primary focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-government-primary hover:bg-government-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Official Login'}
              </button>
            </form>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-3 text-center">
                Demo Access Credentials
              </div>
              <div className="grid grid-cols-1 gap-2">
                {loginOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.key}
                      onClick={() => fillCredentials(option.key as keyof typeof sampleCredentials)}
                      className="w-full text-left p-3 text-sm bg-white rounded border hover:bg-gray-50 transition-colors flex items-center"
                    >
                      <div className={`w-8 h-8 ${option.color} rounded flex items-center justify-center mr-3`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">{option.label}</span>
                        <div className="text-xs text-gray-500">
                          {sampleCredentials[option.key as keyof typeof sampleCredentials].email}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 text-center">
            <p className="text-xs text-gray-500">
              © 2025 Municipal Corporation. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;