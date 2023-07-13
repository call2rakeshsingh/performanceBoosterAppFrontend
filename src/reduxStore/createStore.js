import { configureStore } from "@reduxjs/toolkit";
import loginLogoutSlice from "./loginSlice"

const store = configureStore({
    reducer:{
        loginLogout: loginLogoutSlice
    }
})

export default store;

