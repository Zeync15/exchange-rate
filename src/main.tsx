import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import "./index.css";
import AcctListing from "./page/AcctListing.tsx";
import Company from "./page/Company.tsx";
import ExchangeRate from "./page/ExchangeRate.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AcctListing /> },
      { path: "/exchangeRate", element: <ExchangeRate /> },
      { path: "/company", element: <Company /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
