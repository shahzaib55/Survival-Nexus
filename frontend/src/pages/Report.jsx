import React from "react";
import Card from "../components/card";
import { useReportData } from "../hooks/useRportsData.js";
import infoIcon from "../assets/info.png";

const Report = () => {
  const { reports, loading } = useReportData();

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="my-container mx-auto px-4 py-4">
        <h2 className="font-medium text-[#312244] text-[20px] mb-4">Reports</h2>
        <div className="flex items-center mb-4">
          <p className="text-[#5F5F61] text-[14px] mr-2">
            Your camp has grown <span className="text-[#52A86E]">+5%</span> this
            month
          </p>
          <img src={infoIcon} alt="Info" className="h-5 w-5 cursor-pointer" />
        </div>

        <div className="flex flex-wrap justify-start gap-8">
          <Card
            title="Number of Healthy Survivors"
            value={reports.nonInfectedCount}
            percentage={reports.nonInfectedPercentage}
            description="Last 30 days"
            color="blue"
            isPositive={true}
          />
          <Card
            title="Number of Infected Survivors"
            value={reports.infectedCount}
            percentage={reports.infectedPercentage}
            description="Last 30 days"
            color="red"
            isPositive={false}
          />
          {reports?.averageResources.map((resource, index) => (
            <Card
              key={index}
              title={`Average ${resource.item.name}`}
              value={`${resource.average.toFixed(2)}`}
              description="Last 30 days"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;
