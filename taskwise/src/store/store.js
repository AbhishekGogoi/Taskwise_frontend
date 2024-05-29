import {configureStore} from "@reduxjs/toolkit";
import projectreducer from "../features/project/projectSlice";
import userreducer from "../features/user/userSlice";
import workspacereducer from "../features/workspace/workspaceSlice";

const store=configureStore({
    reducer: {
        project:projectreducer,
        user:userreducer,
        workspace:workspacereducer
    }
})
export default store