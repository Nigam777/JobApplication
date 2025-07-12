import React from "react";
import { jobList } from "../Data/JobsData";
import JobCards from "../FindJobs/JobCards";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllJobs  } from "../Services/PostJobSerivce";
const RecommendedJobs = () => {
  const { id } = useParams();
  const [job, setJob] = useState([{}]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllJobs()
      .then((data) => setJob(data))
      .catch((error) => console.error("Error fetching job details:", error));
  }, [id]);
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-semibold p-4 ">
        Recommended <span className="text-bright-sun-400">Jobs</span>
      </div>
      <div className="mx-5  flex flex-col gap-y-4">
        {job.slice(0, 3).map((item, index) => (
          <JobCards key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs;
