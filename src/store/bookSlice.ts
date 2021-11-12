import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookDescription } from "../globalTypes";

export interface BookState {
  currentBookId?: number;
  shopShowcase?: BookDescription[];
  filteredShopShowcase?: BookDescription[];
}

const initialState: BookState = {
  currentBookId: undefined,
  shopShowcase: [],
  filteredShopShowcase: [],
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setFilteredShopShowcase: (
      state,
      action: PayloadAction<{ bookDescriptions: BookDescription[] }>
    ) => {
      state.filteredShopShowcase = action.payload.bookDescriptions;
    },
    setShopShowcase: (
      state,
      action: PayloadAction<{ bookDescriptions: BookDescription[] }>
    ) => {
      state.shopShowcase = action.payload.bookDescriptions;
    },
    updateCurentBookId: (state, action: PayloadAction<{ bookId: number }>) => {
      const { bookId } = action.payload;
      state.currentBookId = bookId;
    },
  },
});

export const { updateCurentBookId, setShopShowcase, setFilteredShopShowcase } =
  bookSlice.actions;

export default bookSlice.reducer;
