import React, { useEffect, useState } from "react";
import { ActionIcon, Divider, TagsInput, Textarea } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import ProfileService from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import TalentExperience from "./TalentExperience";
import TalentInfo from "./TalentInfo";

const TalentProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const [edit, setEdit] = useState([false, false]);
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    if (user && user.id) {
      console.log("user id is --:", user.id);
      ProfileService.getProfile(user.id)
        .then((data) => {
          dispatch(setProfile(data));
          setAboutText(data.about || "");
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, []);

  

  return (
    <div className="w-4/6 mt-3 px-4">
      <div className="relative">
        <TalentInfo />

        <Divider size="sm" my="md" mx="md" />

        {/* About Section */}
        <div className="px-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-semibold">About</div>
          </div>
          {
            <div className="text-sm text-mine-shaft-300 my-5 text-justify">
              {profile.about || "Add your about section........."}
            </div>
          }
        </div>

        <Divider size="sm" my="md" mx="md" />

        {/* Skills Section */}
        <div className="px-6">
          <div className="flex justify-between items-center my-4">
            <div className="text-2xl font-semibold">Skills</div>
          </div>

          <div className="flex flex-wrap mt-2 gap-2">
            {profile.skills?.map((skill, i) => (
              <div
                key={i}
                className="px-2 py-1 bg-mine-shaft-800 rounded-md text-bright-sun-400 hover:bg-mine-shaft-700"
              >
                {skill || "Add Your Skills........."}
              </div>
            ))}
          </div>
        </div>

        <Divider size="sm" my="md" mx="md" />
        <TalentExperience />
      </div>
    </div>
  );
};

export default TalentProfile;
