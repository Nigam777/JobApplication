import React from "react";
import { TextInput, Avatar } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
// Ensure this path is correct

// Import image as a variable

const DreamJob = () => {
  return (
    <div className="flex justify-between items-center px-20 ">
      <div className="flex flex-col w-[45%]">
        <div className="text-8xl font-bold text-bright-sun-50">
          Find Your Dream <span className="text-bright-sun-400">Job</span>
        </div>
        <div className="tex-lg leading-tight font-bold text-bright-sun-50">
          Good Work,Good Life... Start Exploring Thousands of Jobs Every Day....
        </div>
        <div className="flex gap-5 mt-3">
          <TextInput
            className="bg-mine-shaft-900 rounded-lg p-1   px-4 text-zinc-50 [&_input]:text-zinc-50"
            label="Job Type"
            variant="unstyled"
            placeholder="Fulltime"
          />
          <TextInput
            className="bg-mine-shaft-900 rounded-lg p-1 text-zinc-50 [&_input]:text-zinc-50 px-4"
            label="Job Title"
            variant="unstyled"
            placeholder="Software engineer"
          />
          <div className="flex items-center justify-center bg-bright-sun-400 w-20 h-full rounded-lg text-mine-shaft-100">
            <IconSearch className="w-[85%] h-[85%] " stroke={1.5} />
          </div>
        </div>
      </div>
      <div className="w-[55%] flex items-center justify-center">
        <div className="ml-16  w-[35rem] ">
          {/* Use the imported image */}
          <img src="/Boy.png" alt="Boy" />
          <div className=" absolute  top-[56%] right-[7%] w-fit border-bright-sun-300 border rounded-lg backdrop-blur-md p-2">
            <div className="text-center mb-1 text-sm text-mine-shaft-100">
              10k+ got Job
            </div>
            <Avatar.Group>
              <Avatar src="image.png" />
              <Avatar src="image.png" />
              <Avatar src="image.png" />
              <Avatar>+5</Avatar>
            </Avatar.Group>
          </div>
          <div className=" border border-bright-sun-300 w-fit rounded-lg backdrop-blur-md p-2 absolute top-[40%] right-[35%] fl">
            <div className="flex gap- items-center">
              <div className="h-12 w-11 ">
                <img src="./netflix.png" alt="" />
              </div>
              <div className="text-mine-shaft-200 text-sm leading-3 ">
                <div>Software Developer</div>
                <div className="text-mine-shaft-200 text-xs">India</div>
              </div>
            </div>
            <div className="text-mine-shaft-200 text-xs flex gap-2 ml-4">
              <span>1 Day ago</span>
              <span>120 Applicants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamJob;
