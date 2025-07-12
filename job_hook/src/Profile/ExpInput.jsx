import { Textarea, Button } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import SelectInput from "./SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataProfile from "../Data/DataProfile";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../Slices/ProfileSlice";
import ProfileService from "../Services/ProfileService";

const ExpInput = ({ setEdit }) => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const select = DataProfile;

  const form = useForm({
    initialValues: {
      title: "",
      company: "",
      location: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const saveExperience = async () => {
    const newExperience = {
      title: form.values.title,
      company: form.values.company,
      location: form.values.location,
      description: form.values.description,
      startDate: form.values.startDate,
      endDate: form.values.endDate,
    };
    const updated = {
      ...profile,
      experiences: [...(profile.experiences || []), newExperience],
    };
    console.log("Updated profile to send:", updated);

    try {
      const result = await ProfileService.updateProfile(updated);
      dispatch(setProfile(result));
    } catch (err) {
      console.error("Error saving profile", err);
    }
  };

  return (
    <>
      <div>
        <div className="font-semibold mb-2">Edit Experience</div>
        <div className="flex gap-10 [&>*]:w-1/2 mb-2">
          <SelectInput {...select[0]} name="title" form={form} />
          <SelectInput {...select[1]} name="company" form={form} />
        </div>
        <SelectInput {...select[2]} name="location" form={form} />

        <Textarea
          label="Description"
          value={form.values.description}
          onChange={(e) =>
            form.setFieldValue("description", e.currentTarget.value)
          }
          placeholder="Enter description"
          autosize
          minRows={3}
          maxRows={6}
          className="mb-3"
        />

        <div className="flex gap-10 [&>*]:w-1/2 mb-3">
          <div>
            <label className="block mb-1 font-medium">Start Date</label>
            <DatePicker
              selected={form.values.startDate}
              onChange={(date) => form.setFieldValue("startDate", date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              placeholderText="Select start month"
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">End Date</label>
            <DatePicker
              selected={form.values.endDate}
              onChange={(date) => form.setFieldValue("endDate", date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              placeholderText="Select end month"
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <Button
          onClick={() => {
            saveExperience();
            setEdit(false);
          }}
          variant="outline"
          color="brightSun.4"
        >
          Save
        </Button>
        <Button onClick={() => setEdit(false)} color="red.8" variant="light">
          Cancel
        </Button>
      </div>
    </>
  );
};

export default ExpInput;
