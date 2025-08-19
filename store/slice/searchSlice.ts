import { createSlice } from "@reduxjs/toolkit";

// type for initial state
type InitialState = {
  isOpen: boolean;
};
// intial state

const initialState: InitialState = {
  isOpen: false,
};

// create slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openSearchBar: (state) => {
      state.isOpen = true;
    },
    closeSearchBar: (state) => {
      state.isOpen = false;
    },
  },
});

// export actions
export const { openSearchBar, closeSearchBar } = searchSlice.actions;
// export reducer
export default searchSlice.reducer;
