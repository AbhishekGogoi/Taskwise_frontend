import {configureStore} from "@reduxjs/toolkit";
import projectreducer from "../features/project/projectSlice";
import userreducer from "../features/user/userSlice"

const store=configureStore({
    reducer: {
        project:projectreducer,
        user:userreducer
    }
})
export default store