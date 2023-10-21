import { useState } from "react";
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Buy = (e) => {
  const {
    connectWallet,
    currentAccount,
    formData,
    setFormData,
    handleChange,
    sendTransaction,
  } = useContext(TransactionContext);
  const handleSubmit = () => {
    const { dataId, category, name, data, cost } = formData;
    e.preventDefault;
    console.log(formData);
    if (!dataId || !category || !name || !data || !cost) {
      alert("Please fill all the fields");
      return;
    } else {
      sendTransaction();
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Create New Listing</h2>
      <div className="mb-4">
        <label
          htmlFor="dataId"
          className="block text-sm font-medium text-gray-600"
        >
          Data ID
        </label>
        <input
          type="number"
          id="dataId"
          name="dataId"
          className="mt-1 p-2 w-full border rounded-md"
          onChange={handleChange}
          value={formData.dataId}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-600"
        >
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          className="mt-1 p-2 w-full border rounded-md"
          onChange={handleChange}
          value={formData.category}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-600"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 p-2 w-full border rounded-md"
          onChange={handleChange}
          value={formData.name}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="data"
          className="block text-sm font-medium text-gray-600"
        >
          Data
        </label>
        <textarea
          id="data"
          name="data"
          rows="4"
          className="mt-1 p-2 w-full border rounded-md"
          onChange={handleChange}
          value={formData.data}
        ></textarea>
      </div>
      <div className="mb-6">
        <label
          htmlFor="cost"
          className="block text-sm font-medium text-gray-600"
        >
          Cost
        </label>
        <input
          type="number"
          id="cost"
          name="cost"
          className="mt-1 p-2 w-full border rounded-md"
          onChange={handleChange}
          value={formData.cost}
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition duration-300"
        onClick={handleSubmit}
      >
        Create Listing
      </button>
    </div>
  );
};

export default Buy;
