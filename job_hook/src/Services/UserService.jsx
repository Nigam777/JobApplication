import axios from "axios";

const baseUrl = "http://localhost:8080/api/users"; 
const registerUser = async (user) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, user, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error.response?.data || new Error("Registration failed");
  }
};


const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || new Error("Login failed");
  }
};


const sendOtp = async(email)=>{
  try {
    const response = await axios.post(`${baseUrl}/sendOtp/${email}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Send OTP error:", error.response?.data || error.message);
    throw error.response?.data || new Error("Send OTP failed");
  }
}
const verifyOtp = async(email,otp)=>{
  try {
    const response = await axios.get(`${baseUrl}/verifyOtp/${email}/${otp}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Verify OTP error:", error.response?.data || error.message);
    throw error.response?.data || new Error("Verify OTP failed");
  }
}
const changePassword = async(email,password)=>{
  try {
    const response=await axios.post(`${baseUrl}/changePassword`,{email,password}, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    } );
    return response.data;
  } catch (error) {
    console.error("Change Password error:", error.response?.data || error.message);
    throw error.response?.data || new Error("Change Password failed");
  }
}
const UserServices = {
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
  changePassword
};

export default UserServices;
