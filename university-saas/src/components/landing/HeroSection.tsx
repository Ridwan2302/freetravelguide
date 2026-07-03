import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export const HeroSection: React.FC = () => (
  <section className="relative paper overflow-hidden">
    {/* Vertical hairlines — editorial grid */}
    <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden>
      <div className="max-w-7xl mx-auto h-full px-6 grid grid-cols-12">
        <div className="col-span-3 border-l hairline" />
        <div className="col-span-6 border-l hairline" />
        <div className="col-span-3 border-l border-r hairline" />
      </div>
    </div>

    <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
      {/* Eyebrow */}
      <div className="flex items-center justify-between border-b hairline pb-5 mb-14 fade-up">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
          Plateforme de gestion universitaire
        </p>
        <p className="hidden sm:block text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
          France — Depuis 2024
        </p>
      </div>

      {/* Headline */}
      <div className="max-w-5xl fade-up-1">
        <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.98] text-slate-900 tracking-tight">
          L'université,
          <br />
          <span className="italic font-light text-blue-700">simplement</span> gérée.
        </h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 mt-14">
        {/* Left rail — description + CTAs */}
        <div className="lg:col-span-5 space-y-8 fade-up-2">
          <p className="text-lg text-slate-600 leading-relaxed max-w-md">
            Étudiants, enseignants, notes, paiements — tout votre établissement réuni
            dans un espace pensé pour la clarté. Sans friction, sans formation, sans attente.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/onboarding"
              className="group inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-blue-700 text-white pl-7 pr-5 py-4 rounded-full font-semibold text-sm transition-all duration-300 active:scale-[0.98]"
            >
              Créer mon espace
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 text-slate-700 hover:text-blue-700 px-6 py-4 font-semibold text-sm transition-colors"
            >
              Demander une démonstration <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400">
            14 jours d'essai gratuit · Sans carte bancaire · Conforme RGPD
          </p>
        </div>

        {/* Right — figures, editorial table style */}
        <div className="lg:col-span-7 fade-up-3">
          <div className="grid sm:grid-cols-3 border-t hairline">
            {[
              { n: '50+', l: 'Établissements équipés' },
              { n: '35 000', l: 'Étudiants gérés chaque jour' },
              { n: '< 24h', l: 'Pour mettre votre campus en ligne' },
            ].map(({ n, l }) => (
              <div key={l} className="border-b sm:border-b-0 sm:border-r last:border-r-0 hairline py-8 sm:px-8 first:sm:pl-0">
                <p className="font-display text-5xl text-slate-900">{n}</p>
                <p className="mt-3 text-sm text-slate-500 leading-snug max-w-[180px]">{l}</p>
              </div>
            ))}
          </div>

          {/* Mini product strip */}
          <div className="mt-10 rounded-2xl border hairline bg-white overflow-hidden shadow-[0_1px_0_rgba(15,23,42,0.04),0_24px_48px_-24px_rgba(15,23,42,0.18)]">
            <div className="flex items-center gap-2 px-5 py-3 border-b hairline">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <p className="ml-3 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">Tableau de bord — Administration</p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-slate-100">
              {[
                { k: 'Inscriptions', v: '+24', s: 'ce mois' },
                { k: 'Encaissements', v: '8 400 €', s: '↑ 12 %' },
                { k: 'Taux de réussite', v: '92 %', s: 'semestre 1' },
              ].map(({ k, v, s }) => (
                <div key={k} className="px-5 py-5">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">{k}</p>
                  <p className="font-display text-2xl text-slate-900 mt-1.5">{v}</p>
                  <p className="text-xs text-blue-600 font-semibold mt-0.5">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Marquee — trusted by */}
    <div className="border-t hairline py-5 overflow-hidden">
      <div className="marquee flex whitespace-nowrap gap-14 w-max">
        {[...Array(2)].map((_, dup) => (
          <React.Fragment key={dup}>
            {['Université Paris Tech', 'École Nationale Supérieure', 'Institut Médical de Lyon', 'Université de Bordeaux', 'ENIB Sciences', 'Institut Supérieur de Lyon', "École d'Ingénierie de Bordeaux"].map((uni) => (
              <span key={`${dup}-${uni}`} className="font-display italic text-lg text-slate-400">
                {uni} <span className="not-italic text-blue-300 mx-4">·</span>
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);
