import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin, children }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//   return (
//     <Fragment>
//       {loading === false && (
//         <Fragment>
//           {isAuthenticated === false ? (
//             <Navigate to="/login" />
//           ) : (
//             <Fragment>{children}</Fragment>
//           )}

//           {isAuthenticated === true &&
//           isAdmin === true &&
//           user.role !== "admin" ? (
//             <Navigate to="/login" />
//           ) : (
//             <Navigate to="/admin/dashboard" />
//           )}
//         </Fragment>
//       )}
//       {/* {!loading && isAuthenticated ? (
//         <Fragment>{children}</Fragment>
//       ) : (
//         <Navigate to="/login" />
//       )} */}
//     </Fragment>
//   );
// };

const ProtectedRoute = ({ isAdmin, component: Component, ...routeProps }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading === false && isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  // if (isAuthenticated === true) {
  if (loading === false && isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  // }

  return (
    <Fragment>
      {loading === false ? <Component {...routeProps} /> : null}
    </Fragment>
  );
};

export default ProtectedRoute;
