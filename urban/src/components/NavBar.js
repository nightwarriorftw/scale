import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/"> <img src={process.env.PUBLIC_URL + "/scale.png"}  width="50px" heigh="50px" alt="logo"/></Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/">
                <span className="nav-link">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/host">
                <span className="nav-link">Host</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/interviews">
                <span className="nav-link">Scheduled Interviews</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
