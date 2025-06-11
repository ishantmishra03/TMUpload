import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const SecureRoute = ({ children }) => {
  const { isLoggedIn } = useAppContext();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SecureRoute;