import { configureStore } from "@reduxjs/toolkit";
import carSlice from "../redux/carSlice";

const store = configureStore({
  reducer: {
    car: carSlice,
  },
});

export default store;
