import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';
import { useUniversityStore } from '../../store/universityStore';
import { useAuthStore } from '../../store/authStore';

interface CalEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  room: string;
  type: 'cours' | 'examen' | 'devoir' | 'evenement';
  color: string;
}

const DEMO_EVENTS: CalEvent[] = [
  { id: '1', title: 'Algorithmique avancée', date: '', time: '08:00 - 10:00', room: 'Salle A201', type: 'cours', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: '2', title: 'Mathématiques discrètes', date: '', time: '10:30 - 12:30', room: 'Amphi B', type: 'cours', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { id: '3', title: 'Examen — Réseaux', date: '', time: '14:00 - 16:00', room: 'Grande salle', type: 'examen', color: 'bg-red-100 text-red-700 border-red-200' },
  { id: '4', title: 'Rendu Projet Web', date: '', time: '23:59', room: 'Moodle', type: 'devoir', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: '5', title: 'Bases de données', date: '', time: '08:00 - 10:00', room: 'Salle C105', type: 'cours', color: 'bg-violet-100 text-violet-700 border-violet-200' },
  { id: '6', title: 'Conférence Innovation IA', date: '', time: '14:00 - 17:00', room: 'Amphi A', type: 'evenement', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
];

const TYPE_LABELS = { cours: 'Cours', examen: 'Examen', devoir: 'Devoir', evenement: 'Événement' };
const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
}

export const CalendarView: React.FC = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const eventDays = [3, 7, 12, 15, 18, 22, 25, 28].filter((d) => d <= daysInMonth);

  const dayEvents = selectedDay ? DEMO_EVENTS.slice(0, selectedDay % 3 + 1) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Calendrier académique</h1>
        <p className="text-slate-500 text-sm">Emploi du temps et événements de l'établissement</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <button onClick={prevMonth} className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base font-black text-slate-900">{MONTHS[month]} {year}</h2>
            <button onClick={nextMonth} className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 px-4 pt-4">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wide pb-3">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 px-4 pb-4 gap-1">
            {Array.from({ length: totalCells }).map((_, idx) => {
              const dayNum = idx - firstDay + 1;
              const isValid = dayNum >= 1 && dayNum <= daysInMonth;
              const isToday = isValid && dayNum === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = isValid && dayNum === selectedDay;
              const hasEvent = isValid && eventDays.includes(dayNum);

              return (
                <button
                  key={idx}
                  onClick={() => isValid && setSelectedDay(dayNum)}
                  disabled={!isValid}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-semibold transition-all duration-150 relative
                    ${!isValid ? 'invisible' : ''}
                    ${isSelected ? 'bg-blue-600 text-white shadow shadow-blue-600/30' : ''}
                    ${isToday && !isSelected ? 'bg-blue-50 text-blue-600 font-black' : ''}
                    ${!isSelected && !isToday ? 'text-slate-700 hover:bg-slate-50' : ''}
                  `}
                >
                  {isValid ? dayNum : ''}
                  {hasEvent && (
                    <span className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-500'}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Events for selected day */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <p className="text-sm font-black text-slate-900">
                {selectedDay ? `${selectedDay} ${MONTHS[month]}` : 'Sélectionnez un jour'}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {dayEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 py-8">
                <Calendar className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-sm">Aucun événement ce jour</p>
              </div>
            ) : dayEvents.map((event) => (
              <div key={event.id} className={`rounded-2xl border p-4 ${event.color}`}>
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-bold leading-snug">{event.title}</p>
                  <span className="text-xs font-semibold opacity-70 ml-2 flex-shrink-0">{TYPE_LABELS[event.type]}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs opacity-80">
                    <Clock className="w-3 h-3" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs opacity-80">
                    <MapPin className="w-3 h-3" />
                    <span>{event.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {Object.entries({ 'bg-blue-100 text-blue-700': 'Cours', 'bg-red-100 text-red-700': 'Examen', 'bg-orange-100 text-orange-700': 'Devoir', 'bg-cyan-100 text-cyan-700': 'Événement' }).map(([cls, label]) => (
          <div key={label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${cls} ${cls.replace('bg-', 'border-').replace('100', '200')}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};
