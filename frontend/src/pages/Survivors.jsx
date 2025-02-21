import React, { useState } from "react";
import SurvivorsTable from "../components/SurvivorTable.jsx";
import { FaPlusCircle } from "react-icons/fa";
import AddSurvivorForm from "../components/AddSurvivorForm";
import { useSurvivors } from "../context/SurvivorContext.jsx";
import { createSurvivor } from "../services/survivorService";
import infoIcon from "../assets/info.png";

const Survivors = () => {
  const { survivors, setSurvivors } = useSurvivors();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const totalSurvivors = survivors.length;
  const [newSurvivor, setNewSurvivor] = useState({
    fullName: "",
    status: "Select",
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewSurvivor({ fullName: "", status: "Select" });
  };

  const handleInputChange = (e) => {
    setNewSurvivor({ ...newSurvivor, [e.target.name]: e.target.value });
  };

  const handleAddSurvivor = async () => {
    if (newSurvivor.fullName && newSurvivor.status !== "Select") {
      setIsLoading(true);
      try {
        const survivorToAdd = {
          name: newSurvivor.fullName,
          status: newSurvivor.status,
          dateAdded: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        };
        const createdSurvivor = await createSurvivor(survivorToAdd);

        setSurvivors([...survivors, createdSurvivor]);
        handleCloseModal();
      } catch (error) {
        console.error("Error adding survivor:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="my-container mx-auto p-4 bg-white rounded-lg pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-[24px] font-semibold">List of Survivors</h2>
        <button
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 inline-flex items-center text-[14px] font-semibold"
          onClick={handleOpenModal}
          disabled={isLoading}
        >
          <FaPlusCircle className="w-[24px] h-[24px] mr-[5px]" />
          Add Survivor
        </button>
      </div>
      <div className="flex items-center mb-4">
        <p className="text-[#5F5F61] text-[14px] mr-2">
          You have {totalSurvivors} healthy survivors
        </p>
        <img src={infoIcon} alt="Info" className="h-5 w-5 cursor-pointer" />
      </div>
      <SurvivorsTable data={survivors} />
      <div className="flex justify-between mt-4 items-center"></div>
      <AddSurvivorForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddSurvivor}
        survivorData={newSurvivor}
        onChange={handleInputChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Survivors;
