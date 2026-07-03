import React, { useState } from 'react';
import { AlertCircle, Check, Clock, Plus, Upload, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUniversityStore } from '../../store/universityStore';

interface Absence {
  id: string;
  studentName: string;
  studentId: string;
  course: string;
  date: string;
  duration: string;
  status: 'pending' | 'justified' | 'unjustified';
  justification?: string;
}

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  justified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  unjustified: 'bg-red-50 text-red-700 border-red-200',
};
const STATUS_LABELS = { pending: 'En attente', justified: 'Justifiée', unjustified: 'Non justifiée' };

const DEMO_ABSENCES: Absence[] = [
  { id: '1', studentName: 'Sophie Laurent', studentId: 'ETU-001', course: 'Algorithmique', date: '02/06/2025', duration: '2h', status: 'justified', justification: 'Certificat médical' },
  { id: '2', studentName: 'Martin Dupont', studentId: 'ETU-002', course: 'Mathématiques', date: '04/06/2025', duration: '2h', status: 'unjustified' },
  { id: '3', studentName: 'Ahmad Karim', studentId: 'ETU-003', course: 'Réseaux', date: '05/06/2025', duration: '4h', status: 'pending' },
  { id: '4', studentName: 'Sophie Laurent', studentId: 'ETU-001', course: 'Bases de données', date: '06/06/2025', duration: '2h', status: 'pending' },
];

export const AbsencesView: React.FC = () => {
  const { user } = useAuthStore();
  const { students, courses } = useUniversityStore();
  const [absences, setAbsences] = useState<Absence[]>(DEMO_ABSENCES);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'justified' | 'unjustified'>('all');
  const [justifyId, setJustifyId] = useState<string | null>(null);
  const [justText, setJustText] = useState('');

  const isAdmin = user?.role === 'admin_universite' || user?.role === 'teacher';

  const filtered = filterStatus === 'all' ? absences : absences.filter((a) => a.status === filterStatus);

  const justify = (id: string) => {
    setAbsences((prev) => prev.map((a) => a.id === id ? { ...a, status: 'justified', justification: justText } : a));
    setJustifyId(null);
    setJustText('');
  };

  const counts = {
    all: absences.length,
    pending: absences.filter((a) => a.status === 'pending').length,
    justified: absences.filter((a) => a.status === 'justified').length,
    unjustified: absences.filter((a) => a.status === 'unjustified').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion des Absences</h1>
          <p className="text-slate-500 text-sm">Suivi et justification des absences étudiantes</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors shadow shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" /> Signaler une absence
          </button>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {([
          { key: 'all', label: 'Total', icon: AlertCircle, color: 'from-slate-500 to-slate-700' },
          { key: 'pending', label: 'En attente', icon: Clock, color: 'from-amber-500 to-orange-600' },
          { key: 'justified', label: 'Justifiées', icon: Check, color: 'from-emerald-500 to-teal-600' },
          { key: 'unjustified', label: 'Non justifiées', icon: X, color: 'from-red-500 to-rose-600' },
        ] as const).map(({ key, label, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key)}
            className={`bg-white rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${
              filterStatus === key ? 'border-blue-200 shadow-sm' : 'border-slate-100'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-sm`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <p className="text-2xl font-black text-slate-900">{counts[key]}</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{label}</p>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Aucune absence dans cette catégorie</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Étudiant</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Cours</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Date</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Durée</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Statut</th>
                  {isAdmin && <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((absence) => (
                  <tr key={absence.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-semibold text-slate-800">{absence.studentName}</p>
                        <p className="text-xs text-slate-400 font-mono">{absence.studentId}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{absence.course}</td>
                    <td className="px-5 py-3.5 text-slate-600">{absence.date}</td>
                    <td className="px-5 py-3.5 text-slate-600">{absence.duration}</td>
                    <td className="px-5 py-3.5">
                      <div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${STATUS_STYLES[absence.status]}`}>
                          {STATUS_LABELS[absence.status]}
                        </span>
                        {absence.justification && (
                          <p className="text-xs text-slate-400 mt-1">{absence.justification}</p>
                        )}
                      </div>
                    </td>
                    {isAdmin && (
                      <td className="px-5 py-3.5">
                        {absence.status === 'pending' && (
                          <button
                            onClick={() => setJustifyId(absence.id)}
                            className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            Justifier
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Justify modal */}
      {justifyId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 w-full max-w-md scale-in">
            <h3 className="text-lg font-black text-slate-900 mb-4">Justifier l'absence</h3>
            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-5">
              <Upload className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm font-semibold text-slate-700">Pièce justificative</p>
                <p className="text-xs text-slate-400">Certificat médical, convocation... (PDF, image)</p>
              </div>
              <button className="ml-auto text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-bold transition-colors">
                Choisir
              </button>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Motif</label>
              <textarea
                rows={3}
                value={justText}
                onChange={(e) => setJustText(e.target.value)}
                placeholder="Certificat médical, convocation officielle..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setJustifyId(null)}
                className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 py-2.5 rounded-xl font-bold text-sm transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => justify(justifyId)}
                disabled={!justText.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white py-2.5 rounded-xl font-bold text-sm transition-colors shadow shadow-blue-600/20"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
