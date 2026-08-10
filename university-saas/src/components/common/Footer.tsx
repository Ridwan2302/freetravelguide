import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="bg-[#0a1628] text-slate-400">
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-black text-lg">Awi<span className="text-blue-400">lo</span></span>
          </div>
          <p className="text-sm leading-relaxed text-slate-500">
            La plateforme de référence pour la gestion universitaire moderne en France.
          </p>
        </div>

        {/* Produit */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">Produit</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#fonctionnalites" className="hover:text-white transition-colors">Fonctionnalités</a></li>
            <li><a href="#tarifs" className="hover:text-white transition-colors">Tarifs</a></li>
            <li><Link to="/onboarding" className="hover:text-white transition-colors">Démarrer</Link></li>
            <li><Link to="/connexion" className="hover:text-white transition-colors">Se connecter</Link></li>
          </ul>
        </div>

        {/* Ressources */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">Ressources</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Actualités</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Nous contacter</Link></li>
            <li><Link to="/contact?sujet=demo" className="hover:text-white transition-colors">Demander une démo</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Légal */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">Légal</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
            <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
            <li><a href="#" className="hover:text-white transition-colors">RGPD</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-slate-600">© 2025 Awilo. Tous droits réservés.</p>
        <p className="text-sm text-slate-600">Conçu pour l'éducation française 🎓</p>
      </div>
    </div>
  </footer>
);
