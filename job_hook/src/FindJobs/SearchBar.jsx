import React, { useEffect } from "react";
import MultiInput from "./MultiInput";
import { dropdownData } from "../Data/JobsData";
import { Divider, RangeSlider } from "@mantine/core";
import Jobs from "./Jobs";

const SearchBar = () => {
  const [value, setValue] = React.useState([1, 100]);
  useEffect(()=>{
console.log("SearchBar");
  },[])

  return (
    <>
      <div className="flex px-5 py-6">
        {dropdownData.map((item, index) => (
          <React.Fragment key={index}>
            <div className="w-1/5">
              <MultiInput {...item} />
            </div>
            <Divider size="sm" mx="md" orientation="vertical" />
          </React.Fragment>
        ))}
        <div className="w-1/5 [&_.mantine-Slider-label]:!border   [&_.mantine-Slider-label]:translate-y-11 [&_.mantine-Slider-label]:!bg-bright-sun-300  [&_.mantine-Slider-label]:!text-black text-bright-sun-300">
          <div className="flex justify-between ">
            <div>Salary</div>
            <div>
              &#8377;{value[0]}L - &#8377;{value[1]}L
            </div>
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
    </>
  );
};

export default SearchBar;
