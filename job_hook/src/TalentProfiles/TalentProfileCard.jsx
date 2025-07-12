import React from "react";
import { IconBellHeart } from "@tabler/icons-react";
import { Avatar, Button, Divider } from "@mantine/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const TalentProfileCard = (props) => {
  const profile=useSelector((state) => state.profile);
  return (
    <div className="border border-slate-700  p-4 w-96  flex flex-col gap-3 rounded-xl bg-mine-shaft-900">
      {/* Header Section */}
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar src={`/Boy.png`} alt="" className="rounded-full" size="lg" />
          </div>
          <div>
            <div className="font-semibold text-sm">{props.name}</div>
            <div className="text-xs text-mine-shaft-300">
              {props.jobTitle} • {props.company}
            </div>
          </div>
        </div>
        <IconBellHeart className="w-5 h-5 text-bright-sun-400 cursor-pointer" />
      </div>

      {/* Skills Section */}
      <div className="flex gap-1 flex-wrap text-xs">
        {props.skills.map((skill, index) => (
          <div key={index} className="px-2 py-1 bg-mine-shaft-800 rounded-md text-bright-sun-400">
            {skill}
          </div>
        ))}
      </div>

      {/* About Section (Truncated) */}
      <div className="text-xs text-mine-shaft-300 line-clamp-3">
        {props.about}
      </div>

      <Divider size="sm" mx="md" />

      {/* Salary & Location */}
      <div className="flex justify-between text-xs text-mine-shaft-400">
        <div>{props.location}</div>
      </div>
      <Divider size="sm" mx="md" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-2 "> 
        <Link to={`/Talent-profile-page/${profile?.id}`}> 
        <Button variant="outline" fullWidth color="yellow">Profile</Button>
        </Link>
        <div>
            <Button variant="outline" fullWidth color="yellow">Message</Button>
        </div>
      </div>
    </div>
  );
};

export default TalentProfileCard;
