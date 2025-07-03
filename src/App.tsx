import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="max-w-[800px] mx-auto mt-20">
      <nav>
        <Link to="/">Account Listing</Link> | <Link to="/exchangeRate">Exchange Rate</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
