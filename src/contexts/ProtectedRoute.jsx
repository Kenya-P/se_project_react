import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ProtectedRoute({ children, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser && !isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

