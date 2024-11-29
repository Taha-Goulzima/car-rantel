import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./components/Voiture";
import Nouvelle from "./pages/Nouvelle-Voiture";
import Edite from "./pages/Edite";
import Details from "./pages/Details";

function App() {
  const [cars, setCars] = useState([
    {
      name: "BMW 320i",
      immatricule: "5566-KL-12",
      year: 2020,
      kilometers: "40 000",
      pricePerDay: "200",
    },
  ]);

  const updateCar = (index, updatedCar) => {
    const updatedCars = [...cars];
    updatedCars[index] = updatedCar;
    setCars(updatedCars);
  };

  const addCar = (newCar) => {
    setCars([...cars, newCar]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/nouvelle" element={<Nouvelle addCar={addCar} />} />
        <Route path="/" element={<Main cars={cars} setCars={setCars} />} />
        <Route
          path="/edite/:carId"
          element={<Edite cars={cars} updateCar={updateCar} />}
        />
        <Route path="/details/:carId" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
