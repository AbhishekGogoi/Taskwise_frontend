import { configureStore } from "@reduxjs/toolkit";
import projectreducer from "./project/projectSlice"

const appStore=configureStore({
    reducer:{
        project:projectreducer
    }
})
export default appStore;