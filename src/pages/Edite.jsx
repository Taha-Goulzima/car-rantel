import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { editCarRental, fetchCarRenalEdit } from "../redux/apiCall";
import  {  useEffect } from "react";


function Edite({ updateCar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { carId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarRenalEdit(carId));
  }, [dispatch, carId]);
  // Retrieve the car and its index from location.state
  const { car, index } = location.state || {};

  // Form state to manage input values
  const [form, setForm] = useState({
    name: car?.name || "",
    immatricule: car?.immatricule || "",
    year: car?.year || "",
    kilometers: car?.kilometers || "",
    pricePerDay: car?.pricePerDay || "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    // Regex for immatricule validation
    const immatriculePattern = /^[0-9]{4}-[A-Za-z]{1}-[0-9]{2}$/;

    if (
      !form.name ||
      !form.immatricule ||
      !form.year ||
      !form.kilometers ||
      !form.pricePerDay
    ) {
      setError("Tous les champs doivent être remplis.");
      return false;
    }

    if (!immatriculePattern.test(form.immatricule)) {
      setError(
        "Le format de l’immatricule est invalide. Format attendu: 1234-A-65"
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (updateCar ) {
        updateCar(index, form);
        dispatch(editCarRental({ _id: car._id, ...form })).then(() =>
          navigate("/")
        );
      }
      // Return to the main list
    }
  };

  if (!car) {
    return (
      <div className="container mt-5 text-center">
        <h2>Erreur</h2>
        <p>Aucune voiture sélectionnée. Retourner à la liste.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Retour
        </button>
      </div>
    );
  }

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
              <Link to="/" style={{ textDecoration: "none" }}>
                Voitures
              </Link>
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
                Editer Voiture
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
                      min="1"
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
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-success">
                  Sauvegarder
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

export default Edite;
