
import React from 'react';
import {  Navigate } from 'react-router-dom';
import {Admin,User,Jobseeker} from "./Auth";

function PrivateRoute({ element: Element, authRole, allowedRoles }) {
  const isAuth = sessionStorage.getItem('isAuth');
  const role = sessionStorage.getItem('role');

  if (isAuth && allowedRoles.includes(role)) {
    if (authRole === 'Admin') {
      return <Admin>{Element}</Admin>;
    } else if (authRole === 'User') {
      return <User>{Element}</User>;
    }else if (authRole === 'Jobseeker') {
      return <Jobseeker>{Element}</Jobseeker>
    }
  }

  // Redirect to login page if not authenticated or unauthorized
  return <Navigate to="/" replace />;
}

export default PrivateRoute;


