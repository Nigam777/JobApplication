import React, { useEffect, useState } from "react";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import { ActionIcon, Divider, TagsInput, Textarea } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import ProfileService from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import Info from "./Info";

import Experience from "./Experience";

const Profile = () => {
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

  const toggleEdit = (index) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  };

  const saveAbout = async () => {
    const updated = { ...profile, about: aboutText };
    const result = await ProfileService.updateProfile(updated);
    dispatch(setProfile(result));
    toggleEdit(0);
  };

  const saveSkills = async () => {
    const updated = { ...profile, skills: profile.skills || [] };
    const result = await ProfileService.updateProfile(updated);
    dispatch(setProfile(result));
    toggleEdit(1);
  };

  return (
    <div className="w-2/3 mt-3 px-4">
      <div className="relative">
        <Info />

        <Divider size="sm" my="md" mx="md" />

        {/* About Section */}
        <div className="px-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-semibold">About</div>
            <ActionIcon
              onClick={() => (edit[0] ? saveAbout() : toggleEdit(0))}
              color="brightSun.4"
              variant="subtle"
            >
              {edit[0] ? (
                <IconDeviceFloppy className="w-5 h-5" />
              ) : (
                <IconPencil className="w-5 h-5" />
              )}
            </ActionIcon>
          </div>
          {edit[0] ? (
            <Textarea
              className="mt-2"
              placeholder="Your about section"
              value={aboutText}
              autosize
              minRows={3}
              onChange={(e) => setAboutText(e.currentTarget.value)}
            />
          ) : (
            <div className="text-sm text-mine-shaft-300 my-5 text-justify">
              {profile.about || "Add your about section........."}
            </div>
          )}
        </div>

        <Divider size="sm" my="md" mx="md" />

        {/* Skills Section */}
        <div className="px-6">
          <div className="flex justify-between items-center my-4">
            <div className="text-2xl font-semibold">Skills</div>
            <ActionIcon
              onClick={() => (edit[1] ? saveSkills() : toggleEdit(1))}
              color="brightSun.4"
              variant="subtle"
            >
              {edit[1] ? (
                <IconDeviceFloppy className="w-5 h-5" />
              ) : (
                <IconPencil className="w-5 h-5" />
              )}
            </ActionIcon>
          </div>
          {edit[1] ? (
            <TagsInput
              className="mt-2"
              placeholder="Your skills"
              value={profile.skills || []}
              onChange={(skills) =>
                dispatch(setProfile({ ...profile, skills }))
              }
            />
          ) : (
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
          )}
        </div>

        <Divider size="sm" my="md" mx="md" />
        <Experience />
      </div>
    </div>
  );
};

export default Profile;
