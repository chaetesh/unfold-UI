import { useState } from "react";
import healthData from "./healthData.json"
import { ethers } from "ethers";

const Sell = () => {
  const [formData, setFormData] = useState({
    dataId: "",
    category: "",
    name: "",
    data: "",
    cost: "",
  });
  	const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
  	const [contract, setContract] = useState(null);

  	let contractAddress = "0x23a75F8AEA00A069828F5245437c1e859BAD7347";

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(
      contractAddress,
      healthData,
      tempSigner
    );
    setContract(tempContract);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    updateEthers();
    // Handle form submission logic for selling here
    // You can access form data in the formData state
    console.log(contract);
    console.log(formData);
    contract.access(0)
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
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Sell Listing
        </button>
      </form>
    </div>
  );
};

export default Sell;
