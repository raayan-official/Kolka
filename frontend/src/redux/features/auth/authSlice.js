import { createSlice } from "@reduxjs/toolkit";

// Function to load user and token from localStorage
const loadUserfromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem("user");
    const serializedToken = localStorage.getItem("token");

    if (serializedUser == null || serializedToken == null) {
      return { user: null, token: null }; // Return default if no data
    }

    return {
      user: JSON.parse(serializedUser),
      token: serializedToken,
    };
  } catch (error) {
    console.error("Failed to load user or token from localStorage:", error);
    return { user: null, token: null }; // Return default on error
  }
};

// Initialize state with user and token data from localStorage
const initialState = loadUserfromLocalStorage();

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set user and token data
    setUser: (state, action) => {
      state.user = action.payload.user; // Update user state
      state.token = action.payload.token; // Update token state
      localStorage.setItem("user", JSON.stringify(state.user)); // Persist user to localStorage
      //localStorage.setItem("token", state.token); // Persist token to localStorage
    },
    // Action to log out user
    logout: (state) => {
      state.user = null; // Clear user state
      state.token = null; // Clear token state
      localStorage.removeItem("user"); // Remove user data from localStorage
      //localStorage.removeItem("token"); // Remove token data from localStorage
    },
  },
});

// Export actions and reducer
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
