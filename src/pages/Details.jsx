import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteCarRental, fetchCarRenalDetails } from "../redux/apiCall";

function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const { carId } = useParams();
  const dispatch = useDispatch();
  const car = useSelector((state) => state.car.car);
  useEffect(() => {
    dispatch(fetchCarRenalDetails(carId));
  }, [dispatch, carId]);

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
          style={{ height: "100vh", backgroundColor: "#F8F9FA" }}
        >
          <ul className="list-unstyled">
            <li className="p-2" style={{ fontSize: "18px", color: "grey" }}>
              Locations
            </li>
            <li className="p-2 text-primary" style={{ fontSize: "18px" }}>
              Voitures
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="col-12 col-md-10" style={{ background: "#EBE5FC" }}>
          <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="mb-0">Détails Voiture: {car.name}</h1>
              {/* Buttons */}
              <div>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => navigate(`/edit/${carId}`, { state: { car } })}
                  >
                  Editer
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (window.confirm("Supprimer cette voiture ?"))
                      console.log(car);
                    dispatch(deleteCarRental(car)).then(() => navigate("/"));
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>

            {/* Details Boxes */}
            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <div
                  className="p-3 border rounded"
                  style={{ backgroundColor: "#F8F9FA" }}
                >
                  <strong>Immatricule:</strong>
                  <p className="mb-0">{car.immatricule}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="p-3 border rounded"
                  style={{ backgroundColor: "#F8F9FA" }}
                >
                  <strong>Année immatriculation:</strong>
                  <p className="mb-0">{car.year}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="p-3 border rounded"
                  style={{ backgroundColor: "#F8F9FA" }}
                >
                  <strong>Kilométrage:</strong>
                  <p className="mb-0">{car.kilometers} KM</p>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="p-3 border rounded"
                  style={{ backgroundColor: "#F8F9FA" }}
                >
                  <strong>Coût de location / Jour:</strong>
                  <p className="mb-0">{car.pricePerDay} MAD</p>
                </div>
              </div>
            </div>

            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              Retour à la liste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
