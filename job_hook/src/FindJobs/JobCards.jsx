import React from "react";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconClock,
  IconCurrencyRupee,
} from "@tabler/icons-react";
import { Divider } from "@mantine/core";
import { Link } from "react-router-dom";
import { formatDate } from "./Utilities";
import { Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../Slices/ProfileSlice";
import ProfileService from "../Services/ProfileService";
const JobCards = ({
  id,
  jobTitle,
  company,
  applicants,
  experience,
  jobType,
  location,
  packageOffered,
  postTime,
  description,
}) => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  function stripHtmlTags(html) {
    return html.replace(/<[^>]*>?/gm, "");
  }
  function removeSectionTitles(text) {
    return text
      .replace(/About The Job\s*/i, "")
      .replace(/Responsibilities\s*/i, "")
      .replace(/Qualifications and Skill Sets\s*/i, "")
      .replace(/Preferred Qualifications\s*/i, "")
      .replace(/Benefits\s*/i, "")
      .trim();
  }

  const handleSaveJob = async () => {
   
    
    let savedJobs = profile.savedJobs || [];
    

    if (savedJobs?.includes(id)) {
      savedJobs = savedJobs?.filter((jobId) => jobId !== id);
    } else {
      savedJobs = [...savedJobs, id];
    }

    let updatedProfile = { ...profile, savedJobs: savedJobs };
    console.log("Updated Profile ID......:", updatedProfile.id);

    try {
      const savedProfile = await ProfileService.updateProfile(updatedProfile);
      dispatch(setProfile(savedProfile));
    } catch (error) {
      console.error("Failed to save job:", error);
    }

    
  };

  const plainText = removeSectionTitles(stripHtmlTags(description || ""));
  return (
    <div
      className="m-4 w-80 border border-slate-700 rounded-xl p-4 bg-mine-shaft-900 flex flex-col gap-2
                transform transition-transform duration-300 ease-out
                hover:scale-[1.01] hover:border-bright-sun-400 "
    >
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img src={`../Icons/${company}.png`} alt="" className="h-7   w-7" />
          </div>
          <div>
            <div className="font-semibold">{jobTitle}</div>

            <div className="text-xs text-mine-shaft-300">
              {company} &#x2022;{" "}
              {Array.isArray(applicants) ? applicants.length : 0} Applications{" "}
            </div>
          </div>
        </div>
        {profile.savedJobs?.includes(id) ? (
          <IconBookmarkFilled
            className="w-6 h-6 text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer"
            onClick={handleSaveJob}
          />
        ) : (
          <IconBookmark
            onClick={handleSaveJob}
            className="w-6 h-6 text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer"
          />
        )}
      </div>
      <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:rounded-md [&>div]:text-bright-sun-400 [&>div]:text-xs">
        <div>{jobType}</div>
        <div>{location}</div>
        <div>{experience}</div>
      </div>

      <div className="text-xs text-mine-shaft-300 text-start mt-1 line-clamp-3">
        {plainText}
      </div>
      <Divider size="sm" mx="md" />
      <div className="flex  justify-between">
        <div className="flex items-center ">
          <IconCurrencyRupee className="h-5 w-5" stroke={2} />
          {packageOffered || "Salary is Not Disclosed"}LPA
        </div>

        <div className="flex  items-center gap-1 text-xs">
          <IconClock className="h-5 w-5" stroke={2} />
          {formatDate(postTime)}
        </div>
      </div>
      <Link to={`/jobs/${id}`}>
        <Button fullWidth color="brightSun.4" variant="outline">
          View Job
        </Button>
      </Link>
    </div>
  );
};

export default JobCards;
