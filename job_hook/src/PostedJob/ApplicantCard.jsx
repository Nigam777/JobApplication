import React, { useEffect, useState } from "react";
import {
  IconBellHeart,
  IconCalendarMonth,
  IconClock,
} from "@tabler/icons-react";
import { Avatar, Button, Divider, Modal, ActionIcon } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { changeApplicantStatus } from "../Services/PostJobSerivce";
import ProfileService from "../Services/ProfileService";
import { notifications } from "@mantine/notifications";


const ApplicantCard = ({ name, expectedCtc, location, jobId }) => {
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState({});
  const [time, setTime] = useState("");
  const [date, setDate] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await ProfileService.getProfile(user.id);
        setProfile(profile);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [user.id]);

 
/*******  819bd65b-46e8-4f05-979e-98e13dcdf65a  *******/
  const handleOffer = async (status) => {
    if (!date || !time) {
      console.log("Missing date or time", { date, time });
    }

    const [hours, minutes] = time.split(":").map(Number);
    const interviewTime = new Date(date);
    interviewTime.setHours(hours, minutes);
    console.log("Interview Time:", interviewTime);

    const interviewDetails = {
      id: Number(jobId),
      applicantId: user.id,
      applicationStatus: status,
      interviewTime: interviewTime.toISOString(),
    };

    try {
      await changeApplicantStatus(interviewDetails);
  
      notifications.show({
        title: "Success",
        message: "Interview scheduled successfully",
        color: "green",
      });
      close();
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to change status",
        color: "red",
      });
      console.error("Failed to change status:", err);
    }
  };

  const handleSchedule = () => {
    
    handleOffer("INTERVIEWING");
  };

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray">
      <IconClock size={16} stroke={1.5} />
    </ActionIcon>
  );

  return (
    <div className="border border-slate-700 p-6 flex flex-col gap-4 rounded-2xl bg-mine-shaft-900 w-96 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Avatar
            src={`/Boy.png`}
            alt=""
            className="rounded-full ring-2 ring-bright-sun-400"
            size="lg"
          />
          <div>
            <div className="font-semibold text-base text-white">
              {profile.fullName || name || "Applicant"}
            </div>
            <div className="text-xs text-mine-shaft-300">
              {profile.jobTitle} • {profile.company}
            </div>
          </div>
        </div>
        <IconBellHeart className="w-5 h-5 text-bright-sun-400 cursor-pointer" />
      </div>

      {profile.skills?.length > 0 && (
        <div className="flex gap-2 flex-wrap text-xs">
          {profile.skills.slice(0, 6).map((skill, idx) => (
            <div
              key={idx}
              className="px-2 py-[6px] bg-mine-shaft-800 rounded-full text-bright-sun-400 font-medium"
            >
              {skill}
            </div>
          ))}
        </div>
      )}

      <div
        className="text-sm ml-1 text-mine-shaft-300 overflow-hidden line-clamp-3"
        style={{ WebkitLineClamp: 3 }}
      >
        {profile.about || "No description provided."}
      </div>

      <Divider size="md" mx="md" className="bg-mine-shaft-700" />

      <div className="flex justify-between text-xs text-mine-shaft-400 font-medium">
        <span>{expectedCtc || "CTC not mentioned"}</span>
        <span>{profile.location || location || "Location not specified"}</span>
      </div>

      <Divider size="xs" mx="md" className="bg-mine-shaft-700" />

      <div className="flex gap-3">
        <Link to={`/profile-page`} className="w-1/2">
          <Button
            variant="outline"
            fullWidth
            color="brightSun.4"
            radius="xl"
            className="font-semibold"
          >
            Profile
          </Button>
        </Link>
        <div className="w-1/2">
          <Button
            onClick={open}
            rightSection={<IconCalendarMonth className="w-5 h-5" />}
            variant="light"
            fullWidth
            radius="xl"
            color="brightSun.4"
            className="font-semibold"
          >
            Schedule
          </Button>

          <Modal
            opened={opened}
            onClose={close}
            title="Schedule Interview"
            centered
          >
            <div className="flex flex-col gap-4">
              <DateInput
                value={date}
                onChange={setDate}
                minDate={new Date()}
                label="Date"
                placeholder="Pick a date"
                className="w-full"
              />
              <TimeInput
                value={time}
                onChange={(event) => setTime(event.currentTarget.value)}
                label="Time"
                placeholder="Pick a time"
                rightSection={pickerControl}
              />
              <Button onClick={handleSchedule} color="brightSun.4">
                Confirm
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;
