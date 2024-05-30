import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout, signUp } from "./userApi";

const initialState = {
  status: "idle",
  errors: null,
  signupStatus: "idle",
  signupError: null,
  loginStatus: "idle",
  loginError: null,
  loggedInUser: null,
  successMessage: null,
  isAuthChecked: false,
};

export const signupAsync = createAsyncThunk(
  "user/signupAsync",
  async (cred) => {
    const res = await signUp(cred);
    return res;
  }
);

export const loginAsync = createAsyncThunk("user/loginAsync", async (cred) => {
  const res = await login(cred);
  return res;
});

export const logoutAsync = createAsyncThunk("user/logoutAsync", async () => {
  const res = await logout();
  return res;
});

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    clearAuthSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearAuthErrors: (state) => {
      state.errors = null;
    },
    resetAuthStatus: (state) => {
      state.status = "idle";
    },
    resetSignupStatus: (state) => {
      state.signupStatus = "idle";
    },
    clearSignupError: (state) => {
      state.signupError = null;
    },
    resetLoginStatus: (state) => {
      state.loginStatus = "idle";
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.signupStatus = "pending";
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.signupStatus = "fullfilled";
        state.loggedInUser = action.payload;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.signupStatus = "rejected";
        state.signupError = action.error;
      })
      .addCase(loginAsync.pending, (state) => {
        state.loginStatus = "pending";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loginStatus = "fullfilled";
        state.loggedInUser = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loginStatus = "rejected";
        state.loginError = action.error;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = "fullfilled";
        state.loggedInUser = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      });
  },
});
export const {
  clearAuthSuccessMessage,
  clearAuthErrors,
  resetAuthStatus,
  resetSignupStatus,
  clearSignupError,
  resetLoginStatus,
  clearLoginError,
} = userSlice.actions;

export default userSlice.reducer;
