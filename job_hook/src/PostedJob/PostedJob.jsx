import React, { useState } from "react";
import { Tabs, Button } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import PostedJobCard from "./PostedJobCard";

const PostedJob = ({ jobList }) => {
  const [activeTab, setActiveTab] = useState("ACTIVE");
  console.log("Job List:", jobList);
  
  // Filter jobs based on status
  const filteredJobs = jobList.filter((job) => job.jobStatus === activeTab);
  const activeCount = jobList.filter((job) => job.jobStatus === "ACTIVE").length;
  const draftCount = jobList.filter((job) => job.jobStatus === "DRAFT").length;

  return (
    <div className="w-1/6 mt-6">
      <Link className="my-5 inline-block" to="/find-job">
        <Button
          className="ml-5 text-mine-shaft-900 hover:bg-bright-sun-400 w-full mb-5"
          variant="light"
          color="brightSun.4"
          leftSection={<IconArrowLeft size={20} />}
        >
          Back
        </Button>
      </Link>

      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        variant="pills"
        autoContrast
      >
        <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium mx-5">
          <Tabs.Tab value="ACTIVE">Active [{activeCount}]</Tabs.Tab>
          <Tabs.Tab value="DRAFT">Drafts [{draftCount}]</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="ACTIVE">
          <div className="flex flex-col gap-2 p-2">
            {filteredJobs.map((item, index) => (
              <PostedJobCard key={index} {...item} />
            ))}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="DRAFT">
          <div className="flex flex-col gap-2 p-2">
            {filteredJobs.map((item, index) => (
              <PostedJobCard key={index} {...item} />
            ))}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default PostedJob;
