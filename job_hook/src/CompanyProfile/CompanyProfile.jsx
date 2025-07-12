import React from "react";

import { Divider } from "@mantine/core";
import { Avatar } from "@mantine/core";
import { Tabs } from "@mantine/core";
import AboutCompany from "./AboutCompany";
import CompanyJobs from "./CompanyJobs";
import EmployeeCard from "./EmployeeCard";


const CompanyProfile = ({ ...props }) => {
  return (
    <div className="w-2/3 mt-3 px-4 ">
      <div className="relative">
        <img className="rounded-t-2xl" src="../Profile/banner.png" alt="" />
        <img
          className="rounded-full w-36 h-36 absolute  left-5  top-20       border-mine-shaft-900 border-4 bg-mine-shaft-950 border-mine-shaft-950"
          src="./Icons/Google.png"
          alt=""
        />

        <div className="px-6 mt-12 flex justify-between">
          <div className="text-3xl font-semibold flex-1  flex-col items-center ">
            <div>{props.Name}</div>

            {props.Industry}
          </div>
          <div className="">
            <Avatar.Group>
              <Avatar src="image.png" />
              <Avatar src="image.png" />
              <Avatar src="image.png" />
              <Avatar>+15k</Avatar>
            </Avatar.Group>
          </div>
        </div>
        <Divider size="sm" my="md" mx="md" />
        <div className="px-4">
          <Tabs radius="lg" defaultValue="About" variant="outline">
            <Tabs.List className="[&_button]:text-xl font-semibold  [&_button[data-active='true']]:text-bright-sun-400   ">
              <Tabs.Tab value="About">About</Tabs.Tab>
              <Tabs.Tab value="Job">Job</Tabs.Tab>
              <Tabs.Tab value="Employees">Employee</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="About"><AboutCompany/></Tabs.Panel>
            <Tabs.Panel value="Job"><CompanyJobs/></Tabs.Panel>
            <Tabs.Panel value="Employees"><EmployeeCard/></Tabs.Panel>
          </Tabs>
        </div>
        
      </div>
      
    </div>
  );
};

export default CompanyProfile;
