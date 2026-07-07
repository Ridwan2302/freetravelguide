import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraduationCap, Mail, Lock, Eye, EyeOff, Building, Users, BookOpen, Heart } from 'lucide-react';
import { loginUser, logoutUser } from '../lib/firebase/auth';
import { useAuthStore } from '../store/authStore';
import { getUserData } from '../lib/firebase/auth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { loginSchema, type LoginFormData } from '../lib/utils/validators';
import type { UserRole } from '../types';

type RoleTab = 'admin' | 'teacher' | 'student' | 'parent';

const ROLE_TABS: { key: RoleTab; label: string; icon: React.ElementType; desc: string; accent: string; ring: string }[] = [
  { key: 'admin',   label: 'Administration', icon: Building,      desc: 'Pilotez votre établissement',      accent: 'from-blue-500 to-indigo-600',   ring: 'ring-blue-200 border-blue-300 bg-blue-50/50' },
  { key: 'teacher', label: 'Enseignant',     icon: BookOpen,      desc: 'Cours, notes et devoirs',          accent: 'from-emerald-500 to-teal-600',  ring: 'ring-emerald-200 border-emerald-300 bg-emerald-50/50' },
  { key: 'student', label: 'Étudiant',       icon: GraduationCap, desc: 'Votre parcours académique',        accent: 'from-violet-500 to-purple-600', ring: 'ring-violet-200 border-violet-300 bg-violet-50/50' },
  { key: 'parent',  label: 'Parent',         icon: Heart,         desc: 'Suivez votre enfant',              accent: 'from-orange-500 to-amber-600',  ring: 'ring-orange-200 border-orange-300 bg-orange-50/50' },
];

// Quels rôles réels sont acceptés pour chaque onglet
const ALLOWED_ROLES: Record<RoleTab, UserRole[]> = {
  admin:   ['admin_universite', 'super_admin_plateforme'],
  teacher: ['teacher'],
  student: ['student'],
  parent:  ['parent'],
};

const ROLE_TAB_LABELS: Record<UserRole, string> = {
  super_admin_plateforme: 'Administration',
  admin_universite: 'Administration',
  teacher: 'Enseignant',
  student: 'Étudiant',
  parent: 'Parent',
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setFirebaseUser } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [roleTab, setRoleTab] = useState<RoleTab>('admin');

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/';
  const activeTab = ROLE_TABS.find((t) => t.key === roleTab)!;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      const fbUser = await loginUser(data.email, data.password);
      const userData = await getUserData(fbUser.uid);
      if (!userData) throw new Error('Compte introuvable.');

      // Vérifier que le rôle du compte correspond à l'espace choisi
      if (!ALLOWED_ROLES[roleTab].includes(userData.role)) {
        await logoutUser();
        setError(
          `Ce compte est un compte « ${ROLE_TAB_LABELS[userData.role]} ». Sélectionnez l'espace « ${ROLE_TAB_LABELS[userData.role]} » ci-dessus pour vous connecter.`
        );
        return;
      }

      setFirebaseUser({ uid: fbUser.uid, email: fbUser.email });
      setUser(userData);

      const dashboards: Record<string, string> = {
        super_admin_plateforme: '/dashboard/super-admin',
        admin_universite: '/dashboard/admin',
        teacher: '/dashboard/enseignant',
        student: '/dashboard/etudiant',
        parent: '/dashboard/parent',
      };
      navigate(dashboards[userData.role] ?? from, { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur de connexion.';
      if (msg.includes('user-not-found') || msg.includes('wrong-password') || msg.includes('invalid-credential')) {
        setError('Email ou mot de passe incorrect.');
      } else {
        setError(msg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8">
        <div className="text-center mb-7">
          <Link to="/" className="inline-flex items-center gap-2 mb-5">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900">University SaaS</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
          <p className="text-gray-500 text-sm mt-1">Choisissez votre espace puis identifiez-vous</p>
        </div>

        {/* Role selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-7">
          {ROLE_TABS.map(({ key, label, icon: Icon, accent, ring }) => {
            const isActive = roleTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => { setRoleTab(key); setError(null); }}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-3.5 transition-all duration-200 ${
                  isActive ? `ring-2 ${ring}` : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? `bg-gradient-to-br ${accent} text-white shadow-md` : 'bg-slate-100 text-slate-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-xs font-bold ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
              </button>
            );
          })}
        </div>

        <div className={`mb-6 rounded-2xl p-3.5 flex items-center gap-3 border ${activeTab.ring.split(' ').slice(1).join(' ')}`}>
          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${activeTab.accent} flex items-center justify-center flex-shrink-0`}>
            <activeTab.icon className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Espace {activeTab.label}</p>
            <p className="text-xs text-slate-500">{activeTab.desc}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4">
            <Alert type="error" title="Erreur de connexion" message={error} onClose={() => setError(null)} />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Adresse email"
            type="email"
            placeholder={roleTab === 'admin' ? 'admin@universite.fr' : roleTab === 'teacher' ? 'prof@universite.fr' : roleTab === 'student' ? 'etudiant@universite.fr' : 'parent@email.fr'}
            icon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            required
            {...register('email')}
          />

          <div className="relative">
            <Input
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
              error={errors.password?.message}
              required
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
              Se souvenir de moi
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          <Button type="submit" loading={isSubmitting} className="w-full justify-center" size="lg">
            Se connecter à l'espace {activeTab.label}
          </Button>
        </form>

        {roleTab === 'admin' ? (
          <p className="text-center text-sm text-gray-500 mt-6">
            Pas encore de compte ?{' '}
            <Link to="/onboarding" className="text-blue-600 font-semibold hover:underline">
              Créer un espace université
            </Link>
          </p>
        ) : (
          <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
            Vos identifiants vous sont fournis par l'administration de votre établissement.
            <br />Contactez-la si vous ne les avez pas reçus.
          </p>
        )}

        {/* Demo accounts */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500 font-medium mb-2">Comptes de démonstration :</p>
          <div className="space-y-1 text-xs text-gray-500">
            <p>Super Admin : admin@platform.fr / Admin2024!</p>
            <p>Université : admin@univ-demo.fr / Demo2024!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
