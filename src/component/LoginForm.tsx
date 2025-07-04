// components/LoginForm.tsx
import { useAuthStore } from "../stores/useAuthStore";

const LoginForm = () => {
  const login = useAuthStore((state) => state.login);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleLogin = () => {
    // Fake user login
    login({ name: "John Doe", email: "john@example.com" });
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>Welcome! You are logged in.</div>
      ) : (
        <div className="cursor-pointer" onClick={handleLogin}>
          Login
        </div>
      )}
    </div>
  );
};

export default LoginForm;
