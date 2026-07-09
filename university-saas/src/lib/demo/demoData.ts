import type { Course } from '../../types';

// Matières de démonstration avec emploi du temps complet.
// Affichées tant que l'université n'a pas créé ses propres cours.
export const DEMO_COURSES: Course[] = [
  {
    id: 'demo-c1',
    universityId: 'demo',
    code: 'INF301',
    name: 'Algorithmique avancée',
    description: 'Structures de données, complexité, programmation dynamique et algorithmes de graphes.',
    credits: 6,
    department: 'Informatique',
    program: 'Licence Informatique',
    year: 3,
    semester: 'S1',
    teacherId: 'demo-t1',
    schedule: [
      { day: 'Lundi', startTime: '08:00', endTime: '10:00', room: 'Amphi A' },
      { day: 'Jeudi', startTime: '10:15', endTime: '12:15', room: 'Salle B204' },
    ],
    enrolledStudents: [],
    maxStudents: 120,
    status: 'active',
    materials: [],
    assignments: [],
    prerequisites: [],
    learningObjectives: [],
  },
  {
    id: 'demo-c2',
    universityId: 'demo',
    code: 'MAT201',
    name: 'Mathématiques discrètes',
    description: 'Logique, ensembles, combinatoire et théorie des graphes appliquées.',
    credits: 4,
    department: 'Mathématiques',
    program: 'Licence Informatique',
    year: 2,
    semester: 'S1',
    teacherId: 'demo-t2',
    schedule: [
      { day: 'Lundi', startTime: '10:15', endTime: '12:15', room: 'Salle C105' },
      { day: 'Mercredi', startTime: '08:00', endTime: '10:00', room: 'Salle C105' },
    ],
    enrolledStudents: [],
    maxStudents: 80,
    status: 'active',
    materials: [],
    assignments: [],
    prerequisites: [],
    learningObjectives: [],
  },
  {
    id: 'demo-c3',
    universityId: 'demo',
    code: 'INF302',
    name: 'Réseaux et protocoles',
    description: 'Modèle OSI, TCP/IP, routage et sécurité des réseaux.',
    credits: 5,
    department: 'Informatique',
    program: 'Licence Informatique',
    year: 3,
    semester: 'S1',
    teacherId: 'demo-t1',
    schedule: [
      { day: 'Mardi', startTime: '08:00', endTime: '10:00', room: 'Salle réseaux R2' },
      { day: 'Vendredi', startTime: '10:15', endTime: '12:15', room: 'Salle réseaux R2' },
    ],
    enrolledStudents: [],
    maxStudents: 60,
    status: 'active',
    materials: [],
    assignments: [],
    prerequisites: [],
    learningObjectives: [],
  },
  {
    id: 'demo-c4',
    universityId: 'demo',
    code: 'INF303',
    name: 'Bases de données',
    description: 'Modèle relationnel, SQL, normalisation et transactions.',
    credits: 5,
    department: 'Informatique',
    program: 'Licence Informatique',
    year: 3,
    semester: 'S1',
    teacherId: 'demo-t3',
    schedule: [
      { day: 'Mardi', startTime: '14:00', endTime: '16:00', room: 'Salle info I3' },
      { day: 'Jeudi', startTime: '14:00', endTime: '16:00', room: 'Salle info I3' },
    ],
    enrolledStudents: [],
    maxStudents: 60,
    status: 'active',
    materials: [],
    assignments: [],
    prerequisites: [],
    learningObjectives: [],
  },
  {
    id: 'demo-c5',
    universityId: 'demo',
    code: 'ANG101',
    name: 'Anglais scientifique',
    description: 'Communication technique et rédaction académique en anglais.',
    credits: 2,
    department: 'Langues',
    program: 'Tronc commun',
    year: 3,
    semester: 'S1',
    teacherId: 'demo-t4',
    schedule: [
      { day: 'Mercredi', startTime: '14:00', endTime: '16:00', room: 'Salle L12' },
    ],
    enrolledStudents: [],
    maxStudents: 40,
    status: 'active',
    materials: [],
    assignments: [],
    prerequisites: [],
    learningObjectives: [],
  },
  {
    id: 'demo-c6',
    universityId: 'demo',
    code: 'INF304',
    name: 'Génie logiciel',
    description: 'Méthodes agiles, UML, tests et intégration continue.',
    credits: 4,
    department: 'Informatique',
    program: 'Licence Informatique',
    year: 3,
    semester: 'S1',
    teacherId: 'demo-t3',
    schedule: [
      { day: 'Vendredi', startTime: '08:00', endTime: '10:00', room: 'Amphi B' },
    ],
    enrolledStudents: [],
    maxStudents: 100,
    status: 'active',
    materials: [],
    assignments: [],
    prerequisites: [],
    learningObjectives: [],
  },
];

export interface Exam {
  id: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  type: 'partiel' | 'final' | 'rattrapage' | 'controle';
  date: string;       // ISO yyyy-mm-dd
  startTime: string;
  endTime: string;
  room: string;
  coefficient: number;
  instructions?: string;
  status: 'a_venir' | 'en_cours' | 'termine' | 'note_publiee';
}

export const DEMO_EXAMS: Exam[] = [
  { id: 'demo-e1', courseId: 'demo-c1', courseName: 'Algorithmique avancée', courseCode: 'INF301', type: 'partiel', date: '2026-07-16', startTime: '08:00', endTime: '10:00', room: 'Amphi A', coefficient: 2, instructions: 'Documents non autorisés. Calculatrice interdite.', status: 'a_venir' },
  { id: 'demo-e2', courseId: 'demo-c3', courseName: 'Réseaux et protocoles', courseCode: 'INF302', type: 'controle', date: '2026-07-18', startTime: '10:15', endTime: '11:45', room: 'Salle B204', coefficient: 1, instructions: 'Une feuille A4 recto-verso autorisée.', status: 'a_venir' },
  { id: 'demo-e3', courseId: 'demo-c4', courseName: 'Bases de données', courseCode: 'INF303', type: 'partiel', date: '2026-07-22', startTime: '14:00', endTime: '16:00', room: 'Salle info I3', coefficient: 2, instructions: 'Épreuve sur machine. Carte étudiante obligatoire.', status: 'a_venir' },
  { id: 'demo-e4', courseId: 'demo-c2', courseName: 'Mathématiques discrètes', courseCode: 'MAT201', type: 'final', date: '2026-07-28', startTime: '08:00', endTime: '11:00', room: 'Grande salle des examens', coefficient: 3, instructions: 'Documents et calculatrice interdits.', status: 'a_venir' },
  { id: 'demo-e5', courseId: 'demo-c5', courseName: 'Anglais scientifique', courseCode: 'ANG101', type: 'controle', date: '2026-06-25', startTime: '14:00', endTime: '15:30', room: 'Salle L12', coefficient: 1, status: 'note_publiee' },
  { id: 'demo-e6', courseId: 'demo-c6', courseName: 'Génie logiciel', courseCode: 'INF304', type: 'partiel', date: '2026-06-30', startTime: '08:00', endTime: '10:00', room: 'Amphi B', coefficient: 2, status: 'termine' },
];
