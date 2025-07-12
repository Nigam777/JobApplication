import { Tabs, Badge } from "@mantine/core";
import JobOverview from "./JobOverview";
import ApplicantCard from "./ApplicantCard";
import { useParams } from "react-router-dom";
import InvitedCard from "./InvitedCard";

const PostedJobDesc = ({ job }) => {
  
  const { jobId } = useParams(); 
  const appliedApplicants = (job.applicants || []).filter(
    (applicant) => applicant.applicationStatus === "APPLIED"
  );
  const invitedApplicants = (job.applicants || []).filter(
    (applicant) => applicant.applicationStatus === "INTERVIEWING"
  );
  const offeredApplicants = (job.applicants || []).filter(
    (applicant) => applicant.applicationStatus ==="OFFERED"
  );

  return (
    <div className="mt-16">
      <div>
        <div className="flex gap-3 items-center">
          <div className="text-2xl font-semibold gap-3 flex items-center">
            {job.jobTitle || "Job Title"}
          </div>
          <div>
            <Badge color="brightSun.4" variant="outline" size="md">
              {job.jobStatus || "Status"}
            </Badge>
          </div>
        </div>
        <div className="font=medium text-mine-shaft-300 mb-5">
          {job.company || "Company Name"} - {job.location || "Location"}
        </div>
      </div>

      <div>
        <Tabs radius="lg" defaultValue="overview" variant="outline">
          <Tabs.List className="[&_button]:text-xl font-semibold  [&_button[data-active='true']]:text-bright-sun-400">
            <Tabs.Tab value="overview" className="[&>div]:w-full">
              Overview
            </Tabs.Tab>
            <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
            <Tabs.Tab value="invited">Invited</Tabs.Tab>
            <Tabs.Tab value="offered">OFFERED</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview">
            <JobOverview />
          </Tabs.Panel>

          <Tabs.Panel value="applicants" className="flex flex-wrap gap-4 mt-4 ">
            {appliedApplicants.length > 0 ? (
              appliedApplicants.map((applicant, index) => (
                <ApplicantCard key={index} {...applicant}  jobId={job.id}/>
              ))
            ) : (
              <div className="w-full flex justify-center items-center text-2xl text-mine-shaft-400  min-h-[350px]">
                No applicants yet.
              </div>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="invited">
           {
            invitedApplicants.length > 0 ? (
              invitedApplicants.map((applicant, index) => (
                <InvitedCard key={index} {...applicant}  jobId={job.id}/>
              ))
            ) : (
              <div className="w-full flex justify-center items-center text-2xl text-mine-shaft-400  min-h-[350px]">
                No invited applicants yet.
              </div>
            )
           }
          </Tabs.Panel>
          <Tabs.Panel value="offered">
           {
            offeredApplicants.length > 0 ? (
              invitedApplicants.map((applicant, index) => (
                <InvitedCard key={index} {...applicant}  jobId={job.id}/>
              ))
            ) : (
              <div className="w-full flex justify-center items-center text-2xl text-mine-shaft-400  min-h-[350px]">
                No invited applicants yet.
              </div>
            )
           }
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default PostedJobDesc;
