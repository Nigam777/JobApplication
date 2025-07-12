import { Tabs } from "@mantine/core";
import Cards from "./Cards";
import React, { useEffect } from "react";
import { getAllJobs, getJobById } from "../Services/PostJobSerivce";
import { useSelector } from "react-redux";
const JobHistory = () => {
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const [jobList, setJobList] = React.useState([]);
  const [allJob, setAllJob] = React.useState([]);
 
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("APPLIED");
  useEffect(() => {
    setLoading(true);
    getAllJobs()
      .then((data) => {
        setJobList(data);
        setAllJob(data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleTabChange = (tab) => {
    if (tab === "SAVED") {
      setJobList(allJob.filter((job) => profile.savedJobs?.includes(job.id)));
     
    }
    if (tab === "APPLIED") {
      const appliedJobs = allJob.filter(
        (job) => 
          job.applicants &&
          job.applicants.some((a) => a.id === user.id)
      );
      setJobList(appliedJobs);
    }

    setActiveTab(tab);
  };
  if (loading)
    return (
      <div className="text-center text-gray-400 py-10">Loading jobs...</div>
    );

  return (
    <div className="p-6">
      <Tabs
        radius="lg"
        defaultValue="APPLIED"
        variant="outline"
        onChange={handleTabChange}
        value={activeTab}
        className="w-full"
      >
        <Tabs.List className="[&_button]:text-xl font-semibold [&_button[data-active='true']]:text-yellow-400 [&_button]:text-gray-300">
          <Tabs.Tab value="APPLIED">Applied Jobs</Tabs.Tab>
          <Tabs.Tab value="SAVED">Saved Jobs</Tabs.Tab>
          <Tabs.Tab value="OFFERED">Offered Jobs</Tabs.Tab>
          <Tabs.Tab value="INTERVIEWING">Interviewing Jobs</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="APPLIED" className="flex flex-cols gap-3 mt-6">
          {jobList.map((item, index) => (
            <Cards key={index} {...item} />
          ))}
        </Tabs.Panel>
        <Tabs.Panel value="SAVED" className="flex flex-cols gap-3 mt-6">
          {jobList.map((item, index) => (
            <Cards key={index} {...item} />
          ))}
        </Tabs.Panel>
        <Tabs.Panel value="INTERVIEWING" className="flex flex-cols gap-3 mt-6">
          {jobList.map((item, index) => (
            <Cards key={index} {...item} />
          ))}
        </Tabs.Panel>
        <Tabs.Panel value="OFFERED" className="flex flex-cols gap-3 mt-6">
          {jobList.map((item, index) => (
            <Cards key={index} {...item} />
          ))}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default JobHistory;
