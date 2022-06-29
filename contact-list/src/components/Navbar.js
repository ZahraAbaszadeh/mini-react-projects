import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="col-md-12 bg-light py-3 shadow-lg">
      <nav className="navbar bg-light  mx-5 d-flex justify-content-center">
        <Link to="/" className="navbar-brand ml-5 text-dark">
          React Redux Contact App
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
