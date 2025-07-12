import React, { useEffect } from "react";
import JobSort from "./JobSort";
import JobCards from "./JobCards";
import { getAllJobs } from "../Services/PostJobSerivce";

const Jobs = () => {
  const[jobList, setJobList] = React.useState([{}]);
    
   useEffect(
    ()=>{
      getAllJobs().then(
        (data) => {
          setJobList(data);
        }
      ).catch((error) => {
        console.error("Error fetching jobs:", error);
      });
    }
    ,[]
   );
   
  return (
    <>
      <div className="p-4 ">
        <div className="flex justify-between p-4">
          <div className="text-2xl font-semibold">
            Recommended <span className="text-bright-sun-400">Jobs</span>
          </div>
          <div>
            <JobSort />
          </div>
        </div>
       <div className=" mt-2 flex flex-wrap justify-start">
       {jobList.map((item, index) => (
          <JobCards key={index} {...item} />
        ))}
       </div>
      </div>
    </>
  );
};

export default Jobs;
