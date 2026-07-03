import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { PLAN_DETAILS } from '../../types';

export const PricingTable: React.FC = () => (
  <section id="tarifs" className="bg-white border-t hairline">
    <div className="max-w-7xl mx-auto px-6 py-28">

      <div className="grid lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-700">03 — Tarifs</p>
        </div>
        <div className="lg:col-span-8">
          <h2 className="font-display text-4xl lg:text-6xl text-slate-900 leading-[1.05]">
            Simple. Transparent. <span className="italic font-light text-blue-700">Évolutif.</span>
          </h2>
          <p className="mt-5 text-slate-500 max-w-lg">
            Choisissez le plan adapté à la taille de votre établissement. Changez de formule à tout moment.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 border hairline rounded-3xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {(['standard', 'premium', 'enterprise'] as const).map((plan) => {
          const details = PLAN_DETAILS[plan];
          const isPremium = plan === 'premium';

          return (
            <div key={plan} className={`relative flex flex-col p-9 ${isPremium ? 'ink text-white' : 'bg-white'}`}>
              {isPremium && (
                <p className="absolute top-0 left-9 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                  Le plus populaire
                </p>
              )}

              <div className="mb-8">
                <h3 className={`font-display text-2xl ${isPremium ? 'text-white' : 'text-slate-900'}`}>{details.name}</h3>
                <p className={`text-sm mt-1.5 ${isPremium ? 'text-slate-400' : 'text-slate-400'}`}>
                  {details.maxStudents === 999999
                    ? 'Étudiants illimités'
                    : `Jusqu'à ${details.maxStudents.toLocaleString('fr-FR')} étudiants`}
                </p>
              </div>

              <div className="mb-9 pb-9 border-b border-current/10">
                <div className="flex items-end gap-1.5">
                  <span className={`font-display text-6xl ${isPremium ? 'text-white' : 'text-slate-900'}`}>{details.price}€</span>
                  <span className={`text-sm mb-2.5 ${isPremium ? 'text-slate-400' : 'text-slate-400'}`}>/mois</span>
                </div>
                {plan === 'standard' && (
                  <p className="text-xs text-slate-400 mt-2">14 jours d'essai gratuit inclus</p>
                )}
              </div>

              <ul className="space-y-3.5 mb-10 flex-1">
                {details.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isPremium ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={`text-sm leading-snug ${isPremium ? 'text-slate-300' : 'text-slate-500'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to={`/onboarding?plan=${plan}`}
                className={`group flex items-center justify-center gap-2.5 py-4 rounded-full font-semibold text-sm transition-all duration-300 active:scale-[0.98] ${
                  isPremium
                    ? 'bg-white text-slate-900 hover:bg-blue-50'
                    : 'bg-slate-900 text-white hover:bg-blue-700'
                }`}
              >
                Commencer
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-center text-slate-400 text-sm">
        Besoin d'un devis pour votre réseau d'établissements ?{' '}
        <Link to="/contact" className="text-blue-700 font-semibold hover:underline">Contactez-nous</Link>
      </p>
    </div>
  </section>
);
