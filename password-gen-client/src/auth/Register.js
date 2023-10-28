import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

import * as yup from "yup";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [entredPass, setEntredPass] = useState();
  const [open, setOpen] = useState(false);
  const initialVlaues = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    cPassword: "",
  };
  const handleChange = (prop, setFieldValue) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setFieldValue("password", event.target.value);
    setEntredPass(event.target.value);
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handelClick = () => {
    setOpen(false);
    navigate("/login");
  };
  const validationSchema = yup.object({
    fName: yup
      .string()
      .required("please provide your first name")
      .max(20, "First name should contain only 20 characters"),
    lName: yup
      .string()
      .required("please provide your last name")
      .max(20, "Last name should contain only 20 characters"),
    email: yup
      .string()
      .required("Please provide your email address")
      .email("Please provide a valid email address"),

    password: yup
      .string()
      .required("Please provide a password")
      .matches(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*[1-9])(?=.*[!@#$%^&*])[a-zA-Z/d!@#$%^&*]/,
        "Password must contain one uppercase, one lowercase, one speical character, one number and minium of 8 charcters"
      ),
    cPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password"), null], "password must match"),
  });

  const handelSubmit = async (values) => {
    try {
      await axios.post(" http://localhost:4500/users/signUp", values);
      setIsError(false);
      setOpen(true);
    } catch (error) {
      setIsError(true);
      setOpen(true);
    }
  };
  return (
    <div>
      <h3 className="mb-3">Register</h3>
      <Formik
        initialValues={initialVlaues}
        validationSchema={validationSchema}
        onSubmit={handelSubmit}
      >
        {({ setFieldValue }) => {
          return (
            <Form data-testid="regForm">
              <TextField
                name={"fName"}
                size="small"
                label="First Name "
                variant="outlined"
                className="w-100 "
                onChange={(e) => {
                  setFieldValue("fName", e.target.value);
                }}
              />
              <ErrorMessage name="fName">
                {(msg) => <span className="text-danger">*{msg}</span>}
              </ErrorMessage>
              <TextField
                size="small"
                name={"lName"}
                label="Last Name"
                variant="outlined"
                className="w-100 my-3"
                onChange={(e) => {
                  setFieldValue("lName", e.target.value);
                }}
              />
              <ErrorMessage name="lName">
                {(msg) => <span className="text-danger">*{msg}</span>}
              </ErrorMessage>
              <TextField
                size="small"
                name={"email"}
                label="Email"
                variant="outlined"
                className="w-100 "
                onChange={(e) => {
                  setFieldValue("email", e.target.value);
                }}
              />
              <ErrorMessage name="email">
                {(msg) => <span className="text-danger">*{msg}</span>}
              </ErrorMessage>
              <FormControl
                size="small"
                className="my-3"
                sx={{ width: "100%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password", setFieldValue)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <ErrorMessage name="password">
                  {(msg) => <span className="text-danger">*{msg}</span>}
                </ErrorMessage>
              </FormControl>
              <TextField
                size="small"
                name={"confirm password"}
                label="confirmPassword"
                variant="outlined"
                className="w-100"
                onChange={(e) => {
                  setFieldValue("cPassword", e.target.value);
                }}
              />
              <ErrorMessage name="cPassword">
                {(msg) => <span className="text-danger">*{msg}</span>}
              </ErrorMessage>
              <Button
                variant="contained"
                className="d-flex mt-3 ml-auto"
                color="success"
                type="submit"
                data-testid="formSubmit"
              >
                Sign Up
              </Button>
            </Form>
          );
        }}
      </Formik>

      <p className="text-center">
        Have an account?{" "}
        <Link to={"/login"}>
          {" "}
          <strong>LOGIN</strong>{" "}
        </Link>
      </p>

      <div className="modal ">
        <Modal open={open}>
          <div className="reg bg-light w-25 mx-auto  h-50 mt-5 p-3 justify-content-center">
            {!isError ? (
              <div className="reg__success d-flex flex-column align-items-center justify-content-center h-100">
                <VerifiedIcon
                  className="success-icon"
                  color="success"
                  sx={{ fontSize: "120px" }}
                />
                <h4 className="my-3">Registration Successfull!</h4>
                <Button
                  onClick={handelClick}
                  variant="contained"
                  color="success"
                >
                  Login
                </Button>
              </div>
            ) : (
              <div className="ref-error d-flex flex-column align-items-center justify-content-center h-100 ">
                <NewReleasesIcon color="error" sx={{ fontSize: "120px" }} />
                <h4>Something went wrong</h4>

                <p style={{ fontSize: "15px" }}>
                  Email you have enter is already regestred{" "}
                </p>
                <Link
                  onClick={() => {
                    setOpen(false);
                  }}
                  to={"/signUp"}
                >
                  Try again
                </Link>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Register;
