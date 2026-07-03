import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Award } from 'lucide-react';

export const HeroSection: React.FC = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a1628]">
    {/* Multi-layer background */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2147] to-[#0a1628]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />
    </div>

    <div className="relative max-w-7xl mx-auto px-6 py-32 w-full">
      <div className="grid lg:grid-cols-2 gap-20 items-center">

        {/* Left — copy */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-blue-300 font-medium">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Plateforme universitaire de nouvelle génération
          </div>

          <div>
            <h1 className="text-5xl lg:text-[3.75rem] font-black leading-[1.08] tracking-tight text-white">
              La gestion
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                universitaire,
              </span>
              réinventée.
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-lg">
              Unifiez l'administration, les enseignants, les étudiants et les parents sur une seule plateforme fluide. Conçue pour les établissements qui visent l'excellence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/onboarding"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-7 py-4 rounded-2xl font-semibold text-base transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Démarrer gratuitement
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/connexion"
              className="inline-flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white px-7 py-4 rounded-2xl font-semibold text-base transition-all duration-200 backdrop-blur-sm"
            >
              Se connecter
            </Link>
          </div>

          <div className="flex items-center gap-6 pt-2">
            {[
              { icon: Shield, label: 'Conforme RGPD' },
              { icon: Clock, label: 'Déploiement en 24h' },
              { icon: Award, label: 'Support dédié' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-slate-400 text-sm">
                <Icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — dashboard mockup */}
        <div className="hidden lg:block relative">
          {/* Main card */}
          <div className="relative bg-white/[0.06] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
              <div className="flex-1 bg-white/10 h-6 rounded-lg ml-3 flex items-center px-3">
                <span className="text-white/30 text-xs">campus.universitysaas.fr</span>
              </div>
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Étudiants', value: '1 248', delta: '+24', color: 'from-blue-500/20 to-blue-600/10', dot: 'bg-blue-400' },
                { label: 'Cours actifs', value: '84', delta: '+6', color: 'from-green-500/20 to-green-600/10', dot: 'bg-green-400' },
                { label: 'Taux réussite', value: '92%', delta: '+3%', color: 'from-purple-500/20 to-purple-600/10', dot: 'bg-purple-400' },
              ].map(({ label, value, delta, color, dot }) => (
                <div key={label} className={`bg-gradient-to-br ${color} border border-white/10 rounded-2xl p-3.5`}>
                  <div className={`w-2 h-2 ${dot} rounded-full mb-3`} />
                  <p className="text-white font-bold text-lg leading-none">{value}</p>
                  <p className="text-white/50 text-xs mt-1">{label}</p>
                  <p className="text-green-400 text-xs mt-1 font-medium">{delta}</p>
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="bg-white/5 border border-white/8 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/60 text-xs font-medium">Inscriptions — Année 2025</p>
                <span className="text-green-400 text-xs font-semibold">↑ 12%</span>
              </div>
              <div className="flex items-end gap-1.5 h-16">
                {[38, 52, 45, 68, 60, 82, 70, 88, 78, 94, 86, 92].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end">
                    <div
                      className="rounded-t-sm bg-gradient-to-t from-blue-600 to-blue-400 opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Student list */}
            <div className="space-y-2">
              {[
                { name: 'Martin Dupont', prog: 'Licence 3 — Sciences', badge: 'A+' },
                { name: 'Sophie Laurent', prog: 'Master 1 — Droit', badge: 'B+' },
                { name: 'Ahmad Karim', prog: 'Licence 2 — Éco', badge: 'A' },
              ].map(({ name, prog, badge }) => (
                <div key={name} className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-3 py-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/90 text-sm font-medium truncate">{name}</p>
                    <p className="text-white/40 text-xs truncate">{prog}</p>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-semibold">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating notification cards */}
          <div className="absolute -top-5 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-xl">
            <p className="text-white/60 text-xs mb-0.5">Nouveaux inscrits</p>
            <p className="text-white font-bold text-xl">+24 <span className="text-green-400 text-sm">ce mois</span></p>
          </div>
          <div className="absolute -bottom-5 -left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-xl">
            <p className="text-white/60 text-xs mb-0.5">Revenus mensuels</p>
            <p className="text-white font-bold text-xl">8 400 € <span className="text-green-400 text-sm">↑ 12%</span></p>
          </div>
        </div>
      </div>

      {/* Trusted by */}
      <div className="mt-24 pt-8 border-t border-white/8">
        <p className="text-center text-slate-500 text-sm mb-6 uppercase tracking-widest text-xs">Déjà choisi par des établissements d'excellence</p>
        <div className="flex flex-wrap justify-center gap-10">
          {['Université Paris Tech', 'École Nationale Sup.', 'Institut Médical Lyon', 'Université de Bordeaux', 'ENIB Sciences'].map((uni) => (
            <span key={uni} className="text-white/25 font-semibold text-sm">{uni}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);
