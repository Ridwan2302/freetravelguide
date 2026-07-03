import React from 'react';
import {
  BarChart3, Settings, FileText, Bell,
  ClipboardList, BookOpen, MessageSquare, Users,
  Calendar, Monitor, GraduationCap, CreditCard,
  Eye, AlertCircle, TrendingUp, Building,
  CheckCircle2,
} from 'lucide-react';

const profiles = [
  {
    title: 'Administrateurs',
    subtitle: "Pilotez l'ensemble de votre établissement",
    icon: Building,
    accent: 'from-blue-500 to-blue-700',
    glow: 'shadow-blue-500/20',
    features: [
      { icon: BarChart3, text: 'Tableaux de bord analytiques en temps réel' },
      { icon: Settings, text: 'Gestion centralisée multi-entités' },
      { icon: FileText, text: 'Rapports avancés et exports automatisés' },
      { icon: Bell, text: 'Automatisation des processus administratifs' },
    ],
  },
  {
    title: 'Enseignants',
    subtitle: "Concentrez-vous sur l'essentiel : enseigner",
    icon: GraduationCap,
    accent: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/20',
    features: [
      { icon: ClipboardList, text: 'Saisie rapide des notes avec coefficients' },
      { icon: BookOpen, text: 'Gestion et publication des devoirs' },
      { icon: FileText, text: 'Ressources pédagogiques centralisées' },
      { icon: MessageSquare, text: 'Communication directe avec les étudiants' },
    ],
  },
  {
    title: 'Étudiants',
    subtitle: 'Tout votre parcours en un seul endroit',
    icon: Users,
    accent: 'from-violet-500 to-purple-700',
    glow: 'shadow-violet-500/20',
    features: [
      { icon: Calendar, text: 'Emploi du temps interactif et personnalisé' },
      { icon: Monitor, text: 'Ressources pédagogiques en ligne' },
      { icon: GraduationCap, text: 'Suivi des notes et GPA en temps réel' },
      { icon: CreditCard, text: 'Paiements de scolarité sécurisés en ligne' },
    ],
  },
  {
    title: 'Parents',
    subtitle: 'Restez informés à chaque étape',
    icon: Eye,
    accent: 'from-orange-500 to-amber-600',
    glow: 'shadow-orange-500/20',
    features: [
      { icon: TrendingUp, text: 'Transparence totale des résultats scolaires' },
      { icon: AlertCircle, text: 'Suivi des absences avec alertes instantanées' },
      { icon: Bell, text: 'Notifications et échéances de paiements' },
      { icon: MessageSquare, text: 'Messagerie directe avec l\'administration' },
    ],
  },
];

export const FeaturesGrid: React.FC = () => (
  <section id="fonctionnalites" className="py-32 bg-[#f7f9fc]">
    <div className="max-w-7xl mx-auto px-6">

      {/* Header */}
      <div className="text-center mb-20">
        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest border border-blue-100">
          Fonctionnalités
        </span>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
          Une solution pour chaque acteur
        </h2>
        <p className="mt-5 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Des espaces dédiés, conçus avec soin pour chaque profil utilisateur de votre établissement.
        </p>
      </div>

      {/* Profile cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {profiles.map((profile) => {
          const Icon = profile.icon;
          return (
            <div
              key={profile.title}
              className={`group relative bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-xl ${profile.glow} transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
            >
              {/* Top gradient strip */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${profile.accent} rounded-t-3xl`} />

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${profile.accent} flex items-center justify-center mb-5 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">{profile.title}</h3>
              <p className="text-sm text-gray-400 mb-5 leading-snug">{profile.subtitle}</p>

              <ul className="space-y-3">
                {profile.features.map(({ icon: FIcon, text }) => (
                  <li key={text} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-gray-300 flex-shrink-0 group-hover:text-blue-500 transition-colors duration-200" />
                    <span className="text-sm text-gray-500 leading-snug">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Bottom metrics strip */}
      <div className="mt-16 grid md:grid-cols-3 gap-4">
        {[
          { value: '99.9%', label: 'Disponibilité garantie', desc: 'SLA entreprise inclus dans tous les plans' },
          { value: 'RGPD', label: 'Conformité totale', desc: 'Données hébergées en Europe, sécurisées par design' },
          { value: '< 24h', label: 'Déploiement rapide', desc: 'Votre campus en ligne dès le lendemain' },
        ].map(({ value, label, desc }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm flex gap-5 items-start">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow">
              <span className="text-white font-black text-sm text-center leading-tight px-1">{value}</span>
            </div>
            <div>
              <p className="font-bold text-gray-900">{label}</p>
              <p className="text-sm text-gray-400 mt-0.5 leading-snug">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
