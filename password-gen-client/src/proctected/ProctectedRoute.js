import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Vault from "../vault/Vault";

const ProctectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProctectedRoute;
