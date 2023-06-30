import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    <Fragment>
      {!loading && (
        <Fragment>
          {isAuthenticated === false ? (
            <Navigate to="/login" />
          ) : (
            <Fragment>{children}</Fragment>
          )}
        </Fragment>
      )}
      {/* {!loading && isAuthenticated ? (
        <Fragment>{children}</Fragment>
      ) : (
        <Navigate to="/login" />
      )} */}
    </Fragment>
  );
};

export default ProtectedRoute;
