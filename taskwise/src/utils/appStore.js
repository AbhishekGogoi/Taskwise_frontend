import { configureStore } from "@reduxjs/toolkit";
import projectreducer from "./project/projectSlice"
import userreducer from "./user/userSlice"

const appStore=configureStore({
    reducer:{
        project:projectreducer,
        user:userreducer
    }
})
export default appStore;