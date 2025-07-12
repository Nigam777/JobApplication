import React from "react";
import { companyData } from "../Data/Company";

const AboutCompany = () => {
  return (
    <div className="mt-4">
      {Object.keys(companyData)
        .filter((key) => key !== "Name")
        .map((key, index) => (
          <div key={index} className="mb-4">
            <div className="font-semibold text-xl text-mi mb-3">{key}:</div>
            {key !== "Website" && ( 
              <div className="text-mine-shaft-400">
                {key !== "Specialties"
                  ? companyData[key]
                  : companyData[key].join(" , ")}
              </div>
            )}
            {key === "Website" && (
              <a
                href={companyData[key]}
                className="text-bright-sun-400 text-sm text-justify"
              >
                {companyData[key]}
              </a>
            )}
          </div>
        ))}
    </div>
  );
};

export default AboutCompany;

