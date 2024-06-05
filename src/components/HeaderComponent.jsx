import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../services/AuthService";

const HeaderComponent = () => {
  const isAuth = isUserLoggedIn();
  const navigate = useNavigate();

  function handleClick() {
    if (isAuth) {
      navigate("/emps");
    } else {
      alert("Please Sign in to View Employee List");
      navigate("/login");
    }
  }
  function handlLogout() {
    logout();
    navigate("/login");
  }
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <a href="http://localhost:3000" className="navbar-brand">
              Employee Management Application
            </a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              {isAuth && (
                <li className="nav-item">
                  <a className="nav-link" onClick={handleClick}>
                    Employee List
                  </a>
                </li>
              )}
              {!isAuth && (
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
              )}
              {!isAuth && (
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              )}
              {isAuth && (
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    onClick={handlLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
