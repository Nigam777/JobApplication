import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Services/LocalStorage";

const UserSlices = createSlice({
  name: "user",
  initialState: getItem("user"),
  reducers: {
    setUser: (state, action) => {
      setItem("user", action.payload);
      return action.payload;
    },
    removeUser: () => {
      removeItem("user");
      return null;
    },
  },
});

export const { setUser, removeUser } = UserSlices.actions;
export default UserSlices.reducer;
