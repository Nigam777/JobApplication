import React from "react";
import { Divider } from "@mantine/core";
import SearchTalent from "../FindTalent/SearchTalent";
import Talents from "../FindTalent/Talents";

const FindTalent = () => {
  return (
    <>
      <div>
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
          <Divider size="sm" mx="md" />

          <SearchTalent />
          <Divider size="sm" mx="md" />
           <Talents/>
           
        </div>
      </div>
    </>
  );
};

export default FindTalent;
