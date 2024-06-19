import { configureStore, combineReducers } from "@reduxjs/toolkit";
import projectreducer from "../features/project/projectSlice";
import userreducer from "../features/user/userSlice";
import workspacereducer from "../features/workspace/workspaceSlice";
import aireducer from "../features/AI/projectAISlice";
import notificationReducer from "../features/notification/notificationSlice";

// Create a root reducer
const rootReducer = combineReducers({
  project: projectreducer,
  user: userreducer,
  workspace: workspacereducer,
  ai: aireducer,
  notification: notificationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
