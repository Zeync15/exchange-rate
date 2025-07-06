// stores/useAuthStore.ts
import { create } from "zustand";

type User = {
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  resetInactivityTimer: () => void;
};

let inactivityTimer: number;
let forceLogoutTimer: number;

const INACTIVITY_TIME = 5 * 60 * 1000; // 5 minutes
const FORCE_LOGOUT_TIME = 15 * 60 * 1000; // 15 minutes

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  login: (user) => {
    set({ user, isLoggedIn: true });
    startInactivityWatcher();
    startForceLogoutTimer();
  },

  logout: () => {
    set({ user: null, isLoggedIn: false });
    clearTimeout(inactivityTimer);
    clearTimeout(forceLogoutTimer);
    removeActivityListeners();
  },

  resetInactivityTimer: () => {
    clearTimeout(inactivityTimer);
    startInactivityWatcher();
  },
}));

// ========== Helper functions ==========
const activityEvents = ["click", "scroll", "keydown"];

const handleActivity = () => {
  useAuthStore.getState().resetInactivityTimer();
};

const addActivityListeners = () => {
  activityEvents.forEach((event) =>
    window.addEventListener(event, handleActivity)
  );
};

const removeActivityListeners = () => {
  activityEvents.forEach((event) =>
    window.removeEventListener(event, handleActivity)
  );
};

const startInactivityWatcher = () => {
  inactivityTimer = window.setTimeout(() => {
    useAuthStore.getState().logout();
    alert("Logged out due to 5 minutes of inactivity");
  }, INACTIVITY_TIME);

  addActivityListeners();
};

const startForceLogoutTimer = () => {
  clearTimeout(forceLogoutTimer);
  forceLogoutTimer = window.setTimeout(() => {
    useAuthStore.getState().logout();
    alert("You have been automatically logged out after 15 minutes.");
  }, FORCE_LOGOUT_TIME);
};
