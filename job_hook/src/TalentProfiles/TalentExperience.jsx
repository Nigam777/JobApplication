import { useSelector } from "react-redux";

import TalentExpCard from "./TalentExpCard";
const TalentExperience = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <div className="px-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-semibold">Experience</div>
      </div>

      {
        (profile.experiences || []).length > 0 ? (
          (profile.experiences || []).map((exp, index) => (
            <TalentExpCard key={index} {...exp} />  
          ))
        ) : (
            <div className="text-sm text-mine-shaft-300 my-5 text-justify">
              No experience added yet. Please add your experience.  
            </div>
        )
      }
    </div>
  );
};

export default TalentExperience;
