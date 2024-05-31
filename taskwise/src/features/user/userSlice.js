import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  login,
  logout,
  signUp,
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from "./userApi";

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
  forgotPasswordStatus: "idle",
  forgotPasswordError: null,
  verifyCodeStatus: "idle",
  verifyCodeError: null,
  resetPasswordStatus: "idle",
  resetPasswordError: null,
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

export const forgotPasswordAsync = createAsyncThunk(
  "user/forgotPasswordAsync",
  async (cred) => {
    const res = await forgotPassword(cred);
    return res;
  }
);

export const verifyResetCodeAsync = createAsyncThunk(
  "user/verifyResetCodeAsync",
  async (cred) => {
    const res = await verifyResetCode(cred);
    return res;
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "user/resetPasswordAsync",
  async (cred) => {
    const res = await resetPassword(cred);
    return res;
  }
);

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
    resetForgotPasswordStatus: (state) => {
      state.forgotPasswordStatus = "idle";
    },
    clearForgotPasswordError: (state) => {
      state.forgotPasswordError = null;
    },
    resetVerifyCodeStatus: (state) => {
      state.verifyCodeStatus = "idle";
    },
    clearVerifyCodeError: (state) => {
      state.verifyCodeError = null;
    },
    resetResetPasswordStatus: (state) => {
      state.resetPasswordStatus = "idle";
    },
    clearResetPasswordError: (state) => {
      state.resetPasswordError = null;
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
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.forgotPasswordStatus = "pending";
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.forgotPasswordStatus = "fulfilled";
        state.successMessage = action.payload;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.forgotPasswordStatus = "rejected";
        state.forgotPasswordError = action.error;
      })
      .addCase(verifyResetCodeAsync.pending, (state) => {
        state.verifyCodeStatus = "pending";
      })
      .addCase(verifyResetCodeAsync.fulfilled, (state, action) => {
        state.verifyCodeStatus = "fulfilled";
        state.successMessage = action.payload;
      })
      .addCase(verifyResetCodeAsync.rejected, (state, action) => {
        state.verifyCodeStatus = "rejected";
        state.verifyCodeError = action.error;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.resetPasswordStatus = "pending";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.resetPasswordStatus = "fulfilled";
        state.successMessage = action.payload;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.resetPasswordStatus = "rejected";
        state.resetPasswordError = action.error;
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
  resetForgotPasswordStatus,
  clearForgotPasswordError,
  resetVerifyCodeStatus,
  clearVerifyCodeError,
  resetResetPasswordStatus,
  clearResetPasswordError,
} = userSlice.actions;

export default userSlice.reducer;
