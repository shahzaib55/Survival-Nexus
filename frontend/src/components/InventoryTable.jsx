import React from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import userProfile from "../assets/outline_user_profile.png";
import { useSurvivors } from "../context/SurvivorContext";

const Table = ({ onRequest }) => {
  const { survivors, setSurvivors } = useSurvivors(); 
   
  const formatInventory = (inventory) => {
    if (!inventory || !Array.isArray(inventory)) return "";
    return inventory
      .map((item) => {
        const itemName = item?.item?.name || "Unknown Item";
        const quantity = item?.quantity || 0;
        return `${quantity} ${itemName}`;
      })
      .join(", ");
  };
  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-xs mb-8">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="text-left font-medium text-[12px] bg-[#f6f6f6] text-[#A1A0A3]">
            <th className="px-4 py-3 pl-5">
              Name
              <MdOutlineArrowDropDown className="ml-2 h-5 w-5 inline-block" />
            </th>
            <th className="px-4 py-3">
              Inventories
              <MdOutlineArrowDropDown className="ml-2 h-5 w-5 inline-block" />
            </th>
            <th className="px-4 py-3">
              Action
              <MdOutlineArrowDropDown className="ml-2 h-5 w-5 inline-block" />
            </th>
          </tr>
        </thead>
        <tbody>
          {survivors.map((item, index) => (
            <tr
              key={item._id} 
              
              className={`border-b border-gray-200 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
              <td className="px-4 py-2 whitespace-nowrap w-[300px] h-[68px]">
                <div className="flex items-center">
                  <img
                    src={userProfile}
                
                    alt={`${item.name}'s avatar`}
                    className="h-[40px] w-[40px] rounded-full mr-3 object-cover"
                  />
                  <span className="text-gray-700 text-[14px] font-semibold">
                    {item.name}
                  </span>
                </div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap w-[500px] h-[68px]">
                <p className="text-gray-500 text-[14px] font-normal">
                  {formatInventory(item.inventory)}
                </p>
              </td>
              <td className="px-4 py-2 text-gray-500 text-[14px] w-[185px] h-[68px] whitespace-nowrap">
                <button
                  className="bg-white border border-gray-300 text-[14px] hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-[7px] mr-2 text-sm"
                  onClick={() => onRequest(item)}
                >
                  Request Item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4 items-center">
        <div className="text-Medium text-12px text-gray-500">
          Showing <span className="text-black">1</span> to{" "}
          <span className="text-black">{survivors.length > 0 ? 5 : 0}</span> of{" "}
          <span className="text-black">{survivors.length}</span> Results
        </div>
        <div>
          <button className="bg-white text-[14px] font-semibold border h-[40px] border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-1 rounded mr-2">
            Previous
          </button>
          <button className="bg-white text-[14px] font-semibold h-[40px] border border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-1 rounded">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;