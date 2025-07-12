import React, { useState } from "react";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import UserServices from "../Services/UserService";
import ResetPassword from "./ResetPassword";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlices";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const emailRegex =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)([a-zA-Z0-9._%+-]{1,64})@([a-zA-Z0-9.-]{1,255})\.([a-zA-Z]{2,})$/;

  const validateField = (name, value) => {
    switch (name) {
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
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormError((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    let isValid = true;

    for (let field in formData) {
      const error = validateField(field, formData[field]);
      if (error) isValid = false;
      errors[field] = error;
    }

    setFormError(errors);
    if (!isValid) {
      notifications.show({
        title: "⚠️ Validation Error",
        message: "Please fix the form errors before submitting.",
        color: "red",
        autoClose: 4000,
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
      await UserServices.loginUser(formData).then((res) => {
        notifications.show({
          title: "🎉 Success!",
          message: "Login successful! Redirecting to dashboard...",
          color: "teal",
          autoClose: 2000,
          withCloseButton: true,
          radius: "md",
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.dark[7],
              borderColor: theme.colors.teal[6],
            },
          }),
        });

        setLoading(true);
        setTimeout(() => {
          dispatch(setUser(res));
          navigate("/dashboard");
        }, 2000); // Delay added here
      });
    } catch (err) {
      console.log(err);
      notifications.show({
        title: "❌ Error",
        message: err.errorMessage + ".Please try again.",
        color: "red",
        autoClose: 3000,
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
    <>
      <form className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold flex justify-center">Login</div>

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
          placeholder="Your password"
          withAsterisk
          name="password"
          value={formData.password}
          onChange={handleChange}
          leftSection={<IconLock style={{ width: "1rem", height: "1rem" }} />}
          error={formError.password}
        />

        <Button
          onClick={handleSubmit}
          type="submit"
          autoContrast
          variant="filled"
          loading={loading}
        >
          Login
        </Button>

        <div
          onClick={open}
          className="flex justify-center gap-2 text-bright-sun-400 hover:text-bright-sun-500 cursor-pointer hover:underline underline-offset-2"
        >
          Forgot password
        </div>
      </form>
      <ResetPassword opened={opened} onClose={close} />
    </>
  );
};

export default Login;
