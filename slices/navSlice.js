import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flightData: null,
  fullData: null,
  destination: null,
  travelTimeInfomation: null,
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
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInfomation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setFlight, setFullData, setDestination, setTravelTimeInfomation } =
  navSlice.actions;

export const selectFlightData = (state) => state.nav.flightData;
export const selectfullData = (state) => state.nav.fullData;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;

export default navSlice.reducer;
