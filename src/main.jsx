import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Topbar from "./components/Topbar.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Buy from "./components/BuyMarket.jsx";
import Sell from "./components/SellMarket.jsx";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import { TransactionProvider } from "./context/TransactionContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <div className="min-h-screen">
          <Topbar />
          <App />
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
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TransactionProvider>
      <MetaMaskUIProvider
        sdkOptions={{
          dappMetadata: {
            name: "Demo UI React App",
          },
        }}
      >
        <RouterProvider router={router} />
      </MetaMaskUIProvider>
    </TransactionProvider>
  </React.StrictMode>
);
