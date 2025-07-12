import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Anchor,
  Radio,
  Group,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import UserServices from "../Services/UserService";

import { setUser } from "../Slices/UserSlices";
import { setItem } from "../Services/LocalStorage";


const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT",
    termsAccepted: false,
  });

  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: "",
  });

  const emailRegex =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)([a-zA-Z0-9._%+-]{1,64})@([a-zA-Z0-9.-]{1,255})\.([a-zA-Z]{2,})$/;

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length < 2
          ? "Name must be at least 2 characters long"
          : "";
      case "email":
        return !emailRegex.test(value) ? "Enter a valid email" : "";
      case "password":
        if (value.length < 8)
          return "Password must be at least 8 characters long";
        if (!/[A-Z]/.test(value))
          return "Password must include an uppercase letter";
        if (!/[a-z]/.test(value))
          return "Password must include a lowercase letter";
        if (!/[0-9]/.test(value)) return "Password must include a number";
        if (!/[!@#$%^&*]/.test(value))
          return "Password must include a special character";
        return "";
      case "confirmPassword":
        return value !== formData.password ? "Passwords do not match" : "";
      case "termsAccepted":
        return value ? "" : "You must accept the terms & conditions";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setFormError((prev) => ({
      ...prev,
      [name]: validateField(name, newValue),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    const emptyFields = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "accountType" && (!value || value === "")) {
        emptyFields.push(key);
      }
    });

    if (emptyFields.length > 0) {
      notifications.show({
        title: "⚠️ Missing Fields",
        message: `Please fill the following fields`,
        color: "yellow",
        autoClose: 5000,
        withCloseButton: true,
        radius: "md",
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.dark[7],
            borderColor: theme.colors.yellow[6],
          },
        }),
      });
      return;
    }

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const value = formData[field];
      if (field !== "accountType") {
        newErrors[field] = validateField(field, value);
      }
    });

    setFormError(newErrors);

    // Check if there are any validation errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      notifications.show({
        title: "⚠️ Validation Error",
        message: "Please fix the form errors before submitting.",
        color: "red",
        autoClose: 5000,
        withCloseButton: true,
        radius: "md",
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.dark[7],
            borderColor: theme.colors.red[6],
          },
        }),
      });
      return;
    }

    try {
    const res=  await UserServices.registerUser(formData);
      setLoading(true);
      dispatch(setUser(res));
      notifications.show({
        title: "🎉 Success!",
        message: "Account created successfully! Redirecting to login...",
        color: "teal",
        autoClose: 3000,
        withCloseButton: true,
        radius: "md",
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.dark[7],
            borderColor: theme.colors.teal[6],
          },
        }),
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "APPLICANT",
        termsAccepted: false,
      });

      setFormError({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: "",
      });
    

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const errorMessage = err.errorMessage
        ? err.errorMessage
        : "Registration failed. Please try again.";

      notifications.show({
        title: "❌ Registration Error",
        message: errorMessage,
        color: "red",
        autoClose: 5000,
        withCloseButton: true,
        radius: "md",
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.dark[7],
            borderColor: theme.colors.red[6],
          },
        }),
      });
      setLoading(false);
    }
  };

  return (
    <form className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold flex justify-center">
        Create Account
      </div>

      <TextInput
        label="Full Name"
        placeholder="Your name"
        withAsterisk
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={formError.name}
      />

      <TextInput
        label="Email"
        placeholder="Your email"
        type="email"
        withAsterisk
        name="email"
        value={formData.email}
        onChange={handleChange}
        leftSection={<IconAt style={{ width: "1rem", height: "1rem" }} />}
        error={formError.email}
      />

      <PasswordInput
        label="Password"
        placeholder="Password"
        withAsterisk
        name="password"
        value={formData.password}
        onChange={handleChange}
        leftSection={<IconLock style={{ width: "1rem", height: "1rem" }} />}
        error={formError.password}
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm password"
        withAsterisk
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        leftSection={<IconLock style={{ width: "1rem", height: "1rem" }} />}
        error={formError.confirmPassword}
      />

      <Checkbox
        name="termsAccepted"
        checked={formData.termsAccepted}
        onChange={handleChange}
        label={
          <>
            I accept <Anchor href="#">terms & conditions</Anchor>
          </>
        }
        required
        error={formError.termsAccepted}
      />

      <Radio.Group
        label="Select your role"
        withAsterisk
        name="accountType"
        value={formData.accountType}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, accountType: value }))
        }
      >
        <Group mt="xs">
          <Radio
            value="APPLICANT"
            label="Applicant"
            className="py-4 px-6 border has-[:checked]:border-bright-sun-400 rounded-md border-mine-shaft-900"
          />
          <Radio
            value="EMPLOYER"
            label="Employer"
            className="py-4 px-6 border border-mine-shaft-900 has-[:checked]:border-bright-sun-400 rounded-md"
          />
        </Group>
      </Radio.Group>

      <Button
        onClick={handleSubmit}
        type="submit"
        autoContrast
        variant="filled"
        loading={loading}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;
