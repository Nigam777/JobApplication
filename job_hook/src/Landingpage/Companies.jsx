import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { companies } from "../Data/Data";

const Companies = () => {
  const [direction, setDirection] = useState("left");
  const [fade, setFade] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      // Step 1: Start fade-out effect
      setFade(0);

      setTimeout(() => {
        // Step 2: Reverse the direction after fade-out
        setDirection((prev) => (prev === "left" ? "right" : "left"));

        // Step 3: Fade in after direction change
        setTimeout(() => setFade(1), 30);
      },200);
    },10000); // Adjust interval timing as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-20 pb-5">
      <div className="text-mine-shaft-100 text-4xl font-medium text-center underline decoration-bright-sun-400 text-underline-offset-4">
        Trusted By <span className="text-bright-sun-400">1k+</span> Companies
      </div>
      <div
        className="transition-opacity duration-500"
        style={{ opacity: fade }}
      >
        <Marquee speed={30} pauseOnHover gradient={false} direction={direction}>
          {companies.map((company, index) => (
            <div
              key={index}
              className="mt-8 mx-8 px-2 py-1 bg-mine-shaft-950 rounded-lg hover:bg-mine-shaft-800 cursor-pointer"
            >
              <img
                className="w-40 h-20"
                src={`./CompaniesImage/${company}.png`}
                alt={company}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Companies;
