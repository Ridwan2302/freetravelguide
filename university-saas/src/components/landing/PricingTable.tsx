import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { PLAN_DETAILS } from '../../types';

export const PricingTable: React.FC = () => (
  <section id="tarifs" className="py-32 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">

      <div className="text-center mb-20">
        <span className="inline-block bg-white text-blue-600 text-xs font-bold px-4 py-2 rounded-full mb-5 border border-slate-200 shadow-sm">
          Tarifs
        </span>
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Simple. Transparent. Évolutif.
        </h2>
        <p className="mt-5 text-lg text-slate-400 max-w-lg mx-auto">
          Choisissez le plan adapté à la taille de votre établissement. Changez de formule à tout moment.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {(['standard', 'premium', 'enterprise'] as const).map((plan) => {
          const details = PLAN_DETAILS[plan];
          const isPremium = plan === 'premium';

          return (
            <div
              key={plan}
              className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
                isPremium
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-600/25 scale-[1.03]'
                  : 'bg-white border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60'
              }`}
            >
              {isPremium && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-white text-blue-700 text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-blue-900/20">
                    ✦ Le plus populaire
                  </span>
                </div>
              )}

              <div className="p-8">
                {isPremium && <div className="h-4" />}

                <div className="mb-6">
                  <h3 className={`text-xl font-black ${isPremium ? 'text-white' : 'text-slate-900'}`}>
                    {details.name}
                  </h3>
                  <p className={`text-sm mt-1 ${isPremium ? 'text-blue-200' : 'text-slate-400'}`}>
                    {details.maxStudents === 999999
                      ? 'Étudiants illimités'
                      : `Jusqu'à ${details.maxStudents.toLocaleString('fr-FR')} étudiants`}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span className={`text-5xl font-black tracking-tight ${isPremium ? 'text-white' : 'text-slate-900'}`}>
                      {details.price}€
                    </span>
                    <span className={`text-sm mb-2 ${isPremium ? 'text-blue-200' : 'text-slate-400'}`}>/mois</span>
                  </div>
                  {plan === 'standard' && (
                    <p className="text-xs text-slate-400 mt-1.5 font-medium">14 jours d'essai gratuit inclus</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {details.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isPremium ? 'bg-white/20' : 'bg-blue-50'
                      }`}>
                        <Check className={`w-3 h-3 ${isPremium ? 'text-white' : 'text-blue-600'}`} />
                      </div>
                      <span className={`text-sm leading-snug ${isPremium ? 'text-blue-100' : 'text-slate-500'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/onboarding?plan=${plan}`}
                  className={`flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-[0.97] ${
                    isPremium
                      ? 'bg-white text-blue-700 hover:bg-blue-50 shadow-lg shadow-white/20'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow shadow-blue-600/20'
                  }`}
                >
                  Commencer <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-center text-slate-400 text-sm">
        Besoin d'un devis pour votre réseau d'établissements ?{' '}
        <a href="mailto:contact@universitysaas.fr" className="text-blue-600 font-bold hover:underline">
          Contactez-nous
        </a>
      </p>
    </div>
  </section>
);
