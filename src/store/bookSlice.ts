import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BookState {
  currentBookId?: number;
}

const initialState: BookState = {
  currentBookId: undefined,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    updateCurentBookId: (state, action: PayloadAction<{ bookId: number }>) => {
      const { bookId } = action.payload;
      state.currentBookId = bookId;
    },
  },
});

export const { updateCurentBookId } = bookSlice.actions;

export default bookSlice.reducer;
