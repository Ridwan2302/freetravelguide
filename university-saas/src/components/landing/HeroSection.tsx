import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Award, TrendingUp, Users, BookOpen } from 'lucide-react';

const FloatingCard: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`absolute bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-4 ${className}`}>
    {children}
  </div>
);

export const HeroSection: React.FC = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
    {/* Decorative background shapes */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-bl from-blue-50 via-indigo-50/50 to-transparent" />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-indigo-100/50 rounded-full blur-2xl" />
      {/* Grid dots */}
      <div className="absolute right-0 top-0 w-[50%] h-full opacity-[0.35]"
        style={{ backgroundImage: 'radial-gradient(circle, #93c5fd 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
    </div>

    <div className="relative max-w-7xl mx-auto px-6 py-28 w-full">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — copy */}
        <div className="space-y-8 max-w-xl">
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold px-4 py-2 rounded-full border border-blue-100">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              Gestion universitaire centralisée
            </div>
          </div>

          <div className="fade-up-1">
            <h1 className="text-[3.5rem] lg:text-[4rem] font-black leading-[1.06] tracking-tight text-slate-900">
              Awi<span className="text-blue-600">lo</span>
            </h1>
            <p className="mt-5 text-xl text-slate-500 leading-relaxed">
              Gérez votre établissement, vos étudiants, enseignants et finances depuis un seul espace conçu pour l'excellence académique.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 fade-up-2">
            <Link
              to="/onboarding"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-2xl font-bold text-sm transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 active:scale-[0.97]"
            >
              Créer mon espace
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/connexion"
              className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 bg-white text-slate-700 px-7 py-4 rounded-2xl font-semibold text-sm transition-all duration-200 hover:bg-slate-50 active:scale-[0.97]"
            >
              Se connecter
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-5 pt-1 fade-up-3">
            {[
              { icon: Shield, label: 'Conforme RGPD' },
              { icon: Clock,  label: 'En ligne en 24h' },
              { icon: Award,  label: 'Support dédié' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-slate-400 text-sm">
                <Icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — illustrated dashboard + floating cards */}
        <div className="hidden lg:block relative h-[520px] fade-up-2">

          {/* Main dashboard card */}
          <div className="absolute inset-x-8 top-8 bottom-8 bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden">
            {/* Header bar */}
            <div className="bg-slate-50 border-b border-slate-100 px-5 py-3.5 flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-300" />
                <div className="w-3 h-3 rounded-full bg-amber-300" />
                <div className="w-3 h-3 rounded-full bg-emerald-300" />
              </div>
              <div className="flex-1 bg-slate-200/60 rounded-lg h-6 ml-2" />
            </div>

            {/* Dashboard body */}
            <div className="p-5 space-y-4">
              {/* Stat row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Étudiants',    value: '1 248', icon: Users,    color: 'bg-blue-50 text-blue-600' },
                  { label: 'Cours actifs', value: '84',    icon: BookOpen, color: 'bg-emerald-50 text-emerald-600' },
                  { label: 'Taux réussite', value: '92%',  icon: TrendingUp, color: 'bg-violet-50 text-violet-600' },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 ${color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-lg font-black text-slate-900">{value}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Bar chart */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inscriptions 2025</p>
                  <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">↑ 12%</span>
                </div>
                <div className="flex items-end gap-1.5 h-14">
                  {[35, 50, 42, 65, 58, 80, 68, 85, 76, 90, 82, 88].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end">
                      <div
                        className={`rounded-t-sm ${i === 11 ? 'bg-blue-600' : 'bg-blue-200'}`}
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Student list */}
              <div className="space-y-2">
                {[
                  { name: 'Sophie Laurent',  prog: 'Master 1 — Droit',    grade: 'A+', color: 'from-blue-500 to-indigo-600' },
                  { name: 'Martin Dupont',   prog: 'Licence 3 — Sciences', grade: 'B+', color: 'from-emerald-500 to-teal-600' },
                  { name: 'Ahmad Karim',     prog: 'Licence 2 — Éco',      grade: 'A',  color: 'from-violet-500 to-purple-600' },
                ].map(({ name, prog, grade, color }) => (
                  <div key={name} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{name}</p>
                      <p className="text-xs text-slate-400 truncate">{prog}</p>
                    </div>
                    <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">{grade}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <FloatingCard className="-top-2 -right-2 float">
            <p className="text-xs text-slate-400 font-medium mb-1">Nouveaux inscrits</p>
            <p className="text-2xl font-black text-slate-900">+24</p>
            <p className="text-xs text-emerald-500 font-semibold mt-0.5">ce mois</p>
          </FloatingCard>

          <FloatingCard className="-bottom-2 -left-4 float-2">
            <p className="text-xs text-slate-400 font-medium mb-1">Revenus mensuels</p>
            <p className="text-xl font-black text-slate-900">8 400 €</p>
            <p className="text-xs text-emerald-500 font-semibold mt-0.5">↑ 12% vs mois dernier</p>
          </FloatingCard>
        </div>
      </div>

      {/* Trusted by strip */}
      <div className="mt-24 pt-8 border-t border-slate-100 fade-up-4">
        <p className="text-center text-slate-300 text-xs font-bold uppercase tracking-widest mb-7">
          Déjà choisi par des établissements d'excellence
        </p>
        <div className="flex flex-wrap justify-center gap-10">
          {['Université Paris Tech', 'École Nationale Sup.', 'Institut Médical Lyon', 'Université de Bordeaux', 'ENIB Sciences'].map((uni) => (
            <span key={uni} className="text-slate-300 font-bold text-sm">{uni}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);
