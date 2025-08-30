import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import AuthApi from "../../api/auth.api";

export const login = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthApi.login(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Login failed"
      );
    }
  }
);

export const logout = createAsyncThunk("logout", async () => {
  try {
    const response = await AuthApi.logout();
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Logout failed");
  }
});

const storeSlice = createSlice({
  name: "store",
  initialState: {
    token: false,
    currentUser: null,
    loading: false,
    error: false,
    success: false,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("Login fulfilled action payload:", action.payload);
        state.loading = false;
        state.error = false;
        state.success = true;
        state.token = true;
        state.isAuthenticated = true;
        state.currentUser = action.payload.data.user || null;
        localStorage.setItem("token", action.payload.data.accessToken);
        localStorage.setItem("refreshToken", action.payload.data.refreshToken);
        toast.success(`Welcome Back, ${action.payload.data?.user?.first_name ? action.payload.data?.user?.first_name : action.payload.data?.user?.ownerName}`);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.currentUser = null;
        state.token = false;
        state.isAuthenticated = false;
        localStorage.clear();
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        toast.success("Logout successfully");
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      });
  },
});

export default storeSlice.reducer;
