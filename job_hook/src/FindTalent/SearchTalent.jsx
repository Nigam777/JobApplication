import React from "react";
import TalentMultiInput from "./TalentMultiInput";
import { TalentData } from "../Data/Talent";
import { Divider, RangeSlider } from "@mantine/core";

const SearchTalent = () => {
  const [value, setValue] = React.useState([1, 100]);

  return (
    <div className="flex px-6 py-7">
      {TalentData.map((item, index) => (
        <React.Fragment key={index}>
          <div className="w-1/5">
            <TalentMultiInput {...item} />
          </div>
          {index !== TalentData.length - 1 && ( // Prevent extra divider at the end
            <Divider size="sm" mx="md" orientation="vertical" />
          )}
        </React.Fragment>
      ))}

      {/* Salary Section */}
      <div className="w-1/5 pl-5">
        <div className="flex justify-between mb-2">
          <span>Salary</span>
          <span>&#8377;{value[0]}L - &#8377;{value[1]}L</span>
        </div>
        <RangeSlider
          value={value}
          onChange={setValue}
          color="gold"
          size="sm"
          labelTransitionProps={{
            transition: "skew-down",
            transitionTimingFunction: "ease-in-out",
            transitionDuration: 400,
            timingFunction: "linear",
          }}
        />
      </div>
    </div>
  );
};

export default SearchTalent;
