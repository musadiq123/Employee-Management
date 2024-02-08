import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flightData: null,
//   destination: null,
//   travelTimeInfomation: null,
};

export const navFlight = createSlice({
  name: "Nav",
  initialState,
  reducers: {
    setFlightData: (state, action) => {
      state.flightData = action.payload;
    },
    // setDestination: (state, action) => {
    //   state.destination = action.payload;
    // },
    // setTravelTimeInfomation: (state, action) => {
    //   state.travelTimeInformation = action.payload;
    // },
  },
});

export const { setFlightData, /*setDestination, setTravelTimeInfomation*/ } =
navFlight.actions;

//selectors
export const selectFlightData = (state) => state.nav.flightData;
// export const selectDestination = (state) => state.nav.destination;
// export const selectTravelTimeInformation = (state) =>
//   state.nav.travelTimeInformation;

export default navFlight.reducer;
