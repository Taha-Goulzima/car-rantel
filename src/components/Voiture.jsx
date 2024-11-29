import React, { useEffect } from "react"; // Importing necessary React hooks.
import { Link, useNavigate } from "react-router-dom"; // Importing navigation utilities from React Router.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing FontAwesome icons.
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"; // Importing specific FontAwesome icons.
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for dispatching actions and accessing the store.
import { deleteCarRental, fetchCarRental } from "../redux/apiCall"; // Importing API calls for fetching and deleting car rentals.

function Main() {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes.

  const dispatch = useDispatch(); // Hook to dispatch Redux actions.
  const cars = useSelector((state) => state.car.cars.carsList); // Accessing the list of cars from the Redux store.

  // Fetch car rentals on component mount.
  useEffect(() => {
    dispatch(fetchCarRental()); // Dispatch an action to fetch the list of cars.
  }, []);

  // Handle deleting a car rental.
  const handleDeleteClick = (car, index) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette voiture ?")) {
      dispatch(deleteCarRental(car)) // Dispatch the action to delete the selected car.
        .then(() => dispatch(fetchCarRental())); // Refresh the car list after deletion.
    }
  };

  // Navigate to the details page for a specific car using its ID.
  const handleDetailsClick = (id) => {
    navigate("/details/" + id);
  };

  // Navigate to the edit page for a specific car, passing its ID and data as state.
  const handleEditClick = (car, id) => {
    navigate(`/edite/${id}`, { state: { car } });
  };

  return (
    <div className="container-fluid">
      {/* Navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand p-2 m-2" href="#">
          RentalManager
        </a>
      </nav>

      <div className="row">
        {/* Sidebar navigation */}
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

        <div className="col-12 col-md-10">
          <div className="container mt-4">
            {/* Header section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="mb-0">Liste Voitures</h1>
              <Link to="/nouvelle" className="btn btn-primary">
                Nouvelle Voiture
              </Link>
            </div>

            {/* Cars table */}
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Nom Voiture</th>
                    <th>Immatricule</th>
                    <th>Année imm</th>
                    <th>Kilometrage</th>
                    <th>Prix /Jour</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through the list of cars and render rows */}
                  {cars?.map((car, index) => (
                    <tr key={index}>
                      <td>{car.name}</td>
                      <td>{car.immatricule}</td>
                      <td>{car.year}</td>
                      <td>{car.kilometers} KM</td>
                      <td>{car.pricePerDay} MAD/Jour</td>
                      <td className="text-center">
                        {/* View details button */}
                        <button
                          className="btn btn-sm btn-info me-1"
                          onClick={() => handleDetailsClick(car._id)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        {/* Edit car button */}
                        <button
                          className="btn btn-sm btn-warning me-1"
                          onClick={() => handleEditClick(car, car._id)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        {/* Delete car button */}
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteClick(car, car._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;