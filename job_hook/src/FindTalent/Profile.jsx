import React from "react";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import { Button, Divider } from "@mantine/core";
import ExpCard from "./ExpCard";

import { useSelector } from "react-redux";



const Profile = (props) => {
  const profile=useSelector((state) => state.user)
  console.log("profile", profile.name)
  return (
<div className="w-2/3 mt-3 px-4 ">
      <div className="relative">
        <img className="rounded-t-2xl" src="../Profile/banner.png" alt="" />
        <img
          className="rounded-full w-48 h-48 absolute top-16 left-5 border-mine-shaft-900 border-4"
          src="./Working/avatar1.png"
          alt=""
        />
        <div></div>
        <div className="px-6 mt-16">
          <div className="text-3xl font-semibold flex justify-between">
          {props.name}
            <Button color="yellow" variant="outline" className="ml-2">
              Message
            </Button>
          </div>
          <div className="text-xl flex items-center ">
            {" "}
            <IconBriefcase className="w-4 h-4 text-bright-sun-400" />{props.role} &bull; {props.company}
          </div>
          <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
            <IconMapPin className="w-4 h-4 text-bright-sun-300" />
           {props.location}
          </div>
        </div>
        <Divider size="sm" my="md" mx="md"/>
        <div className="px-6">
          <div className="text-2xl font-semibold ">About</div>
          <div className="text-sm text-mine-shaft-300  text-justify ">
          {props.about}
           </div>
        </div>
        <Divider size="sm" my="md" mx="md"/>
        <div className="px-6 ">
          <div className="text-2xl font-semibold  ">Skills</div>
          <div className="flex flex-wrap mt-2 gap-2">
            {
              props.skills.map((skill, index) => (
                <div key={index} className="px-2 py-1 bg-mine-shaft-800 rounded-md text-bright-sun-400 hover:bg-mine-shaft-700">
                  {skill}
                </div>
              ))
            }
          </div>
        </div>
        <Divider size="sm" my="md" mx="md" />
      </div>
      <div className="px-6 ">
          <div className="text-2xl font-semibold  ">Experience</div>
          {profile.experience.map((exp, index) => (
            <ExpCard key={index} {...exp} />
          ))}
          </div>
    </div>
  );
};

export default Profile;
