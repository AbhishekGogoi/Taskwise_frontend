import { configureStore } from "@reduxjs/toolkit";
import projectreducer from "../features/project/projectSlice";
import userreducer, { rehydrate } from "../features/user/userSlice";
import workspacereducer from "../features/workspace/workspaceSlice";

const store = configureStore({
  reducer: {
    project: projectreducer,
    user: userreducer,
    workspace: workspacereducer,
  },
});

// Rehydrate the authentication state
store.dispatch(rehydrate());

export default store;
