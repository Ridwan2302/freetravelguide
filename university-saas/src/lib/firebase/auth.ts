import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  getAuth,
  User as FirebaseUser,
} from 'firebase/auth';
import { initializeApp, getApps, deleteApp } from 'firebase/app';
import { ref, set, get, update } from 'firebase/database';
import { auth, database } from './config';
import { User, UserRole } from '../../types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const generatePassword = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let pwd = '';
  for (let i = 0; i < 8; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
  return `${pwd}!`;
};

/**
 * Crée un compte utilisateur (étudiant, enseignant, parent) SANS déconnecter
 * l'administrateur : utilise une instance Firebase secondaire.
 * Retourne l'uid et le mot de passe généré à communiquer à l'utilisateur.
 */
export const createManagedUser = async (
  email: string,
  role: UserRole,
  universityId: string,
  profile: { firstName: string; lastName: string; phone?: string },
  password?: string
): Promise<{ uid: string; password: string }> => {
  const pwd = password && password.length >= 6 ? password : generatePassword();

  const existing = getApps().find((a) => a.name === 'user-creation');
  const secondaryApp = existing ?? initializeApp(firebaseConfig, 'user-creation');
  const secondaryAuth = getAuth(secondaryApp);

  try {
    const credential = await createUserWithEmailAndPassword(secondaryAuth, email, pwd);
    const { user } = credential;

    await updateProfile(user, { displayName: `${profile.firstName} ${profile.lastName}` });

    const userData: User = {
      id: user.uid,
      email,
      role,
      universityId,
      profile,
      createdAt: Date.now(),
      isActive: true,
    };
    await set(ref(database, `users/${user.uid}`), userData);

    await signOut(secondaryAuth);
    return { uid: user.uid, password: pwd };
  } finally {
    await deleteApp(secondaryApp).catch(() => {});
  }
};

export const registerUser = async (
  email: string,
  password: string,
  role: UserRole,
  universityId: string,
  profile: { firstName: string; lastName: string; phone?: string }
): Promise<FirebaseUser> => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = credential;

  await updateProfile(user, {
    displayName: `${profile.firstName} ${profile.lastName}`,
  });

  const userData: User = {
    id: user.uid,
    email,
    role,
    universityId,
    profile,
    createdAt: Date.now(),
    isActive: true,
  };

  await set(ref(database, `users/${user.uid}`), userData);

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  await update(ref(database, `users/${credential.user.uid}`), {
    lastLogin: Date.now(),
  });
  return credential.user;
};

export const logoutUser = () => signOut(auth);

export const resetPassword = (email: string) =>
  sendPasswordResetEmail(auth, email);

export const getUserData = async (uid: string): Promise<User | null> => {
  const snapshot = await get(ref(database, `users/${uid}`));
  return snapshot.exists() ? (snapshot.val() as User) : null;
};
