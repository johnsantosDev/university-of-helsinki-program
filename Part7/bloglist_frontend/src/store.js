import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import currentuserReducer from "./reducers/currentuserReducer";
import usersReducer from "./reducers/usersReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    currentuser: currentuserReducer,
    users: usersReducer,
  },
});

export default store;
