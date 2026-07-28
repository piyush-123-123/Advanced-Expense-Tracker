import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await response.user.getIdToken();
      const userId = response.user.uid;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      return {
        token,
        userId,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await response.user.getIdToken();
      const userId = response.user.uid;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      return {
        token,
        userId,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);

      return "Password reset email has been sent successfully.";
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  loading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout(state) {
      state.token = null;
      state.userId = null;
      state.loading = false;
      state.error = null;
      state.message = null;

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },

  extraReducers: (builder) => {
    builder


      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })

      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;