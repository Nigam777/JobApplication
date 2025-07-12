import React from "react";
import SearchBar from "../FindJobs/SearchBar";
import { Divider } from "@mantine/core";
import Jobs from "../FindJobs/Jobs";

const FindJobs = () => {
  return (
    <>
      <div>
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
          <Divider size="sm" mx="md" />
<SearchBar />
          <Divider size="sm" mx="md" />
          <Jobs/>
        </div>
      
      </div>
    </>
  );
};

export default FindJobs;
