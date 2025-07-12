import { useEffect, useState } from "react";
import { Divider } from "@mantine/core";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import  { getJobPosteBy } from "../Services/PostJobSerivce";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const PostedJobPages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [jobList, setJobList] = useState([]);
  const [job, setJob] = useState({});
  console.log("User ID:", user.id);
  console.log("Job ID from Params:", id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJob = async () => {
      try {
        const res = await getJobPosteBy(user.id);
        console.log("Fetched Jobs:", res);
        setJobList(res);

        if (res && res.length > 0 && Number(id) === 0) {
          navigate(`/posted-job/${res[0].id}`);
        }

        setJob(res.find((job) => job.id === Number(id)) || {});
      } catch (error) {
        console.error("Error fetching posted jobs:", error);
      }
    };
    fetchJob();
  }, [id]);

  return (
    <div>
      <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
        <Divider size="sm" mx="md" />
        <div className="flex gap-5 w-full">
          <PostedJob jobList={jobList} job={job} />
          <div className="w-3/4">
            <PostedJobDesc job={job} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedJobPages;
