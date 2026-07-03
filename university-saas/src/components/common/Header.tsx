import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, LogOut, Settings, ChevronDown, Menu, GraduationCap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { logoutUser } from '../../lib/firebase/auth';
import { ROLE_LABELS } from '../../lib/utils/constants';
import { WeatherWidget } from './WeatherWidget';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    logout();
    navigate('/');
  };

  const initials = user
    ? `${user.profile.firstName?.[0] ?? ''}${user.profile.lastName?.[0] ?? ''}`.toUpperCase()
    : 'U';

  return (
    <header className="bg-white border-b border-slate-100 px-4 h-16 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 lg:hidden transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <Link to="/" className="flex items-baseline gap-1">
          <span className="font-display text-lg text-slate-900">University</span>
          <span className="font-display italic text-lg text-blue-700 hidden sm:block">SaaS</span>
        </Link>
      </div>

      <div className="flex items-center gap-1.5">
        <WeatherWidget />
        <button className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 relative transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow shadow-blue-500/20">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-slate-800 leading-none">
                {user?.profile.firstName} {user?.profile.lastName}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {ROLE_LABELS[user?.role ?? ''] ?? user?.role}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 py-2 z-50 scale-in">
                <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
                  <p className="text-xs text-slate-400 font-medium">Compte</p>
                  <p className="text-sm font-semibold text-slate-700 truncate mt-0.5">{user?.email}</p>
                </div>
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" /> Paramètres
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Déconnexion
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
