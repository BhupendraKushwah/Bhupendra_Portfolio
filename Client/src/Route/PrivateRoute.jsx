import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  function useAuth() {
    let token = JSON.parse(localStorage.getItem("persistantState"))?.authToken
    if (!token) {
      return { user: null };
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
  
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("persistantState");
        return { user: null };
      }
  
      return { user: decodedToken }; // Token is valid
    } catch (error) {
      console.error("Error decoding token:", error);
      return { user: null };
    }  
  }

  return auth.user ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
