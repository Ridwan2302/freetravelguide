import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Footer } from '../components/common/Footer';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', institution: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nom requis';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email invalide';
    if (!form.subject.trim()) e.subject = 'Sujet requis';
    if (form.message.trim().length < 20) e.message = 'Message trop court (min. 20 caractères)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setTimeout(() => {
      setSent(true);
      setSending(false);
    }, 1200);
  };

  const field = (key: keyof typeof form, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
          errors[key] ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500/30 focus:border-blue-400'
        }`}
      />
      {errors[key] && <p className="mt-1 text-xs text-red-500">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f7]/85 backdrop-blur-xl border-b hairline">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-baseline gap-1">
            <span className="font-display text-xl text-slate-900">University</span>
            <span className="font-display italic text-xl text-blue-700">SaaS</span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
        </div>
      </nav>

      <div className="pt-16">
        <section className="py-24 ink relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-400 mb-8">
              Nous contacter
            </p>
            <h1 className="font-display text-5xl lg:text-7xl text-white tracking-tight mb-6 leading-[1.02]">
              Parlons de votre<br />
              <span className="italic font-light text-blue-400">établissement</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-lg mx-auto">
              Notre équipe répond en moins de 24h. Demandez une démonstration personnalisée.
            </p>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-10">
              {/* Info column */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">On est là pour vous</h2>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Que vous souhaitiez une démo, poser une question technique ou discuter d'un projet de déploiement, notre équipe est disponible.
                  </p>
                </div>

                {[
                  { icon: Mail, label: 'Email', value: 'contact@universitysaas.fr', color: 'bg-blue-50 text-blue-600' },
                  { icon: Phone, label: 'Téléphone', value: '+33 1 42 00 00 00', color: 'bg-emerald-50 text-emerald-600' },
                  { icon: MapPin, label: 'Adresse', value: '12 rue de la Paix, 75001 Paris', color: 'bg-violet-50 text-violet-600' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-slate-800">{value}</p>
                    </div>
                  </div>
                ))}

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
                  <p className="font-black text-lg mb-1">Réponse garantie</p>
                  <p className="text-blue-200 text-sm">en moins de 24h ouvrées</p>
                  <div className="mt-4 flex -space-x-2">
                    {['MF', 'KB', 'IM'].map((initials, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-xs font-bold">
                        {initials}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-xs font-bold">+5</div>
                  </div>
                </div>
              </div>

              {/* Form column */}
              <div className="lg:col-span-3">
                {sent ? (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center h-full flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Message envoyé !</h3>
                    <p className="text-slate-500 text-sm max-w-xs">
                      Merci pour votre message. Notre équipe vous répondra dans les 24 heures ouvrées.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: '', email: '', institution: '', subject: '', message: '' }); }}
                      className="mt-8 text-sm font-bold text-blue-600 hover:underline"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {field('name', 'Nom complet', 'text', 'Jean Dupont')}
                      {field('email', 'Email professionnel', 'email', 'jean@universite.fr')}
                    </div>
                    {field('institution', "Établissement (optionnel)", 'text', "Université de...")}
                    {field('subject', 'Sujet', 'text', 'Demande de démonstration')}

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder="Décrivez votre projet ou votre question..."
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                          errors.message ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500/30 focus:border-blue-400'
                        }`}
                      />
                      {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow shadow-blue-600/20 active:scale-[0.98]"
                    >
                      {sending ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Envoi en cours...
                        </span>
                      ) : (
                        <>Envoyer le message <Send className="w-4 h-4" /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;
