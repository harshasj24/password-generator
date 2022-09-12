import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import svg from "../assets/well_done.svg";
import { useAuth } from "../context/AuthProvider";
import {
  Alert,
  AlertTitle,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import "./login.css";
import { useVault } from "../context/VaultProvider";
const Login = () => {
  const { login } = useAuth();

  const location = useLocation();
  const [inValid, setInvalid] = useState(false);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (prop, setFieldValue) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setFieldValue("password", event.target.value);
  };
  const navigate = useNavigate();
  const initialValuses = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email address"),
    password: Yup.string().required("Paaword is required"),
  });
  useEffect(() => {}, []);
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleFormSubnit = async (values) => {
    try {
      const responce = await axios.post(
        "http://localhost:4500/users/login",
        values
      );

      login(responce.data["data"]);
      setInvalid(false);
      navigate("/vault");
    } catch (error) {
      setInvalid(true);
      console.log(error);
      console.log("some thing went trebelly wrong");
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="login p-2">
      <div className="svg d-flex mx-auto mt-3">
        <img src={svg} alt="" />
      </div>
      <h3 className="m-0">Login</h3>
      <Formik
        initialValues={initialValuses}
        validationSchema={validationSchema}
        onSubmit={handleFormSubnit}
      >
        {({ setFieldValue, validateField }) => {
          return (
            <Form className=" mx-auto mt-4">
              {inValid && (
                <Alert severity="error" className="mb-4">
                  Invalid Email or Password.
                </Alert>
              )}

              <TextField
                id="outlined-basic"
                name={"email"}
                label="Email"
                variant="outlined"
                className="w-100"
                onChange={(e) => {
                  setFieldValue("email", e.target.value);
                }}
              />
              <ErrorMessage name="email">
                {(msg) => <span className="text-danger">*{msg}</span>}
              </ErrorMessage>
              <FormControl
                className="my-4"
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

              <Button
                color="success"
                className=" d-flex ml-auto "
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </Form>
          );
        }}
      </Formik>
      <p className=" text-center">
        Need an account?{" "}
        <strong>
          <Link to={"/signUp"}>SIGNUP</Link>
        </strong>{" "}
      </p>
    </div>
  );
};

export default Login;
