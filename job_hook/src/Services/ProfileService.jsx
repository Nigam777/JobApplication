import axios from "axios";

const getProfile = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8080/profile/get/${userId}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
   
    throw error.response?.data || new Error("Profile retrieval failed");
  }
};

const updateProfile = async (profile) => {
  try {
    const response = await axios.put(`http://localhost:8080/profile/update`, profile, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    
    throw error.response?.data || new Error("Profile update failed");
  }
};

const getAllProfiles = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/profile/getAllProfiles`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
   
    throw error.response?.data || new Error("Profile retrieval failed");
  }
};

const ProfileService = {
  getProfile,
  updateProfile,
  getAllProfiles,
};
export default ProfileService;