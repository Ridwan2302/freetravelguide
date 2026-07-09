import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase/config';
import { getUserData } from './lib/firebase/auth';
import { useAuthStore } from './store/authStore';
import { useUniversity } from './hooks/useUniversity';

// Layouts
import { DashboardLayout } from './components/common/Layout';
import { ProtectedRoute, RoleRedirect } from './components/common/ProtectedRoute';
import { NotificationContainer } from './components/ui/Alert';
import { Loader } from './components/common/Loader';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import SuperAdminDashboard from './pages/dashboards/SuperAdminDashboard';
import UniversityAdminDashboard from './pages/dashboards/UniversityAdminDashboard';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import ParentDashboard from './pages/dashboards/ParentDashboard';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10 max-w-md text-center">
            <p className="text-4xl mb-4">😕</p>
            <h1 className="text-xl font-black text-slate-900 mb-2">Une erreur est survenue</h1>
            <p className="text-sm text-slate-500 mb-6">La page a rencontré un problème inattendu. Rechargez ou revenez à l'accueil.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm">Recharger</button>
              <a href="/" className="border border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50">Accueil</a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setUser, setFirebaseUser, setLoading } = useAuthStore();

  useEffect(() => {
    let firstEvent = true;

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      const { user: persistedUser } = useAuthStore.getState();

      // N'afficher le loader bloquant que s'il n'y a pas déjà une session
      // restaurée depuis le stockage local — sinon on laisse la page affichée.
      if (!persistedUser) setLoading(true);

      if (fbUser) {
        setFirebaseUser({ uid: fbUser.uid, email: fbUser.email });
        try {
          const userData = await getUserData(fbUser.uid);
          // Ne jamais écraser une session valide par null si la lecture échoue
          if (userData) setUser(userData);
          else if (!persistedUser) setUser(null);
        } catch {
          // Erreur réseau/permissions : on conserve la session persistée
        }
      } else {
        setFirebaseUser(null);
        // Firebase peut émettre null au tout premier événement avant de
        // restaurer la session : ne pas déconnecter dans ce cas si une
        // session persistée existe.
        if (!firstEvent || !persistedUser) setUser(null);
      }

      firstEvent = false;
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setUser, setFirebaseUser, setLoading]);

  return <>{children}</>;
};

const UniversityDataLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useUniversity();
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { loading } = useAuthStore();

  if (loading) return <Loader fullScreen message="Initialisation de l'application..." />;

  return (
    <>
      <NotificationContainer />
      <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auto-redirect after login */}
            <Route path="/dashboard" element={<RoleRedirect />} />

            {/* Super Admin */}
            <Route
              path="/dashboard/super-admin/*"
              element={
                <ProtectedRoute allowedRoles={['super_admin_plateforme']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="*" element={<SuperAdminDashboard />} />
            </Route>

            {/* University Admin */}
            <Route
              path="/dashboard/admin/*"
              element={
                <ProtectedRoute allowedRoles={['admin_universite']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="*" element={<UniversityAdminDashboard />} />
            </Route>

            {/* Teacher */}
            <Route
              path="/dashboard/enseignant/*"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="*" element={<TeacherDashboard />} />
            </Route>

            {/* Student */}
            <Route
              path="/dashboard/etudiant/*"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="*" element={<StudentDashboard />} />
            </Route>

            {/* Parent */}
            <Route
              path="/dashboard/parent/*"
              element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="*" element={<ParentDashboard />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppInitializer>
          <UniversityDataLoader>
            <AppRoutes />
          </UniversityDataLoader>
        </AppInitializer>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
