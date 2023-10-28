import React, { useEffect, useState } from "react";
import "./auth.css";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Button, Drawer, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import svg from "../assets/well_done.svg";
import Register from "./Register";
import { usePassword } from "../context/ContextProvider";
const Auth = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { breakPointObserver, breakPoint } = usePassword();

  useEffect(() => {
    breakPointObserver();
    console.log(breakPoint);
  }, [breakPoint]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="auth">
      <div className="row h-100">
        <div className={"auth__images col-lg-5 border"}>
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

          {(breakPoint === "tablet" || breakPoint === "mobile") && (
            <Button
              sx={{
                marginTop: "120px",
                color: "white",
                fontSize: "2rem",
                border: "solid #ffff",
              }}
              variant="outlined"
              onClick={handleOpen}
            >
              Login
            </Button>
          )}
        </div>
        {breakPoint === "tablet" || breakPoint === "mobile" ? (
          <Drawer variant="temporary" open={open}>
            <div className="forms p-5 d-flex flex-column">
              <IconButton onClick={handleClose} className="ml-auto">
                close
              </IconButton>
              {pathname === "/login" ? (
                <Login />
              ) : pathname === "/signUp" ? (
                <Register />
              ) : (
                ""
              )}
            </div>
          </Drawer>
        ) : (
          <div className="col-lg-7 border ">
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
        )}
      </div>
    </div>
  );
};

export default Auth;
