import React, { useEffect } from "react";
import ProfileService from "../Services/ProfileService";

import TalentProfileCard from "./TalentProfileCard";

const RecommendedProfile = () => {
  const [profiles, setProfiles] = React.useState([]);

  useEffect(() => {
    const FetchAllProfiles = async () => {
      try {
        const response = await ProfileService.getAllProfiles();
        setProfiles(response);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    FetchAllProfiles();
  }, []);

  console.log("Fetched Profiles:", profiles);

  return (
    <div>
      <div className="flex flex-col">
        <div className="text-2xl font-semibold mt-4 text-bright-sun-400">
          Recommended Profiles
        </div>
      </div>
      <div>
        {profiles && profiles.map((profile, index) => <TalentProfileCard {...profile} />)}
      </div>
    </div>
  );
};

export default RecommendedProfile;
