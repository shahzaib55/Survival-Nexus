import React from "react";

const Card = ({ title, value, percentage, isPositive }) => {
  const textColor = isPositive ? "text-green-500" : "text-red-500";
  const bgColor = isPositive ? "bg-green-100" : "";
  const sign = isPositive ? "+" : "";

  return (
    <div className="bg-white rounded-lg shadow p-4 w-[377px]">
      <h3 className="text-[16px] text-[#312244] font-semibold text-gray-800 mb-6">
        {title}
      </h3>
      <div className="flex items-center">
        <span className="text-[32px] text-[#312244] font-semibold text-gray-800">
          {value}
        </span>
        <span className="ml-3 text-[16px] text-[#312244] font-semibold text-gray-800">
          Per Person
        </span>
        
        {percentage !== undefined && percentage !== null &&(
        <span
          className={`ml-2 text-sm ${textColor} ${bgColor} px-1 rounded-[50px]`}
        >
          {sign}
          {percentage}%
        </span>
      )}
      </div>
      <p className="text-sm text-[12px]  text-gray-500 mt-2">Last 30 days</p>
      <div className="border-t border-gray-200 mt-4">
        <button className="text-gray-500 font-semibold text-[12px]">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Card;
