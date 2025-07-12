import React from "react";

const ExpCard = ({ title, company, location, startDate, endDate, description }) => {
  return (
    <div className="mt-2 p-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img className="h-7" src={`/Icons/${company}.png`} alt={company} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold">{title}</div>
            <div className="text-xs text-mine-shaft-300">{location}</div>
          </div>
         
        </div>
        <div>{startDate} - {endDate}</div>
      </div>
      <div className="text-xs text-mine-shaft-300 text-justify mt-2">
        {description}
      </div>
    </div>
  );
};

export default ExpCard;
