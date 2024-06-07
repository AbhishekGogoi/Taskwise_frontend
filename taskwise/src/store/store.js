import { configureStore, combineReducers } from "@reduxjs/toolkit";
import projectreducer from "../features/project/projectSlice";
import userreducer, {
  rehydrate,
  resetUserState,
} from "../features/user/userSlice";
import workspacereducer from "../features/workspace/workspaceSlice";
import aireducer from "../features/AI/projectAISlice";

// Create a root reducer
const appReducer = combineReducers({
  project: projectreducer,
  user: userreducer,
  workspace: workspacereducer,
  ai: aireducer,
});

const rootReducer = (state, action) => {
  if (action.type === resetUserState.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

// Rehydrate the authentication state
store.dispatch(rehydrate());

export default store;
