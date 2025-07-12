import React from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import { jobCategory } from "../Data/Data";
const JobCategory = () => {
  return (
    <>
      <div className="text-4xl text-center text-mine-shaft-100 mt-20">
        Browse <span className="text-bright-sun-400">Job</span> Category
      </div>
      <div className="mt-2 text-center text-mine-shaft-100">
        Explore Diverse Job Opportunities Tailored to Your Skills. Start Your
        Career Journey Today!
      </div>

      <Carousel
        nextControlIcon={<IconArrowRight className="h-8 w-8" />}
        previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
        slideSize="22%"
        slideGap="md"
        loop
        className=" mt-10 [&_button]:focus-visible[&_button]:!outline-none [&_button]:hover:opacity-75 [&_button]:opacity-0  hover:[&_button]:opacity-100  [&_button]:bg-bright-sun-400 hover:[&_button]:bg-bright-sun-300 "
        styles={{
          control: {
            top: "60%", // Centers controls vertically
            color: "black",
            borderRadius: "50%",
            borderColor: "gold",
          },
        }}
      >
        {jobCategory.map((Category, index) => (
          <Carousel.Slide key={index}>
            <div className="flex flex-col items-center w-64 mt-5 gap-2 border rounded-xl p-5 border-bright-sun-500 hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 transition duration-500 ease-in-out hover:!shadow-bright-sun-300">
              <div className="p-2 bg-bright-sun-300 rounded-full">
                <img
                  className="h-8 w-8"
                  src={`/CategoryOfJobs/${Category.name}.png`}
                  alt={Category.name}
                />
              </div>
              <div className="font-semibold text-xl text-mine-shaft-200">
                {Category.name}
              </div>
              <div className="text-mine-shaft-100 text-center text-sm">
                {Category.desc}
              </div>
              <div className="text-bright-sun-300 text-center text-sm">
                {Category.jobs}
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
};

export default JobCategory;
