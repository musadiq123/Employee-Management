import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flightData: null,
  fullData: null,
};

export const navSlice = createSlice({
  name: "Nav",
  initialState,
  reducers: {
    setFlight: (state, action) => {
      state.flightData = action.payload;
    },
    setFullData: (state, action) => {
      state.fullData = action.payload;
    },
  },
});

export const { setFlight, setFullData} =
  navSlice.actions;

export const selectFlightData = (state) => state.nav.flightData;
export const selectfullData = (state) => state.nav.fullData;

export default navSlice.reducer;
