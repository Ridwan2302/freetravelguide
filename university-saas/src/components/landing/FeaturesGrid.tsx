import React from 'react';
import {
  BarChart3, Settings, FileText, Bell,
  ClipboardList, BookOpen, MessageSquare, Users,
  Calendar, Monitor, GraduationCap, CreditCard,
  Eye, AlertCircle, TrendingUp, Building, ArrowRight,
} from 'lucide-react';

const profiles = [
  {
    title: 'Administrateurs',
    subtitle: "Pilotez l'ensemble de votre établissement depuis un seul tableau de bord.",
    icon: Building,
    accent: 'blue',
    gradient: 'from-blue-500 to-blue-700',
    light: 'bg-blue-50 text-blue-600',
    ring: 'ring-blue-100',
    features: [
      { icon: BarChart3,   text: 'Tableaux de bord analytiques en temps réel' },
      { icon: Settings,    text: 'Gestion centralisée multi-entités' },
      { icon: FileText,    text: 'Rapports avancés et exports automatisés' },
      { icon: Bell,        text: 'Automatisation des processus administratifs' },
    ],
  },
  {
    title: 'Enseignants',
    subtitle: "Concentrez-vous sur l'essentiel : enseigner et accompagner vos étudiants.",
    icon: GraduationCap,
    accent: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    light: 'bg-emerald-50 text-emerald-600',
    ring: 'ring-emerald-100',
    features: [
      { icon: ClipboardList, text: 'Saisie rapide des notes avec coefficients' },
      { icon: BookOpen,      text: 'Gestion et publication des devoirs' },
      { icon: FileText,      text: 'Ressources pédagogiques centralisées' },
      { icon: MessageSquare, text: 'Communication directe avec les étudiants' },
    ],
  },
  {
    title: 'Étudiants',
    subtitle: 'Tout votre parcours académique accessible en un seul endroit, à tout moment.',
    icon: Users,
    accent: 'violet',
    gradient: 'from-violet-500 to-purple-700',
    light: 'bg-violet-50 text-violet-600',
    ring: 'ring-violet-100',
    features: [
      { icon: Calendar,      text: 'Emploi du temps interactif et personnalisé' },
      { icon: Monitor,       text: 'Ressources pédagogiques en ligne' },
      { icon: GraduationCap, text: 'Suivi des notes et GPA en temps réel' },
      { icon: CreditCard,    text: 'Paiements de scolarité sécurisés en ligne' },
    ],
  },
  {
    title: 'Parents',
    subtitle: 'Restez informés à chaque étape du parcours scolaire de votre enfant.',
    icon: Eye,
    accent: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    light: 'bg-orange-50 text-orange-600',
    ring: 'ring-orange-100',
    features: [
      { icon: TrendingUp,    text: 'Transparence totale des résultats scolaires' },
      { icon: AlertCircle,   text: 'Suivi des absences avec alertes instantanées' },
      { icon: Bell,          text: 'Notifications et échéances de paiements' },
      { icon: MessageSquare, text: "Messagerie directe avec l'administration" },
    ],
  },
];

export const FeaturesGrid: React.FC = () => (
  <section id="fonctionnalites" className="py-32 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">

      {/* Header */}
      <div className="max-w-2xl mb-20">
        <span className="inline-block bg-white text-blue-600 text-xs font-bold px-4 py-2 rounded-full mb-5 border border-slate-200 shadow-sm">
          Fonctionnalités
        </span>
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
          Un espace dédié pour chaque acteur de votre campus.
        </h2>
        <p className="mt-5 text-lg text-slate-500 leading-relaxed">
          Chaque profil dispose de son propre tableau de bord, conçu avec précision pour ses besoins quotidiens.
        </p>
      </div>

      {/* Profile cards grid */}
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        {profiles.map((profile, idx) => {
          const Icon = profile.icon;
          const isLarge = idx === 0;
          return (
            <div
              key={profile.title}
              className={`group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 ${isLarge ? 'md:col-span-2' : ''}`}
            >
              {/* Colored top band */}
              <div className={`h-1.5 bg-gradient-to-r ${profile.gradient}`} />

              <div className="p-8">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${profile.gradient} flex items-center justify-center mb-5 shadow-md ring-4 ${profile.ring}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-2">{profile.title}</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">{profile.subtitle}</p>

                <ul className="space-y-3.5">
                  {profile.features.map(({ icon: FIcon, text }) => (
                    <li key={text} className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${profile.light}`}>
                        <FIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-slate-600 font-medium">{text}</span>
                    </li>
                  ))}
                </ul>

                <div className={`mt-6 flex items-center gap-1.5 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${profile.light.split(' ')[1]}`}>
                  En savoir plus <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Bottom 3-metric strip */}
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { value: '99.9%',  label: 'Disponibilité garantie', desc: 'SLA entreprise inclus dans tous les plans' },
          { value: 'RGPD',   label: 'Conformité totale',      desc: 'Données hébergées en Europe, sécurisées par conception' },
          { value: '< 24h',  label: 'Déploiement rapide',     desc: 'Votre campus en ligne dès le lendemain' },
        ].map(({ value, label, desc }) => (
          <div key={label} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow shadow-blue-500/20">
              <span className="text-white font-black text-[11px] text-center px-0.5 leading-tight">{value}</span>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">{label}</p>
              <p className="text-xs text-slate-400 mt-1 leading-snug">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
