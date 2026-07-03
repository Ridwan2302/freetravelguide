import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesGrid } from '../components/landing/FeaturesGrid';
import { PricingTable } from '../components/landing/PricingTable';
import { SocialProof } from '../components/landing/SocialProof';
import { Footer } from '../components/common/Footer';
import { ArrowRight, GraduationCap } from 'lucide-react';

const LandingPage: React.FC = () => (
  <div className="font-sans">
    {/* Navigation */}
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-black text-gray-900">University SaaS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '#fonctionnalites', label: 'Fonctionnalités' },
            { href: '#tarifs', label: 'Tarifs' },
            { href: '#temoignages', label: 'Témoignages' },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/connexion" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Connexion
          </Link>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 shadow shadow-blue-600/20"
          >
            Essai gratuit <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </nav>

    <div className="pt-16">
      <HeroSection />
      <FeaturesGrid />
      <SocialProof />
      <PricingTable />

      {/* Final CTA */}
      <section className="py-32 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2147] to-[#0a1628]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            Prêt à commencer ?
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-5">
            Modernisez votre établissement dès aujourd'hui.
          </h2>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed">
            Rejoignez plus de 50 universités et grandes écoles qui ont choisi University SaaS pour piloter leur campus avec précision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/onboarding"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold text-base hover:bg-blue-50 transition-all duration-200 shadow-xl shadow-white/10"
            >
              Créer mon espace <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:demo@universitysaas.fr"
              className="inline-flex items-center justify-center gap-2 border border-white/15 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-200 backdrop-blur-sm"
            >
              Demander une démonstration
            </a>
          </div>
          <p className="mt-7 text-slate-500 text-sm">14 jours d'essai gratuit · Sans carte bancaire · Résiliation à tout moment</p>
        </div>
      </section>

      <Footer />
    </div>
  </div>
);

export default LandingPage;
