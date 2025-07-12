import React, { useEffect, useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button, Divider } from "@mantine/core";
import ApplyJobComp from "../ApplyJobs/ApplyJobComp";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById } from "../Services/PostJobSerivce";


const ApplyJob = () => {
  const { id } = useParams(); 
  const [job, setJob] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      getJobById(id)
        .then((data) => {
          setJob(data);
        })
        .catch((error) => {
          console.error("Error fetching job details:", error);
        });
    }
  }, [id]);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Divider size="sm" mx="md" />

      <Button
        leftSection={<IconArrowLeft />}
        variant="outline"
        color="brightSun.4"
        onClick={() => navigate(-1)}
        className="p-8 mt-6 ml-4"
      >
        Back
      </Button>

      

      
      {job ? (
        <ApplyJobComp
          company={job.company} 
          jobTitle={job.jobTitle}
          postTime={job.postTime}
          applicants={job.applicants}
        />
      ) : (
        <div className="text-white text-center mt-10">Loading job details...</div>
      )}
    </div>
  );
};

export default ApplyJob;
