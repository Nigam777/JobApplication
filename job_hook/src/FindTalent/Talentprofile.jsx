import React from "react";
import { Divider, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import { profile } from "../Data/TalentData";
import Profile from "./Profile";
import RecommendentTalents from "./RecommendentTalents";

const Talentprofile = () => {
  return (
    <>
      <div>
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
          <Divider size="sm" mx="md" />
          <Link className="p-4 mr-6 inline-block" to={"/find-talent"}>
            <Button
              leftSection={<IconArrowLeft />}
              variant="outline"
              color="yellow"
            >
              {" "}
              Back
            </Button>
          </Link>

          <Divider size="sm" mx="md" />
          <div className="flex "> 
          <Profile  {...profile}/>
          <RecommendentTalents/>
        </div>
        </div>
        
      </div>
    </>
  );
};

export default Talentprofile;
 