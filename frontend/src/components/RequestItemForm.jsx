import React, { useState } from "react";
import "../styles/style.css";
import { requestItem } from "../services/survivorService";

const RequestItem = ({ isOpen, onClose, selectedSurvivor }) => {
  const [formData, setFormData] = useState({
    toSurvivorId: "",
    itemId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequest = async () => {
    if (!formData.toSurvivorId || !formData.itemId) {
      alert("Please complete all fields");
      return;
    }
    const requestData = {
      fromSurvivorId: selectedSurvivor._id, 
      toSurvivorId: formData.toSurvivorId, 
      itemId: formData.itemId, 
    };
    // console.log(requestData)
    try {
      await requestItem(requestData); 
      alert("Item requested successfully");
      onClose(); 
    } catch (error) {
      console.error("Error requesting item:", error);
      alert("Failed to request item");
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 modal_form">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Request Item</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              className="h-6 w-6"
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
              />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <label
            htmlFor="toSurvivorId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your ID (Requester ID)
          </label>
          <input
            type="text"
            id="toSurvivorId"
            name="toSurvivorId"
            value={formData.toSurvivorId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your ID"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="itemId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Item
          </label>
          <select
            id="itemId"
            name="itemId"
            value={formData.itemId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>
              Choose an item
            </option>
            {selectedSurvivor?.inventory.map((item) => (
              <option key={item._id} value={item._id}>
                {item.item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleRequest}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestItem;