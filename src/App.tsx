import { Link, Outlet } from "react-router-dom";
import LoginForm from "./component/LoginForm";
import LogoutButton from "./component/LogoutButton";
import { useAuthStore } from "./stores/useAuthStore";
import LogoutListener from "./utils/LogoutListener";

const App = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <div className="max-w-[800px] mx-auto mt-20">
      <div className="mb-4 flex flex-col items-end">
        <LogoutListener />
        <LoginForm />
        <LogoutButton />
      </div>

      {isLoggedIn && (
        <>
          <nav>
            <Link to="/">Account Listing</Link> |{" "}
            <Link to="/exchangeRate">Exchange Rate</Link> |{" "}
            <Link to="/company">Company</Link>
          </nav>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default App;
