import React, { useEffect, useState } from "react";
import { ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconDeviceFloppy,
  IconPencil,
  IconBriefcase,
  IconMapPin,
} from "@tabler/icons-react";
import DataProfile from "../Data/DataProfile";
import SelectInput from "./SelectInput";
import { useSelector, useDispatch } from "react-redux";
import ProfileService from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import { useParams } from "react-router-dom";

const Info = () => {
  const ProfileData = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);

  const form = useForm({
    initialValues: {
      jobTitle: "",
      company: "",
      location: "",
    },
  });

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

  useEffect(() => {
    form.setValues({
      jobTitle: ProfileData.jobTitle || "",
      company: ProfileData.company || "",
      location: ProfileData.location || "",
    });
  }, [ProfileData]);

  const handleClick = async () => {
    if (!edit) {
      setEdit(true);
    } else {
      try {
        const updated = {
          id: ProfileData.id || user?.id,
          ...form.getValues(),
        };

        const updatedProfile = await ProfileService.updateProfile(updated);
        dispatch(setProfile(updatedProfile));
        setEdit(false);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
    <>
      <img className="rounded-t-2xl" src="../Profile/banner.png" alt="" />
      <img
        className="rounded-full w-48 h-48 absolute top-16 left-5 border-mine-shaft-900 border-4"
        src="./Working/avatar1.png"
        alt=""
      />
      <div className="px-6 mt-16">
        <div className="text-3xl font-semibold flex justify-between">
          {profile.name}
          <ActionIcon
            onClick={handleClick}
            color="brightSun.4"
            variant="subtle"
            className="ml-2"
          >
            {edit ? (
              <IconDeviceFloppy className="w-5 h-5 " />
            ) : (
              <IconPencil className="w-5 h-5 " />
            )}
          </ActionIcon>
        </div>

        {edit ? (
          <div className="flex gap-10 [&>*]:w-1/2 ">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
            <SelectInput form={form} name="location" {...select[2]} />
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default Info;
