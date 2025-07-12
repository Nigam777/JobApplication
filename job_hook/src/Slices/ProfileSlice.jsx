import { createSlice } from "@reduxjs/toolkit";


const ProfileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    changeProfile: (state, action) => {
      state = action.payload;
      return state;
    },
    setProfile: (state, action) => {
      state = action.payload;
      return state;
    },

  },
});

export const {changeProfile,setProfile} = ProfileSlice.actions;
export default ProfileSlice.reducer;
