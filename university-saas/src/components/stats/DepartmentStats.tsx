import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, GraduationCap, Award, BookOpen } from 'lucide-react';
import { useUniversityStore } from '../../store/universityStore';

const DEPARTMENTS = [
  {
    name: 'Informatique',
    code: 'INFO',
    color: 'from-blue-500 to-indigo-600',
    light: 'bg-blue-50 text-blue-600',
    students: 312,
    avgGpa: 3.4,
    successRate: 87,
    courses: 24,
    teachers: 8,
    trend: '+5%',
  },
  {
    name: 'Mathématiques',
    code: 'MATH',
    color: 'from-emerald-500 to-teal-600',
    light: 'bg-emerald-50 text-emerald-600',
    students: 198,
    avgGpa: 3.1,
    successRate: 79,
    courses: 18,
    teachers: 6,
    trend: '+2%',
  },
  {
    name: 'Droit',
    code: 'DROIT',
    color: 'from-violet-500 to-purple-700',
    light: 'bg-violet-50 text-violet-600',
    students: 445,
    avgGpa: 3.0,
    successRate: 82,
    courses: 30,
    teachers: 12,
    trend: '+8%',
  },
  {
    name: 'Sciences Économiques',
    code: 'ECO',
    color: 'from-orange-500 to-amber-600',
    light: 'bg-orange-50 text-orange-600',
    students: 293,
    avgGpa: 3.2,
    successRate: 85,
    courses: 22,
    teachers: 9,
    trend: '+3%',
  },
];

const MONTHLY = [
  { month: 'Jan', pct: 62 },
  { month: 'Fév', pct: 71 },
  { month: 'Mar', pct: 65 },
  { month: 'Avr', pct: 80 },
  { month: 'Mai', pct: 74 },
  { month: 'Jun', pct: 88 },
  { month: 'Jul', pct: 91 },
  { month: 'Aoû', pct: 78 },
  { month: 'Sep', pct: 85 },
  { month: 'Oct', pct: 82 },
  { month: 'Nov', pct: 90 },
  { month: 'Déc', pct: 95 },
];

export const DepartmentStats: React.FC = () => {
  const { students, courses, grades } = useUniversityStore();
  const [activeDept, setActiveDept] = useState(DEPARTMENTS[0].code);

  const dept = DEPARTMENTS.find((d) => d.code === activeDept) ?? DEPARTMENTS[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Statistiques par département</h1>
        <p className="text-slate-500 text-sm">Analyse détaillée des performances académiques</p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total étudiants', value: DEPARTMENTS.reduce((s, d) => s + d.students, 0).toLocaleString('fr-FR'), icon: Users, color: 'from-blue-600 to-indigo-700' },
          { label: 'Taux de réussite moy.', value: `${Math.round(DEPARTMENTS.reduce((s, d) => s + d.successRate, 0) / DEPARTMENTS.length)}%`, icon: TrendingUp, color: 'from-emerald-500 to-teal-600' },
          { label: 'GPA moyen', value: (DEPARTMENTS.reduce((s, d) => s + d.avgGpa, 0) / DEPARTMENTS.length).toFixed(1), icon: Award, color: 'from-violet-500 to-purple-700' },
          { label: 'Cours dispensés', value: DEPARTMENTS.reduce((s, d) => s + d.courses, 0).toString(), icon: BookOpen, color: 'from-orange-500 to-amber-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-sm`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <p className="text-2xl font-black text-slate-900">{value}</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Department selector */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-700 uppercase tracking-wide">Départements</h2>
          {DEPARTMENTS.map((d) => (
            <button
              key={d.code}
              onClick={() => setActiveDept(d.code)}
              className={`w-full text-left bg-white rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                activeDept === d.code ? 'border-blue-200 shadow-sm ring-1 ring-blue-100' : 'border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center text-white text-xs font-black shadow-sm`}>
                  {d.code.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{d.name}</p>
                  <p className="text-xs text-slate-400">{d.students} étudiants · {d.courses} cours</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{d.trend}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Department detail */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className={`bg-gradient-to-r ${dept.color} px-6 py-5`}>
              <h3 className="text-xl font-black text-white">{dept.name}</h3>
              <p className="text-white/70 text-sm mt-1">{dept.students} étudiants · {dept.teachers} enseignants</p>
            </div>

            <div className="p-6 grid grid-cols-3 gap-4">
              {[
                { label: 'GPA moyen', value: dept.avgGpa.toFixed(1) },
                { label: 'Taux de réussite', value: `${dept.successRate}%` },
                { label: 'Cours actifs', value: dept.courses },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                  <p className="text-2xl font-black text-slate-900">{value}</p>
                  <p className="text-xs text-slate-400 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Success rate bar */}
            <div className="px-6 pb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Taux de réussite</span>
                <span className="text-xs font-black text-slate-900">{dept.successRate}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${dept.color} rounded-full transition-all duration-700`}
                  style={{ width: `${dept.successRate}%` }}
                />
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-black text-slate-900">Inscriptions mensuelles 2025</h3>
                <p className="text-xs text-slate-400 mt-0.5">Évolution du nombre de nouveaux inscrits</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">↑ 12% vs 2024</span>
            </div>
            <div className="flex items-end gap-1.5 h-32">
              {MONTHLY.map(({ month, pct }, i) => (
                <div key={month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col justify-end" style={{ height: '100px' }}>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        i === MONTHLY.length - 1
                          ? `bg-gradient-to-t ${dept.color} shadow-sm`
                          : 'bg-blue-100 hover:bg-blue-200 cursor-pointer'
                      }`}
                      style={{ height: `${pct}%` }}
                      title={`${month}: ${pct}%`}
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
