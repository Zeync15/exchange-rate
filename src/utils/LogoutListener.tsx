import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";

const LogoutListener = () => {
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) return;

    const handlePopState = () => {
      if (isLoggedIn) {
        logout();
      }
    };

    const handleBeforeUnload = () => {
      logout();
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isLoggedIn, logout]);

  return null; // This component only handles side effects
};

export default LogoutListener;
