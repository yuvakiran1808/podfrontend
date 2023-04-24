import React from "react";
import { Link } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";

const Menu = () => {
  return (
    <div className="container-fluid bg-dark px-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-success h1" href="#">
            PODCASTS
          </Link>
          <button
            className="navbar-toggler bg-success"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link text-white h6"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white ms-3 h6"
                  aria-current="page"
                  to="/podcasts"
                >
                  Podcasts
                </Link>
              </li>
              {isAuthenticated() && isAuthenticated().user.role === "1" && (
                <li className="nav-item">
                  <Link
                    className="nav-link text-white ms-3 h6"
                    aria-current="page"
                    to="/admin/dashboard"
                  >
                    Admindashboard
                  </Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ms-auto">
              {isAuthenticated() && (
                <li className="nav-item">
                  <h6
                    className="nav-link text-white h6 ms-3"
                    aria-current="page"
                    to="/profile"
                  >
                    Hello {isAuthenticated().user.name}
                  </h6>
                </li>
              )}
              {!isAuthenticated() && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white ms-3 h6"
                      aria-current="page"
                      to="/signin"
                    >
                      Signin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white ms-3 h6"
                      aria-current="page"
                      to="/signup"
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}

              {isAuthenticated() && (
                <li className="nav-item">
                  <Link
                    className="nav-link text-white ms-3 h6"
                    onClick={signout}
                    aria-current="page"
                  >
                    Signout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
