import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    dataId: "",
    category: "",
    name: "",
    data: "",
    cost: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) {
      return alert("Make sure you install metamask!");
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      const account = accounts[0];
      setCurrentAccount(account);

      //getAllTransactions();
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction = async () => {
    try{
      if (!ethereum) {
        return alert("Make sure you install metamask!");
      }
      const { dataId, category, name, data, cost } = formData;
      const parsedAmount = ethers.utils.parseEther(cost);
       
      const transactionContract = getEthereumContract();  
      await ethereum.request({method: "eth_sendTransaction" , params: [
        {
          from: currentAccount,
          to: contractAddress,
          gas: "0x5208",
          amount: parsedAmount._hex,
        },
      ]});
      console.log("Transaction Mined");
    } catch {
      console.log("Transaction Failed");
    }
  }


  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount , formData, setFormData,handleChange, sendTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
