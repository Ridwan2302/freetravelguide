import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesGrid } from '../components/landing/FeaturesGrid';
import { PricingTable } from '../components/landing/PricingTable';
import { SocialProof } from '../components/landing/SocialProof';
import { Footer } from '../components/common/Footer';
import { ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => (
  <div className="font-sans paper">
    {/* Navigation */}
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f7]/85 backdrop-blur-xl border-b hairline">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-1">
          <span className="font-display text-xl text-slate-900">University</span>
          <span className="font-display italic text-xl text-blue-700">SaaS</span>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {[
            { href: '#fonctionnalites', label: 'Fonctionnalités' },
            { href: '#temoignages',     label: 'Témoignages' },
            { href: '#tarifs',          label: 'Tarifs' },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="text-[13px] text-slate-500 hover:text-slate-900 font-medium transition-colors duration-150">
              {label}
            </a>
          ))}
          <Link to="/blog" className="text-[13px] text-slate-500 hover:text-slate-900 font-medium transition-colors duration-150">
            Blog
          </Link>
          <Link to="/contact" className="text-[13px] text-slate-500 hover:text-slate-900 font-medium transition-colors duration-150">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <Link to="/connexion" className="text-[13px] font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            Connexion
          </Link>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-blue-700 text-white text-[13px] font-semibold px-5 py-2.5 rounded-full transition-all duration-300 active:scale-[0.98]"
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
      <section className="ink relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-32 text-center relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-400 mb-8">
            Prêt à commencer ?
          </p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] text-white max-w-4xl mx-auto">
            Modernisez votre établissement <span className="italic font-light text-blue-400">dès aujourd'hui.</span>
          </h2>
          <p className="mt-8 text-slate-400 max-w-md mx-auto leading-relaxed">
            Rejoignez plus de 50 universités et grandes écoles qui pilotent leur campus avec University SaaS.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/onboarding"
              className="group inline-flex items-center justify-center gap-3 bg-white text-slate-900 pl-8 pr-6 py-4 rounded-full font-semibold text-sm hover:bg-blue-50 transition-all duration-300 active:scale-[0.98]"
            >
              Créer mon espace
              <span className="w-7 h-7 rounded-full bg-slate-900/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 active:scale-[0.98]"
            >
              Demander une démonstration
            </Link>
          </div>
          <p className="mt-10 text-slate-500 text-xs">
            14 jours d'essai gratuit · Sans carte bancaire · Résiliation à tout moment
          </p>
        </div>
      </section>

      <Footer />
    </div>
  </div>
);

export default LandingPage;
