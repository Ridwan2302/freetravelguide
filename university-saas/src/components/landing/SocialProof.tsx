import React from 'react';

const featured = {
  content: "La saisie des notes est désormais trois fois plus rapide. Nos enseignants peuvent enfin se concentrer sur ce qui compte vraiment.",
  name: 'Prof. Marie-Claire Fontaine',
  role: 'Doyenne de la Faculté des Sciences · Université Paris-Lumières',
};

const others = [
  {
    content: "La conformité RGPD intégrée nous a pleinement convaincus. Nos 1 800 étudiants bénéficient d'une expérience numérique moderne.",
    name: 'Dr. Karim Benali',
    role: 'Directeur des Affaires Académiques · Institut Supérieur de Lyon',
  },
  {
    content: "Le module de paiement a éliminé 90 % de notre charge administrative. En moins de 48 heures, nous étions opérationnels.",
    name: 'Isabelle Marchand',
    role: "Vice-Présidente Formation · École Nationale d'Ingénierie de Bordeaux",
  },
];

export const SocialProof: React.FC = () => (
  <section id="temoignages" className="paper border-t hairline">
    <div className="max-w-7xl mx-auto px-6 py-28">

      <div className="grid lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-700">02 — Témoignages</p>
        </div>
        <div className="lg:col-span-8">
          <h2 className="font-display text-4xl lg:text-6xl text-slate-900 leading-[1.05]">
            Ils ont <span className="italic font-light text-blue-700">modernisé</span> leur établissement.
          </h2>
        </div>
      </div>

      {/* Featured quote */}
      <figure className="border-y hairline py-14 mb-14">
        <blockquote className="font-display text-3xl lg:text-5xl leading-[1.2] text-slate-800 max-w-4xl">
          «&nbsp;{featured.content}&nbsp;»
        </blockquote>
        <figcaption className="mt-8 flex items-center gap-4">
          <span className="w-10 h-px bg-blue-600" />
          <div>
            <p className="font-semibold text-slate-900 text-sm">{featured.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">{featured.role}</p>
          </div>
        </figcaption>
      </figure>

      {/* Two supporting quotes */}
      <div className="grid md:grid-cols-2 gap-y-10 md:gap-x-16">
        {others.map((t, i) => (
          <figure key={t.name} className={i === 1 ? 'md:pl-16 md:border-l hairline' : 'md:pr-8'}>
            <blockquote className="font-display italic text-xl leading-relaxed text-slate-600">
              «&nbsp;{t.content}&nbsp;»
            </blockquote>
            <figcaption className="mt-5">
              <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Figures */}
      <div className="grid grid-cols-2 md:grid-cols-4 mt-20 border-t hairline">
        {[
          { v: '50+', l: 'Établissements partenaires' },
          { v: '35 000+', l: 'Étudiants gérés' },
          { v: '4,9 / 5', l: 'Satisfaction client' },
          { v: '40 %', l: 'Gain de productivité' },
        ].map(({ v, l }) => (
          <div key={l} className="py-8 pr-6 md:border-r md:last:border-r-0 hairline">
            <p className="font-display text-4xl text-slate-900">{v}</p>
            <p className="text-sm text-slate-400 mt-2">{l}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
