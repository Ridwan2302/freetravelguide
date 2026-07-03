import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { Footer } from '../components/common/Footer';

const articles = [
  {
    id: 1,
    title: "Comment digitaliser la gestion de votre université en moins de 48h",
    excerpt: "La transformation numérique des établissements d'enseignement supérieur n'est plus une option. Découvrez comment des dizaines d'universités ont modernisé leurs processus administratifs en un temps record.",
    category: "Transformation digitale",
    author: "Équipe University SaaS",
    date: "15 juin 2025",
    readTime: "5 min",
    image: null,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "RGPD et données étudiantes : tout ce que votre établissement doit savoir",
    excerpt: "La conformité réglementaire est au cœur de toute stratégie numérique responsable. Découvrez comment University SaaS garantit la protection des données de vos étudiants.",
    category: "Conformité",
    author: "Équipe Juridique",
    date: "8 juin 2025",
    readTime: "8 min",
    image: null,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 3,
    title: "Améliorer le suivi académique : les indicateurs clés à surveiller",
    excerpt: "Taux de réussite, taux d'abandon, GPA moyen par département — quels indicateurs doivent piloter votre stratégie pédagogique ? Un guide pratique pour les directeurs.",
    category: "Pilotage académique",
    author: "Dr. Sophie Martin",
    date: "1 juin 2025",
    readTime: "6 min",
    image: null,
    gradient: "from-violet-500 to-purple-700",
  },
  {
    id: 4,
    title: "Témoignage : comment l'Institut de Lyon a réduit ses tâches administratives de 60%",
    excerpt: "Retour d'expérience de Dr. Karim Benali, Directeur des Affaires Académiques à l'Institut Supérieur de Lyon, sur le déploiement d'University SaaS auprès de 1 800 étudiants.",
    category: "Témoignage client",
    author: "Rédaction",
    date: "24 mai 2025",
    readTime: "4 min",
    image: null,
    gradient: "from-orange-500 to-amber-600",
  },
  {
    id: 5,
    title: "La communication parents-administration : un levier sous-estimé",
    excerpt: "Impliquer les parents dans le suivi scolaire améliore significativement les résultats académiques. Voici comment notre module parental transforme cette relation.",
    category: "Engagement",
    author: "Équipe University SaaS",
    date: "17 mai 2025",
    readTime: "5 min",
    image: null,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    id: 6,
    title: "Paiements en ligne des scolarités : sécurité, conformité et expérience utilisateur",
    excerpt: "Le module de paiement intégré d'University SaaS permet aux étudiants de régler leurs frais de scolarité en quelques clics, avec un niveau de sécurité bancaire.",
    category: "Finance",
    author: "Équipe Produit",
    date: "10 mai 2025",
    readTime: "7 min",
    image: null,
    gradient: "from-cyan-500 to-blue-600",
  },
];

const categories = ['Tous', 'Transformation digitale', 'Conformité', 'Pilotage académique', 'Témoignage client', 'Engagement', 'Finance'];

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filtered = activeCategory === 'Tous' ? articles : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow shadow-blue-500/20">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-black text-slate-900">University SaaS</span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero */}
        <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block bg-blue-500/20 text-blue-300 text-xs font-bold px-4 py-2 rounded-full mb-6 border border-blue-500/30">
              Blog & Actualités
            </span>
            <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tight mb-5">
              Ressources pour<br />
              <span className="text-blue-400">l'enseignement supérieur</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              Conseils, retours d'expérience et guides pratiques pour moderniser votre établissement.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white border-b border-slate-100 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow shadow-blue-600/20'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Articles grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <article
                  key={article.id}
                  className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 cursor-pointer"
                >
                  {/* Card image area */}
                  <div className={`h-44 bg-gradient-to-br ${article.gradient} relative overflow-hidden flex items-end p-5`}>
                    <div className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <span className="relative inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h2 className="text-base font-black text-slate-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${article.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                          {article.author[0]}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-700">{article.author}</p>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            <span>{article.date}</span>
                            <span>·</span>
                            <span>{article.readTime} de lecture</span>
                          </div>
                        </div>
                      </div>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br ${article.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md`}>
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-3">Restez informé</h2>
            <p className="text-slate-400 mb-8">Recevez nos derniers articles et mises à jour directement dans votre boîte mail.</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors shadow shadow-blue-600/20">
                S'abonner
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Blog;
