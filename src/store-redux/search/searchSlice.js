// store/search/searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",  // Từ khóa tìm kiếm
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;  // Cập nhật từ khóa tìm kiếm
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;  // Export action
export default searchSlice.reducer;  // Export reducer
