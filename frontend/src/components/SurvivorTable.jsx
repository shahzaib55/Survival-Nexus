import React from "react";
import { GoDotFill } from "react-icons/go";
import { MdOutlineArrowDropDown } from "react-icons/md";
import userProfile from "../assets/outline_user_profile.png";

const Table = ({ data }) => {
  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-xs mb-8">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="text-left font-medium text-[12px] bg-[#f6f6f6] text-[#A1A0A3]">
            <th className="px-4 py-3 pr-4">
              Name
              <MdOutlineArrowDropDown className="ml-2 h-5 w-5 inline-block" />
            </th>
            <th className="px-4 py-3">
              Age
              <MdOutlineArrowDropDown className="ml-2 h-5 w-5 inline-block" />
            </th>
            <th className="px-4 py-3">
              Gender
              <MdOutlineArrowDropDown className="ml-2 h-5 w-5 inline-block" />
            </th>
            <th className="px-4 py-3">
              LastLocation
              <MdOutlineArrowDropDown className="ml-2 h-5 w-5 inline-block" />
            </th>
            <th className="px-4 py-3">
              Infected
              <MdOutlineArrowDropDown className="ml-2 h-5 w-5 inline-block" />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200  ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
              <td className="px-4 py-2 whitespace-nowrap h-[68px] ">
                <div className="flex items-center ">
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
              <td className="px-4 py-2 text-gray-500 text-[14px] whitespace-nowrap">
                {item.age}
              </td>
              <td className="px-4 py-2 text-gray-500 text-[14px] whitespace-nowrap">
                {item.gender}
              </td>
              <td className="px-4 py-2 text-gray-500 text-[14px] whitespace-nowrap">
                {item.lastLocation.latitude}, {item.lastLocation.longitude}
              </td>

              <td className="px-4 py-2 whitespace-nowrap h-[68px]">
                <span
                  className={`inline-flex items-center rounded-full text-[14px] font-medium px-2 py-0.5 ${
                    !item.infected 
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <GoDotFill className="h-3 w-3 mr-1" />
                  {item.infected ? "Infected" : "Healthy"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4 items-center">
        <div className="text-Medium text-12px text-gray-500">
          Showing <span className="text-black">1</span> to{" "}
          <span className="text-black">5</span> of{" "}
          <span className="text-black">100</span> Results
        </div>
        <div>
          <button className="bg-white text-[14px] font-semibold border h-[40px] border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-1 rounded mr-2 ">
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
