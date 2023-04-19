import React from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  const { isAuth } = useSelector((store) => store.AuthenticationReducer);

  if (!isAuth) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default Private;
