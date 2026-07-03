import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Prof. Marie-Claire Fontaine',
    role: 'Doyenne de la Faculté des Sciences',
    university: 'Université Paris-Lumières',
    content:
      'La saisie des notes est désormais trois fois plus rapide. Nos enseignants peuvent enfin se concentrer sur ce qui compte vraiment : l\'enseignement. Le support est réactif et à l\'écoute.',
    rating: 5,
    initials: 'MF',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Dr. Karim Benali',
    role: 'Directeur des Affaires Académiques',
    university: 'Institut Supérieur de Lyon',
    content:
      'La conformité RGPD intégrée et l\'isolation des données par établissement nous ont pleinement convaincus. Nos 1 800 étudiants bénéficient d\'une expérience numérique moderne et fluide.',
    rating: 5,
    initials: 'KB',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Isabelle Marchand',
    role: 'Vice-Présidente Formation',
    university: 'École Nationale d\'Ingénierie de Bordeaux',
    content:
      'Le module de paiement et le suivi des scolarités ont éliminé 90% de notre charge administrative. En moins de 48 heures, notre établissement était entièrement opérationnel.',
    rating: 5,
    initials: 'IM',
    gradient: 'from-violet-500 to-purple-700',
  },
];

export const SocialProof: React.FC = () => (
  <section id="temoignages" className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6">

      {/* Header */}
      <div className="text-center mb-20">
        <span className="inline-block bg-amber-50 text-amber-600 text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest border border-amber-100">
          Témoignages
        </span>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
          La confiance de nos clients
        </h2>
        <p className="mt-5 text-xl text-gray-500 max-w-2xl mx-auto">
          Des directeurs et doyens qui ont modernisé la gestion de leur établissement.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="group relative bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-gray-100/80 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Subtle gradient top */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${t.gradient} rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed text-sm mb-7">
              "{t.content}"
            </p>

            <div className="flex items-center gap-3.5">
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow`}>
                {t.initials}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
                <p className="text-xs text-blue-500 font-medium mt-0.5">{t.university}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: '50+', label: 'Établissements partenaires' },
          { value: '35 000+', label: 'Étudiants gérés' },
          { value: '4.9 / 5', label: 'Satisfaction client' },
          { value: '40%', label: 'Gain de productivité admin' },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="bg-[#f7f9fc] border border-gray-100 rounded-3xl p-6 text-center"
          >
            <p className="text-3xl font-black text-gray-900">{value}</p>
            <p className="text-sm text-gray-400 mt-1.5 leading-snug">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
