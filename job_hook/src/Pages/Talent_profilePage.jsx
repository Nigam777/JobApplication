import React from "react";
import TalentProfile from "../TalentProfiles/TalentProfile";
import RecommendedProfile from "../TalentProfiles/RecommendedProfile";

const Talent_profilePage = () => {
  return (
    <div className="flex">
      <div className="flex ">
        <TalentProfile />
    
        <RecommendedProfile />
      </div>
    </div>
  );
};

export default Talent_profilePage;
