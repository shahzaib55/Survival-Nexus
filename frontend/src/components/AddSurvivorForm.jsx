import React, { useState } from "react";
import { createSurvivor } from "../services/survivorService.js";
import { useItemData } from "../hooks/useItemsData.js";
import "../styles/style.css";
import { useSurvivors } from "../context/SurvivorContext.jsx"; // Add this import

const AddSurvivor = ({ isOpen, onClose }) => {
  const { survivors, setSurvivors } = useSurvivors(); // Add context hook
  const [survivorData, setSurvivorData] = useState({
    fullName: "",
    age: "",
    gender: "",
    latitude: "",
    longitude: "",
    infected: "",
  });
  const [inventoryInput, setInventoryInput] = useState({ itemId: "", quantity: "" });
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { Items } = useItemData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurvivorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInventoryInputChange = (field, value) => {
    setInventoryInput({ ...inventoryInput, [field]: value });
  };

  const handleAddItem = () => {
    if (inventoryInput.itemId && inventoryInput.quantity) {
      setInventory([...inventory, inventoryInput]);
      setInventoryInput({ itemId: "", quantity: "" });
    } else {
      alert("Please select an item and quantity.");
    }
  };

  const handleRemoveItem = (index) => {
    const updatedInventory = [...inventory];
    updatedInventory.splice(index, 1);
    setInventory(updatedInventory);
  };

  const filteredAvailableItems = Items.filter(item => {
    return !inventory.some(invItem => invItem.itemId === item.id);
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      name: survivorData.fullName,
      age: parseInt(survivorData.age, 10),
      gender: survivorData.gender,
      lastLocation: {
        latitude: parseFloat(survivorData.latitude),
        longitude: parseFloat(survivorData.longitude),
      },
      inventory: inventory.map((item) => ({
        item: item.itemId,
        quantity: parseInt(item.quantity, 10),
      })),
      infected: survivorData.infected === "yes",
    };

    try {
      const newSurvivor = await createSurvivor(payload);
      // Update the context with the new survivor
      setSurvivors([...survivors, newSurvivor]);
      
      // Reset form
      setSurvivorData({
        fullName: "",
        age: "",
        gender: "",
        latitude: "",
        longitude: "",
        infected: "",
      });
      setInventory([]);
      onClose();
      alert("Survivor added successfully!");
    } catch (err) {
      setError("Failed to add survivor. Please try again.");
      console.error("Error adding survivor:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    
    <div className="fixed inset-0 flex justify-center items-center bg-black z-50 modal_form">
      <div className="bg-white rounded-lg p-6 w-[800px] shadow-md relative z-10   overflow-y-auto"> 
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[18px] font-semibold">Add Survivor</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              className="h-[24px] w-[24px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-[14px] text-gray-700 font-medium mb-2 text-medium"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={survivorData.fullName}
              onChange={handleChange}
              className="border text-[14px] border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="Enter Full Name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-[14px] text-gray-700 font-medium mb-2 text-medium"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={survivorData.age}
              onChange={handleChange}
              className="border text-[14px] border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="Enter Age"
              required
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-[14px] text-gray-700 font-medium mb-2 text-sm"
            >
              Gender
            </label>

              <select
                id="gender"
                name="gender"
                value={survivorData.gender}
                onChange={handleChange}
                className="border text-[14px] text-gray-500 border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm "
                required
              >
                <option value="Select" defaultValue="Select">
                  Select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
          </div>


          <div>
            <label
              htmlFor="latitude"
              className="block text-[14px] text-gray-700 font-medium mb-2 text-medium"
            >
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={survivorData.latitude}
              onChange={handleChange}
              className="border text-[14px] border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="Enter Latitude"
              required
            />
          </div>
          <div>
            <label
              htmlFor="longitude"
              className="block text-[14px] text-gray-700 font-medium mb-2 text-medium"
            >
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={survivorData.longitude}
              onChange={handleChange}
              className="border text-[14px] border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="Enter Longitude"
              required
            />
          </div>
          <div>
            <label
              htmlFor="infected"
              className="block text-[14px] text-gray-700 font-medium mb-2 text-sm"
            >
              Infected
            </label>

              <select
                id="infected"
                name="infected"
                value={survivorData.infected}
                onChange={handleChange}
                className="border text-[14px] text-gray-500 border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm "
                required
              >
                <option value="Select" defaultValue="Select">
                  Select 
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
          </div>
        </div>


        <div className="mb-4">
      <label className="block text-[14px] text-gray-700 font-medium mb-2 text-sm">
        Inventory:
      </label>

      {inventory.length > 0 && ( 
       <ul className="border border-gray-300 rounded-md p-2 mb-2 grid grid-cols-3 gap-4"> 
       {inventory.map((item, index) => (
         <li key={item.id} className="flex items-center mb-1">
           <div className="text-[14px] text-gray-700"> 
             {Items.find(Item => Item.id === item.itemId)?.name} x {item.quantity}
           </div>
           <button
             type="button"
             onClick={() => handleRemoveItem(index)}
             className="text-red-500 hover:text-red-700 ml-2" 
           >
             Remove
           </button>
         </li>
       ))}
     </ul>
      )}
      <div className="grid grid-cols-3 gap-4"> 
        <div> 
          <select
            value={inventoryInput.itemId}
            onChange={(e) => handleInventoryInputChange("itemId", e.target.value)}
            className="border text-[14px] text-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"  
          >
            <option value="">Select Item</option>
           
            {filteredAvailableItems.map((filteredAvailableItems) => (
              <option key={filteredAvailableItems._id} value={filteredAvailableItems._id}>
                {filteredAvailableItems.name}
              </option>
            ))}
          </select>
        </div>
        <div> 
          <input
            type="number"
            value={inventoryInput.quantity}
            onChange={(e) => handleInventoryInputChange("quantity", e.target.value)}
            className="border text-[14px] border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"  
            placeholder="Quantity"
            min="0"
            required
          />
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="bg-[#4D194D] w-[80px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
        >
          Add
        </button>
      </div>
        
      </div>
   
    <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-[14px] hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-[7px] mr-2 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`bg-[#4D194D] text-[14px] text-white font-bold py-2 px-4 rounded-[7px] text-sm ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#4D194D]"}`}
          >
            {loading ? "Adding..." : "Add Survivor"}
          </button>
        </div>
    </div>
    </div>
  
  );
};

export default AddSurvivor;