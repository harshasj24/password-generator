import React, { useEffect, useRef, useState } from "react";
import CustomModel from "./CustomModel";
import { useVault } from "../context/VaultProvider";
import TabelPassword from "./TabelPassword";
import vaultImage from "../assets/Image1.jpeg";
import "./vaultstyle.css";
import { usePassword } from "../context/ContextProvider";
import GetPassModel from "./GetPassModel";

import {
  Modal,
  Button,
  Card,
  CardHeader,
  IconButton,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
const Vault = () => {
  const { passwords, updatePass, updatePassword, getAllPasswords } = useVault();
  const { password } = usePassword();
  const isLoading = useRef(true);
  const [open, setOpen] = useState(false);
  const validationSchema = yup.object({
    password: yup.string().required("please provide password"),
  });
  const handelSubmit = (values) => {};
  useEffect(() => {
    if (isLoading.current) {
      isLoading.current = false;
      getAllPasswords();
    }
  }, []);

  return (
    <div className="main">
      <div className="banner">
        <h2 className="text-light mt-3">Welcome To Vault</h2>
      </div>
      <div className="table">
        <TabelPassword passwords={passwords} setModal={setOpen} />
      </div>

      <div className="model">
        <Modal open={open}>
          <div className="form d-flex align-items-center bg-light h-50 p-5 w-50 mx-auto justify-content-center flex-column">
            <h5 className="mb-5">
              Your password is encrypted!
              <br /> please provide your login password to procede
            </h5>
            <Formik
              initialValues={{ password: "" }}
              validationSchema={validationSchema}
              onSubmit={handelSubmit}
            >
              {({ setFieldValue }) => {
                return (
                  <Form className="w-100">
                    <TextField
                      className="w-100"
                      label="password"
                      onChange={(e) => {
                        setFieldValue("password", e.target.value);
                      }}
                      variant="outlined"
                    />
                    <Button className="my-3 d-flex ml-auto" variant="contained">
                      Get password
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Vault;
