import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "../globalTypes";

export interface UserState {
  email: string;
  role?: UserRole;
}

const initialState: UserState = {
  email: "",
  role: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateEmailAndRole: (
      state,
      action: PayloadAction<{ email: string; role: UserRole }>
    ) => {
      const { email, role } = action.payload;
      state.email = email;
      state.role = role;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateEmailAndRole } = userSlice.actions;

export default userSlice.reducer;
