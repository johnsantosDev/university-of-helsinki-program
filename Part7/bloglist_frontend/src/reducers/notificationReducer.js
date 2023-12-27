import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state) {
      return state;
    },
    setNotification(state, action) {
      state.message = action.payload;
      return state;
    },
  },
});

export const { showNotification, setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
