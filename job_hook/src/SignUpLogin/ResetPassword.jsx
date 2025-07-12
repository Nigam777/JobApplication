import React, { useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  PasswordInput,
  PinInput,
} from "@mantine/core";
import UserService from "../Services/UserService";
import { showNotification } from "@mantine/notifications";
import { IconLock } from "@tabler/icons-react";

const ResetPassword = ({ opened, onClose }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(false);
  const [otpsending, setOtpsending] = useState(false);
  const [verify, setVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Function to validate password
  const validatePassword = (value) => {
    if (value.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(value)) return "Password must include an uppercase letter";
    if (!/[a-z]/.test(value)) return "Password must include a lowercase letter";
    if (!/[0-9]/.test(value)) return "Password must include a number";
    if (!/[!@#$%^&*]/.test(value))
      return "Password must include a special character";
    return "";
  };

  // Function to reset all input fields and states
  const resetForm = () => {
    setEmail("");
    setOtp(false);
    setOtpsending(false);
    setVerify(false);
    setPassword("");
    setPasswordError("");
  };

  // Wrap original onClose to reset form
  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSendOtp = () => {
    setOtpsending(true);
    UserService.sendOtp(email)
      .then((res) => {
        setOtp(true);
        setOtpsending(false);
        console.log(res);
        showNotification({
          title: "OTP Sent",
          message: "OTP has been sent to your email.",
          color: "green",
        });
      })
      .catch((err) => {
        console.log("error is ............." + err);
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to send OTP. Please try again.";
        showNotification({
          title: "Error",
          message: errorMessage,
          color: "red",
        });
        resetForm(); // Reset form on error
      });
  };

  const verifyOtp = (otpValue) => {
    UserService.verifyOtp(email, otpValue)
      .then((res) => {
        setVerify(true);
        setOtp(false);
        console.log(res);
        showNotification({
          title: "OTP Verified",
          message: "Your OTP has been verified successfully.",
          color: "green",
        });
      })
      .catch((err) => {
        console.log(err);
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to verify OTP. Please try again.";
        showNotification({
          title: "Error",
          message: errorMessage,
          color: "red",
        });
        resetForm(); // Reset form on OTP verification error
      });
  };

  const handlePasswordSubmit = () => {
    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    UserService.changePassword(email, password)
      .then((res) => {
        console.log(res);
        showNotification({
          title: "Password Reset",
          message: "Your password has been reset successfully.",
          color: "green",
        });
        resetForm();
        onClose(); // Close modal after successful submission
      })
      .catch((err) => {
        console.log(err);
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to reset password. Please try again.";
        showNotification({
          title: "Error",
          message: errorMessage,
          color: "red",
        });
        setPassword(""); // Clear password on error
        setPasswordError(""); // Clear error
      });
  };

  const changeEmail = () => {
    resetForm(); // Reuse resetForm for changing email
  };

  return (
    <div>
      <Modal opened={opened} onClose={handleClose} title="Reset Password">
        <div>
          {!verify && (
            <TextInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              rightSection={
                <Button
                  loading={otpsending}
                  size="xs"
                  className="mr-1"
                  disabled={email === "" || otp}
                  onClick={handleSendOtp}
                  autoContrast
                  variant="filled"
                >
                  Send OTP
                </Button>
              }
              rightSectionWidth="xl"
            />
          )}
          {otp && (
            <PinInput
              onComplete={verifyOtp}
              type="number"
              length={6}
              size="md"
              className="mx-auto mt-4"
              gap="lg"
            />
          )}
        </div>
        {otp && !verify && (
          <div className="flex justify-between gap-7">
            <Button
              fullWidth
              color="brightSun.4"
              loading={otpsending}
              variant="light"
              size="xs"
              className="mx-auto mt-4"
              onClick={handleSendOtp}
            >
              Resend
            </Button>
            <Button
              onClick={changeEmail}
              variant="light"
              size="xs"
              className="mx-auto mt-4"
              color="brightSun.4"
              fullWidth
            >
              Change Email
            </Button>
          </div>
        )}
        {verify && (
          <>
            <PasswordInput
              label="Password"
              placeholder="Password"
              withAsterisk
              name="password"
              value={password}
              onChange={(e) => {
                const newPassword = e.target.value;
                setPassword(newPassword);
                setPasswordError(validatePassword(newPassword)); // Validate on change
              }}
              leftSection={
                <IconLock style={{ width: "1rem", height: "1rem" }} />
              }
              error={passwordError} // Display validation error
            />
            <Button
              fullWidth
              variant="filled"
              color="blue"
              className="mt-4"
              onClick={handlePasswordSubmit}
              disabled={!!passwordError || !password} // Disable if error or empty
            >
              Submit Password
            </Button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ResetPassword;