import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

export const Navbar = () => {
  const { token, logout: onLogout } = useContext(AuthContext);

  const logout = () => {
    onLogout();
  };

  return (
    <>
      {token && (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Cinema
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" style={{ color: "#000" }} className="nav-link">
                    Peliculas
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <button className="btn btn-outline-danger" onClick={logout}>
                Cerrar sesion
              </button>
            </div>
          </div>
        </nav>
      )}

      {!token && (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Cinema
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" style={{ color: "#000" }} className="nav-link">
                    Peliculas
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <Link to="/login" style={{ color: "#000" }} className="nav-link">
                Login
              </Link>
            </div>
          </div>
        </nav>
      )}

      <Outlet />
    </>
  );
};
