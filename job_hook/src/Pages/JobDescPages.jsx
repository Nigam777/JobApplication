import React from "react";
import { Divider, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import JobDesc from "../JobDesc/JobDesc";
import RecommendedJobs from "../JobDesc/RecommendedJobs";

const JobDescPages = () => {
  return (
    <>
      <div>
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] ">
          <Divider size="sm" mx="md" />
          <Link className="p-4 mr-6 inline-block" to={"/find-job"}>
            <Button
              leftSection={<IconArrowLeft />}
              variant="outline"
              color="brightSun.4"
            >
              {" "}
              Back
            </Button>
          </Link>
         
          <div className="flex">
             <JobDesc />
            <RecommendedJobs />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescPages;
