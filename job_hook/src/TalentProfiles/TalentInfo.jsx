import React, { useEffect, useState } from "react";
import { ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconDeviceFloppy,
  IconPencil,
  IconBriefcase,
  IconMapPin,
} from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import ProfileService from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import { useParams } from "react-router-dom";

const TalentInfo = () => {
  const ProfileData = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [profile, setProfile] = React.useState({});
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!id) return;

        const fetched = await ProfileService.getProfile(id);
        setProfile(fetched);
        dispatch(setProfile(fetched));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [dispatch, user]);

  return (
    <>
      <img className="rounded-t-2xl" src="../Profile/banner.png" alt="" />
      <img
        className="rounded-full w-40 h-40 absolute top-[10%] left-5 border-mine-shaft-900 border-4"
        src="./Working/avatar1.png"
        alt=""
      />
      <div className="px-6 mt-16">
        <div className="text-3xl font-semibold flex justify-between">
          {profile.name}
        </div>

        <>
          <div className="text-xl flex gap-1 items-center">
            <IconBriefcase className="w-4 h-4 text-bright-sun-400" />
            {ProfileData.jobTitle || "-"} • {ProfileData.company || "-"}
          </div>
          <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
            <IconMapPin className="w-4 h-4 text-bright-sun-300" />
            {ProfileData.location || "-"}
          </div>
        </>
      </div>
    </>
  );
};

export default TalentInfo;
