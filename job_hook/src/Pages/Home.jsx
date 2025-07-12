import React from "react";

import DreamJob from "../Landingpage/DreamJob";
import Companies from "../Landingpage/Companies";
import JobCategory from "../Landingpage/JobCategory";
import Working from "../Landingpage/Working";
import Testimonial from "../Landingpage/Testimonial";
import Subscribe from "../Landingpage/Subscribe";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <>
      <div className="min-h-[300vh] bg-mine-shaft-950 font-['poppins']">
        <DreamJob />
        <Companies />
        <JobCategory />
        <Working />
        <Testimonial />
        <Subscribe />
        <Footer />
      </div>
    </>
  );
};

export default Home;
