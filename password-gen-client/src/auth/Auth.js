import React from "react";
import "./auth.css";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import svg from "../assets/well_done.svg";
import Register from "./Register";
const Auth = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className="auth">
      <div className="row h-100">
        <div className="auth__images col-5 border">
          <div className="auth__images__logo">
            <VpnKeyIcon className="logo" />
          </div>
          <div className="auth__images__heading">
            <h1>
              {pathname === "/login"
                ? "Welcome Back"
                : pathname === "/signUp"
                ? "Join Us"
                : ""}
            </h1>
          </div>
          <div className="auth__images__body auth__images__body--margin ">
            <h4>Create, Save and Manage Your Password</h4>
          </div>
          <Button
            onClick={() => {
              navigate("/home");
            }}
            className="images__body__button"
            variant="outlined"
          >
            Create Password
          </Button>
        </div>
        <div className="col-7 border ">
          <div className="forms p-5">
            {pathname === "/login" ? (
              <Login />
            ) : pathname === "/signUp" ? (
              <Register />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
