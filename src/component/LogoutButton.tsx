// components/LogoutButton.tsx
import { useAuthStore } from '../stores/useAuthStore';

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    isLoggedIn && <div className="cursor-pointer" onClick={logout}>Logout</div>
  );
};

export default LogoutButton;
