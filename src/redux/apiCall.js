import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5001/";

export const postCarRental = createAsyncThunk(
  "content/postCar",
  async (car) => {
    const res = await axios.post(BASE_URL + "car", car);
    const data = await res.data;
    return data;
  }
);

export const fetchCarRental = createAsyncThunk(
  "content/getCars",
  async (car) => {
    const res = await axios.get(BASE_URL + "car");
    const data = await res.data;
    return data;
  }
);

export const deleteCarRental = createAsyncThunk(
  "content/deleteCar",
  async (car) => {
    console.log(car);
    const res = await axios.delete(BASE_URL + "car/" + car._id);
    const data = await res.data;
    return data;
  }
);

export const editCarRental = createAsyncThunk(
  "content/editCarRental",
  async (id) => {
    console.log(car);
    const res = await axios.put(BASE_URL + "car/" + car._id, car);
    const data = await res.data;
    return data;
  }
);

export const fetchCarRenalDetails = createAsyncThunk(
  "content/fetchCarRenalDetails",
  async (id) => {
    const res = await axios.get(BASE_URL + "car/" + id);
    const data = await res.data;
    return data;
  }
);
export const fetchCarRenalEdit = createAsyncThunk(
  "content/fetchCarRenalEdit",
  async (id) => {
    const res = await axios.get(BASE_URL + "car/" + id);
    const data = await res.data;
    return data;
  }
);
