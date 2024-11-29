import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postCarRental } from "../redux/apiCall";

function Nouvelle({ addCar }) {
  const despatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    immatricule: "",
    year: "",
    kilometers: "",
    pricePerDay: "",
  });

  const [error, setError] = useState(""); // State to track errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    // Define the regex pattern
    const immatriculePattern = /^[0-9]{4}-[A-Za-z]{1}-[0-9]{2}$/;

    // Check if any field is empty
    if (
      !form.name ||
      !form.immatricule ||
      !form.year ||
      !form.kilometers ||
      !form.pricePerDay
    ) {
      setError("Tous les champs doivent être rempli.");
      return false;
    }

    // Validate immatricule field with regex
    if (!immatriculePattern.test(form.immatricule)) {
      setError(
        "Le format de l’immatricule est invalide. Format attendu: 1234-A-65"
      );
      return false;
    }

    // Validate that Kilométrage and Coût de location / Jour are positive numbers
    if (parseFloat(form.kilometers) <= 0 || parseFloat(form.pricePerDay) <= 0) {
      setError(
        "Le Kilométrage et le Coût de location / Jour doivent être des nombres positifs."
      );
      return false;
    }

    // Validate the year is within a valid range
    const currentYear = new Date().getFullYear();
    if (parseInt(form.year) < 1 || parseInt(form.year) > currentYear) {
      setError(
        `L'année d'immatriculation doit être entre 1 et ${currentYear}.`
      );
      return false;
    }

    // Clear error if form is valid
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      despatch(postCarRental(form)).then(() => navigate("/"));
    }
  };

  return (
    <div className="container-fluid">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand p-2 m-2" href="#">
          RentalManager
        </a>
      </nav>

      <div className="row">
        {/* Sidebar */}
        <aside
          className="col-12 col-md-2 d-flex flex-column p-3"
          style={{ backgroundColor: "#F8F9FA", height: "100vh" }}
        >
          <ul className="list-unstyled">
            <li
              className="p-2"
              style={{ fontSize: "18px", fontWeight: "400", color: "grey" }}
            >
              Locations
            </li>
            <li
              className="p-2 text-primary"
              style={{ fontWeight: "400", fontSize: "18px" }}
            >
              {/* <Link to="/voiture" > */}
              <Link to="/" style={{ textDecoration: "none" }}>
                Voitures
              </Link>
              {/* </Link> */}
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="col-12 col-md-10">
          <div className="container mt-4 text-left">
            <div className="container w-75">
              <h1
                style={{ fontSize: "40px", fontWeight: "700" }}
                className="mb-4"
              >
                Nouvelle Voiture
              </h1>
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="col-10 mb-3">
                  <label htmlFor="name" className="mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Saisir le nom de la voiture"
                  />
                </div>
                <div className="row">
                  <div className="col-5 mb-3">
                    <label htmlFor="immatricule" className="mb-2">
                      Immatricule
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="immatricule"
                      name="immatricule"
                      value={form.immatricule}
                      onChange={handleChange}
                      placeholder="1234-A-65"
                    />
                  </div>
                  <div className="col-5 mb-3">
                    <label htmlFor="year" className="mb-2">
                      Annee d'immatriculation
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="year"
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      placeholder="Saisir l’année de l’imm"
                      min="1899"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-5 mb-3">
                    <label htmlFor="kilometers" className="mb-2">
                      Kilometrage
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="kilometers"
                      name="kilometers"
                      value={form.kilometers}
                      onChange={handleChange}
                      placeholder="Saisir la distance en KM"
                      min="20"
                    />
                  </div>
                  <div className="col-5 mb-3">
                    <label htmlFor="pricePerDay" className="mb-2">
                      Cout de location / Jour
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="pricePerDay"
                      name="pricePerDay"
                      value={form.pricePerDay}
                      onChange={handleChange}
                      placeholder="Saisir le Prix en MAD"
                      min="1"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Ajouter
                </button>
                {error && (
                  <div
                    className="mt-2 text-danger"
                    style={{ fontSize: "14px" }}
                  >
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nouvelle;
