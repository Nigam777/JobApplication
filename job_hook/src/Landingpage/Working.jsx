import React from "react";
import { work } from "../Data/Data";
import { Avatar } from "@mantine/core";

const Working = () => {
  return (
    <>
      <div className="mt-36 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-semibold text-mine-shaft-100">
          How it <span className="text-bright-sun-400">Works</span>
        </h2>
        <p className="mt-10 text-lg text-mine-shaft-100 leading-relaxed">
          Our job portal intelligently matches candidates with the right jobs
          based on their skills and experience. It simplifies job searches for
          candidates and helps employers find the best talent effortlessly.
        </p>
      </div>
      <div className="flex gap-6  px-16 justify-between items-center">
        <div>
          <img className="w-[35rem]" src="/Working/Girl.png" alt="" />
          <div>
            <div className="absolute w-40  left-[30%] top-[240%] backdrop-blur-xl flex flex-col items-center  text-center  text-lg gap-1 border rounded-lg p-2 ">
              <Avatar className=" !h-16 !w-16" src="/Working/avatar1.png" />
              <div className="text-mine-shaft-100">Complete Your Profile</div>
              <div className="text-bright-sun-400">50% Complete </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {work.map((item, index) => (
            <div key={index} className="flex gap-4 items-center">
              {/* Step Icon */}
              <div className="bg-bright-sun-400 w-20 h-20 rounded-full flex items-center justify-center">
                <img
                  className="w-14 h-14"
                  src={`/Working/${item.name}.png`} // ✅ Fixed syntax
                  alt={item.title}
                />
              </div>
              {/* Step Details */}
              <div>
                <div className="text-mine-shaft-100 font-semibold text-lg">
                  {item.src}
                </div>
                <div className="text-mine-shaft-400 text-sm">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Working;
