import { useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

const Buy = () => {
  const [formData, setFormData] = useState({
    dataId: "",
  });
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const updateEthers = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const tempContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    return tempContract;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contract = updateEthers();
    // Handle form submission logic for selling here
    // You can access form data in the formData state

    const data = await contract.access(formData.dataId);
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Sell Your Listing</h2>
      <form onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Access Data
        </button>
      </form>
    </div>
  );
};

export default Buy;
