import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">
          Scale
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link to='/'><span class='nav-link'>Home</span></Link>
            </li>
            <li class="nav-item">
              <Link to='/host'><span class='nav-link'>Host</span></Link>
            </li>
            <li class="nav-item">
              <Link to='/events'><span class='nav-link'>Scheduled Interviews</span></Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
