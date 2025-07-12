import { useEffect, useState } from "react";
import {
  IconMapPin,
  IconBriefcase,
  IconPremiumRights,
  IconRecharging,
} from "@tabler/icons-react";
import { ActionIcon, Button, Divider } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";
import { getJobById } from "../Services/PostJobSerivce";
import { formatDate } from "../Services/Utilis";

const JobOverview = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(false);
    setJob(null);

    getJobById(id)
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setJob(data);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching job details:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (job?.applicants?.some((applicant) => applicant.id === user.id)) {
      setApplied(true);
    } else {
      setApplied(false);
    }
  }, [job, user.id]);

  const sanitizedDesc = DOMPurify.sanitize(job?.description || "");

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center text-2xl text-mine-shaft-400  min-h-[350px]">
         Loading job details...
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="w-full flex justify-center items-center text-2xl text-mine-shaft-400  min-h-[350px]">
        No Job Found 
      </div>
    );
  }

  const card = [
    { name: "Location", icon: IconMapPin, value: job.location },
    { name: "Experience", icon: IconBriefcase, value: job.experience },
    {
      name: "Salary",
      icon: IconPremiumRights,
      value: job.packageOffered
        ? `₹ ${job.packageOffered} LPA`
        : "Not Disclosed",
    },
    { name: "Job Type", icon: IconRecharging, value: job.jobType },
  ];

  return (
    <div className="w-full mt-5 px-8">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-xl">
            <img
              src={`../Icons/${job.company}.png`}
              alt=""
              className="h-9 w-9"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-semibold text-mine-shaft-100 mb-1">
              {job.jobTitle}
            </div>
            <div className="text-mine-shaft-300 text-base leading-relaxed">
              <span className="font-medium">{job.company}</span>
              <span className="mx-2 text-mine-shaft-500">•</span>
              <span>{formatDate(job.postTime)}</span>
              <span className="mx-2 text-mine-shaft-500">•</span>
              <span>{job.applicants?.length || 0} Applications</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Button className="mt-2" color="brightSun.4" variant="light">
            Edit
          </Button>
          <Button color="brightSun.4" variant="light">
            Delete
          </Button>
        </div>
      </div>

      <Divider my="xl" />

      <div className="flex justify-between flex-wrap gap-6">
        {card.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1">
            <ActionIcon
              className="!h-12 !w-12"
              color="brightSun.4"
              variant="light"
              radius="xl"
            >
              <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-mine-shaft-300 text-sm">{item.name}</div>
            <div className="font-semibold text-mine-shaft-300">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <Divider my="md" />

      <div>
        <div className="text-2xl font-semibold">Required Skills</div>
        <div className="flex flex-wrap gap-2 mt-5">
          {(job.skillsRequired ?? []).map((skill, idx) => (
            <ActionIcon
              key={idx}
              className="!h-fit !w-fit"
              color="brightSun.4"
              p="xs"
              variant="light"
              radius="xl"
            >
              {skill}
            </ActionIcon>
          ))}
        </div>
      </div>

      <Divider my="xl" />

      <div
        className="[&_h4]:text-xl [&_h4]:my-4 [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_h4]:font-semibold [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1"
        dangerouslySetInnerHTML={{ __html: sanitizedDesc }}
      />

      <Divider my="md" />

      <div>
        <div className="text-2xl font-semibold mb-3">About Company</div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-mine-shaft-800 rounded-xl">
              <img
                src={`../Icons/${job.company}.png`}
                alt=""
                className="h-9 w-9"
              />
            </div>
            <div>
              <div className="font-semibold text-2xl">{job.company}</div>
              <div className="font-semibold text-mine-shaft-300 text-sm">
                10k Employees
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Link to="/Apply-Job">
              <Button size="sm" variant="light" color="brightSun.4">
                Company Page
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOverview;
