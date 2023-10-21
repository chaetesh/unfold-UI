import Login from "./Login"; // Import the Login component
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { MetaMaskButton } from "@metamask/sdk-react-ui";

const Topbar = () => {
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Check if Metamask is installed and connected
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then(accounts => {
          if (accounts.length > 0) {
            setIsMetamaskConnected(true);
            setAccount(accounts[0]);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  const connectToMetamask = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setIsMetamaskConnected(true);
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src="/logo.jpg" style={{width:'39px',marginTop:'5px'}}></img>
          <span className="ml-3 text-xl">Medical DataExchange</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/buy" className="mr-5 hover:text-gray-900">
            Buy
          </Link>
          <Link to="/sell" className="mr-5 hover:text-gray-900">
            Sell
          </Link>
        </nav>
        <div className="inline-flex text-black border-0 py-2 px-6 focus:outline-none rounded text-lg">
          <MetaMaskButton theme={"dark"} color="indigo"></MetaMaskButton>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
