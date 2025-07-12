import React, { useEffect, useState } from "react";
import {
  IconBellHeart,
  IconCalendarMonth,
  IconClock,
} from "@tabler/icons-react";
import { Avatar, Button, Divider, Modal, ActionIcon } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { changeApplicantStatus } from "../Services/PostJobSerivce";
import ProfileService from "../Services/ProfileService";
import { notifications } from "@mantine/notifications";
import {openBase64PDFInNewTab} from "../Services/Utilis";
const InvitedCard = ({
  name,
  jobId,
  interviewTime,
  email,
  resume,
  personalWebsite,
}) => {
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState({});
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const interviewTimeStr = new Date(interviewTime).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

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
console.log("profile:", profile);

  const handleOffer = async (status) => {
    const interviewDetails = {
      id: Number(jobId),
      applicantId: user.id,
      applicationStatus: status,
      interviewTime: new Date(interviewTime).toISOString(),
    };
    console.log("Interview Details:", interviewDetails);

    try {
      await changeApplicantStatus(interviewDetails);

      notifications.show({
        title: "Success",
        message: "Job offer accepted",
        color: "green",
      });
      close();
      navigate("/profile-page");
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to change status",
        color: "red",
      });
      console.error("Failed to change status:", err);
    }
  };

  const handleAcceptance = () => {
    handleOffer("OFFER");
  };
  return (
    <div className="border border-slate-700 mt-8 p-6 flex flex-col gap-4 rounded-2xl bg-mine-shaft-900 w-96 hover:shadow-lg transition-shadow">
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

      <div className="flex items-center gap-2 text-sm text-mine-shaft-400 font-medium">
        <IconCalendarMonth className="w-5 h-5 text-bright-sun-400" />
        <span>Interview Date: {interviewTimeStr}</span>
      </div>

      <Divider size="xs" mx="md" className="bg-mine-shaft-700" />

      <div className="flex gap-3">
        <Button
          variant="outline"
          fullWidth
          color="brightSun.4"
          radius="xl"
          className="font-semibold"
          onClick={handleAcceptance}
        >
          Accept
        </Button>
        <Button
          variant="outline"
          fullWidth
          color="red.8"
          radius="xl"
          className="font-semibold"
        >
          Decline
        </Button>
      </div>

      <div>
        <Button
          variant="light"
          color="brightSun.4"
          fullWidth
          radius="xl"
          onClick={open}
          className="font-semibold mt-1"
        >
          View Application
        </Button>

        <Modal opened={opened} onClose={close} centered>
          <div className="flex flex-col gap-4 text-sm text-mine-shaft-300">
            <div>
              <strong>Email:</strong>&nbsp;
              {email ? (
                <a
                  className="text-bright-sun-400 hover:underline"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              ) : (
                <span>Not provided</span>
              )}
            </div>

            <div>
              <strong>Website:</strong>&nbsp;
              {personalWebsite ? (
                <a
                  className="text-bright-sun-400 hover:underline"
                  href={personalWebsite}
                  target="_blank"
                >
                  {personalWebsite}
                </a>
              ) : (
                <span>Not provided</span>
              )}
            </div>

            <div>
              <strong>Resume:</strong>&nbsp;
              {resume ? (
                <a
                  className="text-bright-sun-400 hover:underline"
                  target="_blank"
                  onClick={() => openBase64PDFInNewTab(resume)}
                >
                  View Resume
                </a>
              ) : (
                <span>Not provided</span>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default InvitedCard;
