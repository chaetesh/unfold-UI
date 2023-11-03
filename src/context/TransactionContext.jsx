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
  };

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

  function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`);
    // This promise will wait for until the listner is completed and will call resolve if its completed succesfully else reject
    return new Promise((resolve, reject) => {
      // listen for this transaction to finish( This listner will call callback-function once there is one confirmation)
      provider.once(transactionResponse.hash, (transactionReciept) => {
        // Print the number of confirmations
        console.log(
          `Completed with ${transactionReciept.confirmations} Confirmations`
        );
        resolve();
      });
    });
  }

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        return alert("Make sure you install metamask!");
      }
      console.log("Sending transaction");
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { dataId, category, name, data, cost } = formData;

      const transactionContract = getEthereumContract();
      const transactionResponse = await transactionContract.addData(
        dataId,
        name,
        category,
        data,
        cost,
      );

      await listenForTransactionMine(transactionResponse, provider);
      console.log("Transaction Mined");
    } catch(error) {
      console.log("Transaction Failed");
      console.log(error)
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
