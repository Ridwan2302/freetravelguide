import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const profiles = [
  {
    index: '01',
    title: 'Administrateurs',
    subtitle: "Pilotez l'ensemble de votre établissement depuis un seul tableau de bord.",
    features: ['Tableaux de bord en temps réel', 'Gestion multi-entités', 'Rapports et exports automatisés', 'Suivi des paiements et absences'],
  },
  {
    index: '02',
    title: 'Enseignants',
    subtitle: "Concentrez-vous sur l'essentiel : enseigner et accompagner vos étudiants.",
    features: ['Saisie rapide des notes', 'Publication des devoirs', 'Ressources centralisées', 'Messagerie directe avec les étudiants'],
  },
  {
    index: '03',
    title: 'Étudiants',
    subtitle: 'Tout le parcours académique accessible en un seul endroit, à tout moment.',
    features: ['Emploi du temps interactif', 'Notes et bulletin PDF', 'Paiements de scolarité en ligne', 'Calendrier académique'],
  },
  {
    index: '04',
    title: 'Parents',
    subtitle: "Restez informés à chaque étape du parcours scolaire de votre enfant.",
    features: ['Transparence des résultats', 'Suivi des absences en direct', 'Échéances de paiement', "Messagerie avec l'administration"],
  },
];

export const FeaturesGrid: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="fonctionnalites" className="bg-white border-t hairline">
      <div className="max-w-7xl mx-auto px-6 py-28">

        {/* Section head */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-700">01 — Fonctionnalités</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-display text-4xl lg:text-6xl text-slate-900 leading-[1.05]">
              Un espace dédié pour <span className="italic font-light text-blue-700">chaque acteur</span> de votre campus.
            </h2>
          </div>
        </div>

        {/* Accordion rows */}
        <div className="border-t hairline">
          {profiles.map((p, i) => {
            const isOpen = active === i;
            return (
              <button
                key={p.index}
                onClick={() => setActive(i)}
                className="w-full text-left border-b hairline group"
              >
                <div className="grid lg:grid-cols-12 gap-4 py-8 items-start">
                  <div className="lg:col-span-1">
                    <span className={`font-display text-lg transition-colors ${isOpen ? 'text-blue-700' : 'text-slate-300'}`}>{p.index}</span>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className={`font-display text-3xl lg:text-4xl transition-colors duration-300 ${isOpen ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      {p.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-6">
                    <p className={`text-slate-500 leading-relaxed transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-50'}`}>
                      {p.subtitle}
                    </p>
                    <div className={`grid sm:grid-cols-2 gap-x-8 gap-y-2 overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-40 opacity-100 mt-5' : 'max-h-0 opacity-0'}`}>
                      {p.features.map((f) => (
                        <p key={f} className="text-sm text-slate-700 flex items-center gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-blue-600 flex-shrink-0" />
                          {f}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="hidden lg:flex lg:col-span-1 justify-end">
                    <span className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-blue-700 border-blue-700 text-white rotate-0' : 'hairline text-slate-400 -rotate-45 group-hover:rotate-0'
                    }`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Guarantees strip */}
        <div className="grid sm:grid-cols-3 mt-16 border hairline rounded-2xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-[#faf9f7]">
          {[
            { v: '99,9 %', l: 'Disponibilité garantie', d: 'SLA entreprise inclus dans tous les plans' },
            { v: 'RGPD', l: 'Conformité totale', d: 'Données hébergées en Europe, sécurisées par conception' },
            { v: '< 24 h', l: 'Déploiement rapide', d: 'Votre campus en ligne dès le lendemain' },
          ].map(({ v, l, d }) => (
            <div key={l} className="p-8">
              <p className="font-display text-3xl text-blue-700">{v}</p>
              <p className="font-semibold text-slate-900 text-sm mt-2">{l}</p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
