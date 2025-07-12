import React from "react";

import SearchTalent from "./SearchTalent";
import SortTalents from "./SortTalents";
import TalentCard from "./TalentCard";
import { talents } from "../Data/TalentData";

const Talents = () => {
  return (
    <>
      <div className="p-4  ">
        <div className="flex justify-between p-4">
          <div className="text-2xl font-semibold">Talents</div>
          <div>
            <SortTalents />
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-5 justify-evenly">
          {talents.map((item, index) => (
            <TalentCard key={index} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Talents;
