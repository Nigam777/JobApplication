import React, { useState } from "react";
import {
  Button,
  Divider,
  FileInput,
  NumberInput,
  TextInput,
  Textarea,
  LoadingOverlay,
} from "@mantine/core";
import { IconPaperclip } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { isNotEmpty, useForm } from "@mantine/form";
import { getBase64, formatDate } from "../Services/Utilis";
import { applyJob } from "../Services/PostJobSerivce";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const ApplyJobComp = ({ company, jobTitle, postTime, applicants }) => {
  const id = useParams().id;
  const [preview, setPreview] = useState(false); // initially editable
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const user=useSelector((state) => state.user);
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      fullName: "",
      email: "",
      mobileNo: "",
      personalWebsite: "",
      resume: null,
      coverLetter: "",
    },
    validate: {
      fullName: isNotEmpty("Full Name is required"),
      email: isNotEmpty("Email is required"),
      mobileNo: isNotEmpty("Mobile Number is required"),
      personalWebsite: isNotEmpty("Personal Website is required"),
      resume: isNotEmpty("Resume is required"),
      coverLetter: isNotEmpty("Cover Letter is required"),
    },
  });

  const handlePreviewToggle = () => {
    const isValid = form.validate();
    if (isValid.hasErrors) {
      notifications.show({
        title: "Validation Error",
        message: "Please fill all required fields before previewing.",
        color: "red",
      });
      return;
    }
    setPreview(true);
    notifications.show({
      title: "Preview Mode",
      message: "Fields are now read-only. Click Edit to make changes.",
      color: "blue",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditToggle = () => {
    setPreview(false);
    notifications.show({
      title: "Edit Mode",
      message: "You can now edit the form again.",
      color: "yellow",
    });
  };

  const handleSubmit = async () => {
    const isValid = form.validate();
    if (!isValid.hasErrors) {
      setSubmit(true);
      let resume = await getBase64(form.values.resume);
      let applicants = {
        id:user.id, 
        name: form.values.fullName,
        email: form.values.email,
        phone: Number(form.values.mobileNo),
        website: form.values.personalWebsite,
        resume: resume,
        coverletter: form.values.coverLetter,
        timestamp: new Date().toISOString(),
        applicationStatus: "PENDING",
      };
     {
      console.log("user id is",user.id);
      
     }
      
      applyJob(id, applicants)
        .then((data) => {
          setSubmit(false);
          notifications.show({
            title: "Success",
            message: "Application submitted successfully!",
            color: "green",
          });
        })
        .catch((error) => {
          setSubmit(false);
          notifications.show({
            title: "Error",
            message: "Failed to submit application. Please try again.",
            color: "red",
          });
        });

      notifications.show({
        title: "Success",
        message: "Application submitted successfully!",
        color: "green",
      });

      setTimeout(() => {
        setSubmit(false);
        
      }, 2000);
    }
  };

  return (
    <div className="w-2/3 mx-auto p-5 rounded-xl relative">
      <LoadingOverlay
        className="!fixed"
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "#FDCB58", type: "bars" }}
      />

      <div className="flex justify-between mb-5">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-xl">
            <img src={`../Icons/${company}.png`} alt="" className="h-9 w-9" />
          </div>
          <div>
            <div className="font-semibold text-2xl">{jobTitle}</div>
            <div className="text-lg text-mine-shaft-300">
              {company} &bull; {formatDate(postTime)} &bull;{" "}
              {applicants?.length || 0} Applications
            </div>
          </div>
        </div>
      </div>

      <Divider my="xl" />
      <div className="text-xl font-semibold mb-4">Submit Your Application</div>

      <div>
        <div className="mt-2 flex gap-10 [&>*]:w-1/2">
          <TextInput
            disabled={preview}
            label="Full Name"
            placeholder="Full Name"
            withAsterisk
            {...form.getInputProps("fullName")}
          />
          <TextInput
            disabled={preview}
            label="Email"
            placeholder="Email"
            withAsterisk
            {...form.getInputProps("email")}
          />
        </div>

        <div className="mt-2 flex gap-10 [&>*]:w-1/2">
          <NumberInput
            disabled={preview}
            hideControls
            label="Mobile No"
            placeholder="Enter Mobile No"
            withAsterisk
            {...form.getInputProps("mobileNo")}
          />
          <TextInput
            disabled={preview}
            label="Personal Website"
            placeholder="Enter URL"
            withAsterisk
            {...form.getInputProps("personalWebsite")}
          />
        </div>

        <div className="mt-2">
          <FileInput
            disabled={preview}
            label="Resume"
            placeholder="Upload Resume"
            withAsterisk
            leftSection={<IconPaperclip stroke={2} />}
            {...form.getInputProps("resume")}
          />
        </div>

        <Textarea
          disabled={preview}
          className={`${preview ? "!text-mine-shaft-300" : ""}`}
          label="Cover Letter"
          placeholder="Cover Letter"
          withAsterisk
          autosize
          minRows={5}
          {...form.getInputProps("coverLetter")}
        />

        <Divider my="xl" />

        {/* Conditional Buttons */}
        {!preview ? (
          <Button
            variant="filled"
            color="brightSun.4"
            fullWidth
            onClick={handlePreviewToggle}
          >
            Preview
          </Button>
        ) : (
          <div className="flex gap-4">
            <Button
              variant="outline"
              color="brightSun.4"
              fullWidth
              onClick={handleEditToggle}
            >
              Edit
            </Button>
            <Button
              variant="filled"
              color="brightSun.4"
              fullWidth
              onClick={handleSubmit}
              disabled={submit}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyJobComp;
