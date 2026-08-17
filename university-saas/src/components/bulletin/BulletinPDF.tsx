import React, { useState } from 'react';
import { FileText, Download, Printer, GraduationCap, Award } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUniversityStore } from '../../store/universityStore';
import { computeGPA } from '../../lib/utils/helpers';

interface BulletinProps {
  studentId?: string;
}

export const BulletinPDF: React.FC<BulletinProps> = ({ studentId }) => {
  const { user } = useAuthStore();
  const { students, grades, courses } = useUniversityStore();
  const [semester, setSemester] = useState('S1');
  const [generating, setGenerating] = useState(false);

  const targetId = studentId ?? user?.id;
  const student = students.find((s) => s.id === targetId);
  const studentGrades = grades.filter((g) => g.studentId === targetId && g.status === 'published' && g.semester === semester);
  const gpa = computeGPA(studentGrades.map((g) => ({ gpaPoints: g.gpaPoints, weight: g.weight })));
  const avg = studentGrades.length > 0
    ? (studentGrades.reduce((s, g) => s + (g.score / g.maxScore) * 20, 0) / studentGrades.length).toFixed(2)
    : '—';

  const DEMO_GRADES = [
    { course: 'Algorithmique avancée', code: 'INF301', ects: 6, note: 16.5, max: 20, lettre: 'A', coeff: 2 },
    { course: 'Mathématiques discrètes', code: 'MAT201', ects: 4, note: 14, max: 20, lettre: 'B+', coeff: 1 },
    { course: 'Réseaux et protocoles', code: 'INF302', ects: 5, note: 17, max: 20, lettre: 'A', coeff: 2 },
    { course: 'Bases de données', code: 'INF303', ects: 5, note: 13, max: 20, lettre: 'B', coeff: 1 },
    { course: 'Génie logiciel', code: 'INF304', ects: 4, note: 18.5, max: 20, lettre: 'A+', coeff: 1 },
  ];

  const demoAvg = (DEMO_GRADES.reduce((s, g) => s + g.note * g.coeff, 0) / DEMO_GRADES.reduce((s, g) => s + g.coeff, 0)).toFixed(2);
  const totalECTS = DEMO_GRADES.reduce((s, g) => s + g.ects, 0);

  const handlePrint = () => {
    setGenerating(true);
    setTimeout(() => {
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      const name = student ? `${student.id}` : `${user?.profile.firstName} ${user?.profile.lastName}`;
      const displayName = student ? `${user?.profile.firstName ?? ''} ${user?.profile.lastName ?? ''}` : `${user?.profile.firstName} ${user?.profile.lastName}`;

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <title>Bulletin de notes — ${displayName}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; color: #1e293b; padding: 40px; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #1d4ed8; }
            .logo { font-size: 20px; font-weight: 900; color: #1d4ed8; }
            .subtitle { font-size: 11px; color: #64748b; margin-top: 4px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
            .info-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; }
            .info-label { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
            .info-value { font-size: 13px; font-weight: 700; color: #1e293b; }
            h2 { font-size: 14px; font-weight: 900; color: #1e293b; margin-bottom: 12px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            thead tr { background: #1d4ed8; color: white; }
            th { padding: 10px 12px; text-align: left; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
            td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 11px; }
            tr:nth-child(even) td { background: #f8fafc; }
            .note-cell { font-weight: 700; }
            .mention { display: inline-block; padding: 2px 8px; border-radius: 99px; font-size: 10px; font-weight: 700; }
            .mention-a { background: #dcfce7; color: #16a34a; }
            .mention-b { background: #dbeafe; color: #1d4ed8; }
            .mention-c { background: #fef9c3; color: #ca8a04; }
            .mention-f { background: #fee2e2; color: #dc2626; }
            .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
            .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; text-align: center; }
            .summary-value { font-size: 24px; font-weight: 900; color: #1d4ed8; }
            .summary-label { font-size: 10px; color: #64748b; margin-top: 4px; }
            .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; color: #94a3b8; font-size: 10px; }
            .signature { text-align: right; }
            .sig-line { border-top: 1px solid #cbd5e1; width: 160px; margin: 40px 0 8px auto; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">Awilo</div>
              <div class="subtitle">Système de Gestion Universitaire</div>
            </div>
            <div style="text-align:right">
              <div style="font-weight:900;font-size:16px">BULLETIN DE NOTES</div>
              <div style="color:#64748b;margin-top:4px">Semestre ${semester} — 2024/2025</div>
              <div style="color:#94a3b8;font-size:10px;margin-top:2px">Généré le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>
          </div>

          <div class="info-grid">
            <div class="info-box">
              <div class="info-label">Étudiant</div>
              <div class="info-value">${displayName}</div>
              <div style="color:#64748b;font-size:11px;margin-top:2px">Matricule: ETU-${Math.floor(Math.random() * 900 + 100)}</div>
            </div>
            <div class="info-box">
              <div class="info-label">Programme</div>
              <div class="info-value">Licence 3 — Informatique</div>
              <div style="color:#64748b;font-size:11px;margin-top:2px">Département Sciences & Technologies</div>
            </div>
          </div>

          <h2>Résultats du semestre ${semester}</h2>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Matière</th>
                <th>ECTS</th>
                <th>Coeff.</th>
                <th>Note /20</th>
                <th>Mention</th>
              </tr>
            </thead>
            <tbody>
              ${DEMO_GRADES.map((g) => `
                <tr>
                  <td style="font-family:monospace;color:#1d4ed8">${g.code}</td>
                  <td>${g.course}</td>
                  <td style="text-align:center">${g.ects}</td>
                  <td style="text-align:center">${g.coeff}</td>
                  <td class="note-cell" style="text-align:center;font-size:13px;color:${g.note >= 16 ? '#16a34a' : g.note >= 10 ? '#1e293b' : '#dc2626'}">${g.note}</td>
                  <td>
                    <span class="mention ${g.lettre.startsWith('A') ? 'mention-a' : g.lettre.startsWith('B') ? 'mention-b' : g.lettre.startsWith('C') ? 'mention-c' : 'mention-f'}">
                      ${g.lettre}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="summary">
            <div class="summary-card">
              <div class="summary-value">${demoAvg}/20</div>
              <div class="summary-label">Moyenne générale</div>
            </div>
            <div class="summary-card">
              <div class="summary-value">${totalECTS}</div>
              <div class="summary-label">ECTS obtenus</div>
            </div>
            <div class="summary-card">
              <div class="summary-value">3.6</div>
              <div class="summary-label">GPA</div>
            </div>
          </div>

          <div class="signature">
            <div class="sig-line"></div>
            <div style="font-weight:700;font-size:11px">Direction des Études</div>
            <div style="color:#64748b;font-size:10px">Cachet et signature</div>
          </div>

          <div class="footer">
            <span>Document généré automatiquement par Awilo · Non modifiable</span>
            <span>awilo.fr</span>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => { printWindow.print(); setGenerating(false); }, 500);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bulletin de notes</h1>
          <p className="text-slate-500 text-sm">Consultez et téléchargez vos relevés de notes</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            {['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].map((s) => (
              <option key={s} value={s}>Semestre {s}</option>
            ))}
          </select>
          <button
            onClick={handlePrint}
            disabled={generating}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors shadow shadow-blue-600/20"
          >
            {generating ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Printer className="w-4 h-4" />
            )}
            {generating ? 'Génération...' : 'Imprimer / PDF'}
          </button>
        </div>
      </div>

      {/* Preview card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <GraduationCap className="w-5 h-5 text-white" />
              <span className="font-black text-white text-lg">Awilo</span>
            </div>
            <p className="text-blue-200 text-sm">Bulletin de notes — Semestre {semester} — 2024/2025</p>
          </div>
          <div className="text-right">
            <p className="text-white text-xs font-medium opacity-70">Généré le</p>
            <p className="text-white font-bold text-sm">{new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Student info */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Étudiant', value: `${user?.profile.firstName} ${user?.profile.lastName}` },
              { label: 'Programme', value: 'Licence 3 — Informatique' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{label}</p>
                <p className="text-sm font-bold text-slate-800">{value}</p>
              </div>
            ))}
          </div>

          {/* Grades table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Matière', 'Code', 'ECTS', 'Note /20', 'Mention'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {DEMO_GRADES.map((g, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-800">{g.course}</td>
                    <td className="px-4 py-3 font-mono text-blue-600 text-xs">{g.code}</td>
                    <td className="px-4 py-3 text-slate-500">{g.ects}</td>
                    <td className="px-4 py-3">
                      <span className={`font-black text-base ${g.note >= 16 ? 'text-emerald-600' : g.note >= 10 ? 'text-slate-800' : 'text-red-600'}`}>
                        {g.note}
                      </span>
                      <span className="text-slate-400 text-xs">/20</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        g.lettre.startsWith('A') ? 'bg-emerald-50 text-emerald-700' :
                        g.lettre.startsWith('B') ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {g.lettre}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Moyenne générale', value: `${demoAvg}/20`, icon: Award, color: 'from-blue-600 to-indigo-700' },
              { label: 'ECTS validés', value: totalECTS.toString(), icon: GraduationCap, color: 'from-emerald-500 to-teal-600' },
              { label: 'GPA', value: '3.6', icon: FileText, color: 'from-violet-500 to-purple-700' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-2 shadow-sm`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-xl font-black text-slate-900">{value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
