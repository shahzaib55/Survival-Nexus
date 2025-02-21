import React, { useState } from "react";
import InventoryTable from "../components/InventoryTable";
import RequestItemForm from "../components/RequestItemForm"; 
import infoIcon from "../assets/info.png";

const Inventories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSurvivor, setSelectedSurvivor] = useState(null);

  const handleOpenModal = (survivor) => {
    setSelectedSurvivor(survivor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSurvivor(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Survivor Inventories
        </h2>
      </div>
      <div className="flex items-center mb-4">
        <p className="text-sm text-gray-600 mr-2">
          Total Inventories Logged: 10,201
        </p>
        <img src={infoIcon} alt="Info" className="h-5 w-5 cursor-pointer" />
      </div>
      <InventoryTable data={data} onRequest={handleOpenModal} />
      <RequestItemForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedSurvivor={selectedSurvivor}
      />
    </div>
  );
};

export default Inventories;