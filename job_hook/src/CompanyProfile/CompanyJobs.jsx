import React from 'react'
import { jobList } from "../Data/JobsData";
import JobCards from "../FindJobs/JobCards";
const CompanyJobs = () => {
  return (
    <div>
      <div className=" flex flex-wrap justify-evenly">
             {jobList.map((item, index) => (
                <JobCards key={index} {...item} />
              ))}
             </div>
    </div>
  )
}

export default CompanyJobs

