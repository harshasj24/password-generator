import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { usePassword } from "../context/ContextProvider";

import * as yup from "yup";
import { useVault } from "../context/VaultProvider";
import { useNavigate } from "react-router-dom";
const AddPasswords = ({ closeModel }) => {
  const { savePassword } = useVault();
  const { password } = usePassword();
  const handleClose = () => {};
  const navigate = useNavigate();

  const handelChange = (field, setFieldValues) => (e) => {
    setFieldValues("password", password);
    setFieldValues(field, e.target.value);
  };

  const handleClick = () => {
    closeModel(false);
  };

  const initialValues = {
    password: "",
    pName: "",
  };

  const validationSchema = yup.object({
    pName: yup.string().required("*Please provide a name for your password"),
    password: yup.string().required("password is required"),
  });

  const handleSubmit = (values) => {
    closeModel(false);
    savePassword(values);
    navigate("/vault");
    console.log(values);
  };

  const setValue = (field, setFeldVal, password) => {
    setFeldVal(field, password);
    return password;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => {
        return (
          <Form>
            <TextField
              className="w-100 my-3"
              disabled
              value={password}
              variant="outlined"
              label={"password"}
            />

            <div className="pass-names my-3">
              <TextField
                onChange={handelChange("pName", setFieldValue)}
                variant="outlined"
                label="Name"
                name="pName"
                className="w-100"
              />
              <ErrorMessage name="pName">
                {(msg) => {
                  return <p className="text-danger">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
            <Button
              type="submit"
              className="d-flex ml-auto"
              color="secondary"
              variant="contained"
            >
              Add
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPasswords;