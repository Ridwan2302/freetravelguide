import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => (
  <footer className="ink text-slate-400 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

        {/* Brand */}
        <div className="md:col-span-5">
          <p className="font-display text-3xl text-white">
            University <span className="italic font-light text-blue-400">SaaS</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 max-w-xs">
            La plateforme de référence pour la gestion universitaire moderne en France.
          </p>
        </div>

        {/* Produit */}
        <div className="md:col-span-2">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-5">Produit</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#fonctionnalites" className="hover:text-white transition-colors">Fonctionnalités</a></li>
            <li><a href="#tarifs" className="hover:text-white transition-colors">Tarifs</a></li>
            <li><Link to="/onboarding" className="hover:text-white transition-colors">Démarrer</Link></li>
            <li><Link to="/connexion" className="hover:text-white transition-colors">Se connecter</Link></li>
          </ul>
        </div>

        {/* Ressources */}
        <div className="md:col-span-2">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-5">Ressources</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Actualités</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Nous contacter</Link></li>
            <li><a href="mailto:demo@universitysaas.fr" className="hover:text-white transition-colors">Demander une démo</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Légal */}
        <div className="md:col-span-3">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-5">Légal</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
            <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
            <li><a href="#" className="hover:text-white transition-colors">RGPD</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-slate-600">© 2025 University SaaS. Tous droits réservés.</p>
        <p className="text-sm text-slate-600 font-display italic">Conçu pour l'éducation française</p>
      </div>
    </div>
  </footer>
);
