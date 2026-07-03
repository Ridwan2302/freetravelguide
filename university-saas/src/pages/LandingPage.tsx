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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow shadow-blue-500/20">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-black text-slate-900">University SaaS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '#fonctionnalites', label: 'Fonctionnalités' },
            { href: '#tarifs',          label: 'Tarifs' },
            { href: '#temoignages',     label: 'Témoignages' },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors duration-150">
              {label}
            </a>
          ))}
          <Link to="/blog" className="text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors duration-150">
            Blog
          </Link>
          <Link to="/contact" className="text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors duration-150">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/connexion" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            Connexion
          </Link>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all duration-200 shadow shadow-blue-600/20 active:scale-[0.97]"
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
      <section className="py-32 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-14 text-center shadow-2xl shadow-blue-600/20 relative overflow-hidden">
            {/* Background dots */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative">
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-5">
                Modernisez votre établissement dès aujourd'hui.
              </h2>
              <p className="text-lg text-blue-200 mb-10 max-w-xl mx-auto leading-relaxed">
                Rejoignez plus de 50 universités et grandes écoles qui pilotent leur campus avec University SaaS.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/onboarding"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-blue-50 transition-all duration-200 shadow-xl active:scale-[0.97]"
                >
                  Créer mon espace <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="mailto:demo@universitysaas.fr"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-[0.97]"
                >
                  Demander une démonstration
                </a>
              </div>
              <p className="mt-7 text-blue-300 text-xs font-medium">
                14 jours d'essai gratuit · Sans carte bancaire · Résiliation à tout moment
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </div>
);

export default LandingPage;
