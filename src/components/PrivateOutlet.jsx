import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../services/AuthService";

function PrivateOutlet() {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuth = isUserLoggedIn();
    if (!isAuth) {
      alert("Login to Continue");
      navigate("/", { replace: true });
    }
  }, []);
  return <Outlet />;
}

export default PrivateOutlet;
