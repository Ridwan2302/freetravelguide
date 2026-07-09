import React, { useState } from 'react';
import { FileText, Plus, Clock, MapPin, AlertTriangle, CheckCircle, CalendarDays, Printer } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUniversityStore } from '../../store/universityStore';
import { DEMO_EXAMS, type Exam } from '../../lib/demo/demoData';

const TYPE_LABELS: Record<Exam['type'], string> = {
  partiel: 'Partiel',
  final: 'Examen final',
  rattrapage: 'Rattrapage',
  controle: 'Contrôle continu',
};

const TYPE_STYLES: Record<Exam['type'], string> = {
  partiel: 'bg-blue-50 text-blue-700 border-blue-200',
  final: 'bg-red-50 text-red-700 border-red-200',
  rattrapage: 'bg-amber-50 text-amber-700 border-amber-200',
  controle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const STATUS_LABELS: Record<Exam['status'], string> = {
  a_venir: 'À venir',
  en_cours: 'En cours',
  termine: 'Terminé',
  note_publiee: 'Note publiée',
};

const STATUS_STYLES: Record<Exam['status'], string> = {
  a_venir: 'bg-blue-100 text-blue-700',
  en_cours: 'bg-amber-100 text-amber-700',
  termine: 'bg-slate-100 text-slate-600',
  note_publiee: 'bg-emerald-100 text-emerald-700',
};

function formatExamDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

function daysUntil(iso: string) {
  const diff = Math.ceil((new Date(iso + 'T00:00:00').getTime() - Date.now()) / 86400000);
  return diff;
}

export const ExamsView: React.FC = () => {
  const { user } = useAuthStore();
  const { courses } = useUniversityStore();
  const [exams, setExams] = useState<Exam[]>(DEMO_EXAMS);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'tous' | 'a_venir' | 'termine'>('a_venir');
  const [form, setForm] = useState({
    courseId: '', type: 'partiel' as Exam['type'], date: '', startTime: '08:00', endTime: '10:00', room: '', coefficient: '1', instructions: '',
  });

  const canManage = user?.role === 'admin_universite' || user?.role === 'teacher';

  const sorted = [...exams].sort((a, b) => a.date.localeCompare(b.date));
  const filtered = sorted.filter((e) => {
    if (filter === 'a_venir') return e.status === 'a_venir' || e.status === 'en_cours';
    if (filter === 'termine') return e.status === 'termine' || e.status === 'note_publiee';
    return true;
  });

  const upcoming = sorted.filter((e) => e.status === 'a_venir');
  const nextExam = upcoming[0];

  const addExam = (e: React.FormEvent) => {
    e.preventDefault();
    const course = courses.find((c) => c.id === form.courseId);
    if (!course || !form.date || !form.room) return;
    setExams((prev) => [
      ...prev,
      {
        id: `exam-${Date.now()}`,
        courseId: course.id,
        courseName: course.name,
        courseCode: course.code,
        type: form.type,
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
        room: form.room,
        coefficient: Number(form.coefficient) || 1,
        instructions: form.instructions || undefined,
        status: 'a_venir',
      },
    ]);
    setShowModal(false);
    setForm({ courseId: '', type: 'partiel', date: '', startTime: '08:00', endTime: '10:00', room: '', coefficient: '1', instructions: '' });
  };

  const printConvocation = (exam: Exam) => {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`
      <!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Convocation — ${exam.courseName}</title>
      <style>
        body{font-family:Helvetica,Arial,sans-serif;padding:48px;color:#1e293b;font-size:13px}
        .head{border-bottom:2px solid #1d4ed8;padding-bottom:16px;margin-bottom:28px;display:flex;justify-content:space-between}
        .logo{font-size:18px;font-weight:900;color:#1d4ed8}
        h1{font-size:20px;margin:0 0 4px}
        .box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:12px 0}
        .row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9}
        .row:last-child{border:none}
        .label{color:#94a3b8;font-size:11px;text-transform:uppercase;font-weight:700}
        .val{font-weight:700}
        .warn{background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px;margin-top:16px;font-size:12px;color:#92400e}
        .foot{margin-top:40px;color:#94a3b8;font-size:10px;border-top:1px solid #e2e8f0;padding-top:12px}
      </style></head><body>
      <div class="head"><div><div class="logo">University SaaS</div><div style="color:#64748b;font-size:11px">Service des examens</div></div>
      <div style="text-align:right"><h1>CONVOCATION</h1><div style="color:#64748b">${TYPE_LABELS[exam.type]}</div></div></div>
      <p>Candidat : <strong>${user?.profile.firstName ?? ''} ${user?.profile.lastName ?? ''}</strong></p>
      <div class="box">
        <div class="row"><span class="label">Épreuve</span><span class="val">${exam.courseName} (${exam.courseCode})</span></div>
        <div class="row"><span class="label">Date</span><span class="val">${formatExamDate(exam.date)}</span></div>
        <div class="row"><span class="label">Horaire</span><span class="val">${exam.startTime} — ${exam.endTime}</span></div>
        <div class="row"><span class="label">Salle</span><span class="val">${exam.room}</span></div>
        <div class="row"><span class="label">Coefficient</span><span class="val">${exam.coefficient}</span></div>
      </div>
      ${exam.instructions ? `<div class="warn"><strong>Consignes :</strong> ${exam.instructions}</div>` : ''}
      <div class="warn"><strong>Rappel :</strong> Présentez-vous 15 minutes avant le début de l'épreuve, muni de votre carte étudiante. Tout retard supérieur à 30 minutes entraîne l'exclusion de la salle.</div>
      <div class="foot">Document généré par University SaaS — Convocation officielle aux examens</div>
      </body></html>`);
    w.document.close();
    setTimeout(() => w.print(), 400);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Examens</h1>
          <p className="text-slate-500 text-sm">
            {canManage ? 'Planification et gestion des épreuves' : 'Vos convocations et résultats d’examens'}
          </p>
        </div>
        {canManage && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors shadow shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" /> Planifier un examen
          </button>
        )}
      </div>

      {/* Next exam banner */}
      {nextExam && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-600/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-1.5">Prochain examen</p>
              <p className="text-xl font-black">{nextExam.courseName}</p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-blue-100">
                <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {formatExamDate(nextExam.date)}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {nextExam.startTime} — {nextExam.endTime}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {nextExam.room}</span>
              </div>
            </div>
            <div className="text-center bg-white/15 rounded-2xl px-6 py-4 flex-shrink-0">
              <p className="text-3xl font-black">{Math.max(0, daysUntil(nextExam.date))}</p>
              <p className="text-xs text-blue-200 font-semibold">jour(s) restant(s)</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2">
        {([
          { key: 'a_venir', label: `À venir (${upcoming.length})` },
          { key: 'termine', label: 'Terminés' },
          { key: 'tous', label: 'Tous' },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              filter === key ? 'bg-blue-600 text-white shadow shadow-blue-600/20' : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Exam cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="md:col-span-2 bg-white rounded-3xl border border-slate-100 py-12 text-center text-slate-400">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Aucun examen dans cette catégorie</p>
          </div>
        ) : filtered.map((exam) => {
          const days = daysUntil(exam.date);
          const isPast = exam.status === 'termine' || exam.status === 'note_publiee';
          return (
            <div key={exam.id} className={`bg-white rounded-3xl border border-slate-100 shadow-sm p-6 transition-all hover:-translate-y-0.5 hover:shadow-md ${isPast ? 'opacity-75' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${TYPE_STYLES[exam.type]}`}>
                    {TYPE_LABELS[exam.type]}
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-2.5">{exam.courseName}</h3>
                  <p className="text-xs font-mono text-blue-600">{exam.courseCode} · Coefficient {exam.coefficient}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ${STATUS_STYLES[exam.status]}`}>
                  {STATUS_LABELS[exam.status]}
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-slate-400" /> {formatExamDate(exam.date)}</p>
                <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> {exam.startTime} — {exam.endTime}</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {exam.room}</p>
              </div>

              {exam.instructions && (
                <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800">{exam.instructions}</p>
                </div>
              )}

              <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                {!isPast ? (
                  <p className={`text-xs font-bold ${days <= 3 ? 'text-red-500' : 'text-slate-400'}`}>
                    {days <= 0 ? "Aujourd'hui !" : `Dans ${days} jour(s)`}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Épreuve passée
                  </p>
                )}
                {!isPast && (
                  <button
                    onClick={() => printConvocation(exam)}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    <Printer className="w-3.5 h-3.5" /> Convocation PDF
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Plan exam modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <form onSubmit={addExam} className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 w-full max-w-lg scale-in space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-slate-900">Planifier un examen</h3>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Matière</label>
              <select
                value={form.courseId}
                onChange={(e) => setForm((f) => ({ ...f, courseId: e.target.value }))}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="">Sélectionner une matière...</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.code} — {c.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Type d'épreuve</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as Exam['type'] }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Coefficient</label>
                <input type="number" min="1" max="5" value={form.coefficient} onChange={(e) => setForm((f) => ({ ...f, coefficient: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date</label>
                <input type="date" required value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Début</label>
                <input type="time" value={form.startTime} onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Fin</label>
                <input type="time" value={form.endTime} onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Salle</label>
              <input type="text" required placeholder="Amphi A, Salle B204..." value={form.room} onChange={(e) => setForm((f) => ({ ...f, room: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Consignes (optionnel)</label>
              <textarea rows={2} placeholder="Documents autorisés, matériel requis..." value={form.instructions} onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none" />
            </div>

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setShowModal(false)}
                className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 py-3 rounded-xl font-bold text-sm transition-colors">
                Annuler
              </button>
              <button type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition-colors shadow shadow-blue-600/20">
                Planifier l'examen
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
