import React from "react";
import { Button } from "@mantine/core";
import ExpInput from "./ExpInput";
import  {formatDate }from "../Services/Utilis"; 
const ExpCard = ({ title, company, location, startDate, endDate, description, edit }) => {
  const [Edits, setEdits] = React.useState(false);
  {console.log("Edits", Edits)}
  return Edits ? (
    <ExpInput  />
  ) : (
    
    
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
        <div>{formatDate(startDate)} - {formatDate(endDate)}</div>
      </div>
      <div className="text-xs text-mine-shaft-300 text-justify mt-2">
        {description}
      </div>
      {edit && (
        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={() => setEdits(true)} variant="outline" color="brightSun.4">
            Edit
          </Button>
          <Button color="red.8" variant="light">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExpCard;
