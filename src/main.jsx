import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Topbar from "./components/Topbar.jsx";
import Footer from "./components/Footer.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Buy from "./components/BuyMarket.jsx";
import Sell from "./components/SellMarket.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <div className="min-h-screen">
          <Topbar />
          <App />
        </div>
        <div className=" text-white py-4 text-center sticky bottom-0">
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: "/buy",
    element: (
      <>
        <div className="min-h-screen">
          <Topbar />
          <Buy />
        </div>
        <div className=" text-white py-4 text-center sticky bottom-0">
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: "/sell",
    element: (
      <>
        <div className="min-h-screen">
          <Topbar />
          <Sell />
        </div>
        <div className=" text-white py-4 text-center sticky bottom-0">
          <Footer />
        </div>
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
