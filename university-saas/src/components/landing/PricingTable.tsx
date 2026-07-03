import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap } from 'lucide-react';
import { PLAN_DETAILS } from '../../types';

export const PricingTable: React.FC = () => (
  <section id="tarifs" className="py-32 bg-[#f7f9fc]">
    <div className="max-w-7xl mx-auto px-6">

      {/* Header */}
      <div className="text-center mb-20">
        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest border border-blue-100">
          Tarifs
        </span>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
          Simple. Transparent. Évolutif.
        </h2>
        <p className="mt-5 text-xl text-gray-500 max-w-xl mx-auto">
          Choisissez le plan adapté à la taille de votre établissement. Changez de formule à tout moment.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {(['standard', 'premium', 'enterprise'] as const).map((plan) => {
          const details = PLAN_DETAILS[plan];
          const isPremium = plan === 'premium';

          return (
            <div
              key={plan}
              className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
                isPremium
                  ? 'bg-[#0a1628] text-white shadow-2xl shadow-blue-900/30 scale-[1.03]'
                  : 'bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {isPremium && (
                <>
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-600/20 pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                      <Zap className="w-3 h-3 fill-current" /> Le plus populaire
                    </span>
                  </div>
                </>
              )}

              <div className="relative p-8">
                {isPremium && <div className="h-4" />}

                {/* Plan name & capacity */}
                <div className="mb-6">
                  <h3 className={`text-xl font-bold ${isPremium ? 'text-white' : 'text-gray-900'}`}>
                    {details.name}
                  </h3>
                  <p className={`text-sm mt-1 ${isPremium ? 'text-blue-300' : 'text-gray-400'}`}>
                    {details.maxStudents === 999999
                      ? 'Étudiants illimités'
                      : `Jusqu'à ${details.maxStudents.toLocaleString('fr-FR')} étudiants`}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span className={`text-5xl font-black tracking-tight ${isPremium ? 'text-white' : 'text-gray-900'}`}>
                      {details.price}€
                    </span>
                    <span className={`text-sm mb-2 ${isPremium ? 'text-blue-300' : 'text-gray-400'}`}>/mois</span>
                  </div>
                  {plan === 'standard' && (
                    <p className="text-xs text-gray-400 mt-1.5">14 jours d'essai gratuit inclus</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {details.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isPremium ? 'bg-blue-500/40' : 'bg-blue-50'
                      }`}>
                        <Check className={`w-3 h-3 ${isPremium ? 'text-blue-200' : 'text-blue-600'}`} />
                      </div>
                      <span className={`text-sm leading-snug ${isPremium ? 'text-blue-100' : 'text-gray-500'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={`/onboarding?plan=${plan}`}
                  className={`block text-center py-3.5 px-6 rounded-2xl font-semibold transition-all duration-200 ${
                    isPremium
                      ? 'bg-white text-blue-700 hover:bg-blue-50 shadow-lg shadow-white/10'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20'
                  }`}
                >
                  Commencer
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-400 text-sm">
          Besoin d'un devis sur mesure pour votre réseau d'établissements ?{' '}
          <a href="mailto:contact@universitysaas.fr" className="text-blue-600 font-semibold hover:underline">
            Contactez-nous
          </a>
        </p>
      </div>
    </div>
  </section>
);
