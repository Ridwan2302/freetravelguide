import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, BookOpen, GraduationCap, CreditCard,
  BarChart3, Settings, Building, FileText, Bell, Calendar,
  ClipboardList, X, UserCheck, MessageSquare, AlertCircle, TrendingUp
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../types';

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  super_admin_plateforme: [
    { to: '/dashboard/super-admin',              icon: <LayoutDashboard className="w-4 h-4" />, label: "Vue d'ensemble" },
    { to: '/dashboard/super-admin/universites',  icon: <Building className="w-4 h-4" />,        label: 'Universités' },
    { to: '/dashboard/super-admin/abonnements',  icon: <CreditCard className="w-4 h-4" />,      label: 'Abonnements' },
    { to: '/dashboard/super-admin/audit',        icon: <FileText className="w-4 h-4" />,         label: 'Audit Logs' },
    { to: '/dashboard/super-admin/parametres',   icon: <Settings className="w-4 h-4" />,         label: 'Paramètres' },
  ],
  admin_universite: [
    { to: '/dashboard/admin',               icon: <LayoutDashboard className="w-4 h-4" />, label: "Vue d'ensemble" },
    { to: '/dashboard/admin/etudiants',     icon: <Users className="w-4 h-4" />,           label: 'Étudiants' },
    { to: '/dashboard/admin/enseignants',   icon: <UserCheck className="w-4 h-4" />,       label: 'Enseignants' },
    { to: '/dashboard/admin/parents',       icon: <Users className="w-4 h-4" />,            label: 'Parents' },
    { to: '/dashboard/admin/cours',         icon: <BookOpen className="w-4 h-4" />,         label: 'Cours & Programmes' },
    { to: '/dashboard/admin/paiements',     icon: <CreditCard className="w-4 h-4" />,      label: 'Paiements' },
    { to: '/dashboard/admin/absences',      icon: <AlertCircle className="w-4 h-4" />,      label: 'Absences' },
    { to: '/dashboard/admin/statistiques',  icon: <TrendingUp className="w-4 h-4" />,       label: 'Statistiques' },
    { to: '/dashboard/admin/calendrier',    icon: <Calendar className="w-4 h-4" />,         label: 'Calendrier' },
    { to: '/dashboard/admin/messagerie',    icon: <MessageSquare className="w-4 h-4" />,    label: 'Messagerie' },
    { to: '/dashboard/admin/audit',         icon: <ClipboardList className="w-4 h-4" />,   label: 'Audit Logs' },
    { to: '/dashboard/admin/parametres',    icon: <Settings className="w-4 h-4" />,         label: 'Paramètres' },
  ],
  teacher: [
    { to: '/dashboard/enseignant',              icon: <LayoutDashboard className="w-4 h-4" />, label: "Vue d'ensemble" },
    { to: '/dashboard/enseignant/cours',        icon: <BookOpen className="w-4 h-4" />,         label: 'Mes Cours' },
    { to: '/dashboard/enseignant/notes',        icon: <GraduationCap className="w-4 h-4" />,   label: 'Saisie des Notes' },
    { to: '/dashboard/enseignant/devoirs',      icon: <ClipboardList className="w-4 h-4" />,   label: 'Devoirs' },
    { to: '/dashboard/enseignant/absences',     icon: <AlertCircle className="w-4 h-4" />,      label: 'Absences' },
    { to: '/dashboard/enseignant/calendrier',   icon: <Calendar className="w-4 h-4" />,         label: 'Calendrier' },
    { to: '/dashboard/enseignant/messagerie',   icon: <MessageSquare className="w-4 h-4" />,    label: 'Messagerie' },
  ],
  student: [
    { to: '/dashboard/etudiant',                    icon: <LayoutDashboard className="w-4 h-4" />, label: "Vue d'ensemble" },
    { to: '/dashboard/etudiant/emploi-du-temps',    icon: <Calendar className="w-4 h-4" />,        label: 'Emploi du temps' },
    { to: '/dashboard/etudiant/calendrier',         icon: <Calendar className="w-4 h-4" />,         label: 'Calendrier' },
    { to: '/dashboard/etudiant/cours',              icon: <BookOpen className="w-4 h-4" />,         label: 'Mes Cours' },
    { to: '/dashboard/etudiant/notes',              icon: <GraduationCap className="w-4 h-4" />,   label: 'Notes' },
    { to: '/dashboard/etudiant/bulletin',           icon: <FileText className="w-4 h-4" />,         label: 'Bulletin PDF' },
    { to: '/dashboard/etudiant/paiements',          icon: <CreditCard className="w-4 h-4" />,      label: 'Paiements' },
    { to: '/dashboard/etudiant/absences',           icon: <AlertCircle className="w-4 h-4" />,      label: 'Absences' },
    { to: '/dashboard/etudiant/messagerie',         icon: <MessageSquare className="w-4 h-4" />,    label: 'Messagerie' },
  ],
  parent: [
    { to: '/dashboard/parent',             icon: <LayoutDashboard className="w-4 h-4" />, label: "Vue d'ensemble" },
    { to: '/dashboard/parent/notes',       icon: <BarChart3 className="w-4 h-4" />,       label: "Notes de l'enfant" },
    { to: '/dashboard/parent/absences',    icon: <AlertCircle className="w-4 h-4" />,      label: 'Absences' },
    { to: '/dashboard/parent/paiements',   icon: <CreditCard className="w-4 h-4" />,      label: 'Paiements' },
    { to: '/dashboard/parent/messagerie',  icon: <MessageSquare className="w-4 h-4" />,    label: 'Messagerie' },
  ],
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuthStore();
  const navItems = user ? NAV_ITEMS[user.role] ?? [] : [];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/20 z-20 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-60 bg-white border-r border-slate-100
          transform transition-transform duration-300 ease-out z-20
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
      >
        <div className="p-3 flex flex-col h-full">
          <div className="lg:hidden flex justify-end mb-1">
            <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to.split('/').length <= 3}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-300 text-center font-medium">University SaaS · v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};
