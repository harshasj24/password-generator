import { Alert, Button, Snackbar, TextField } from "@mui/material";
import React from "react";
import "./passwordpage.css";
import ShieldIcon from "@mui/icons-material/Shield";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthProvider";
import { useVault } from "../context/VaultProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePassword } from "../context/ContextProvider";
const vlaidationSchema = Yup.object({
  password: Yup.string().required("Password enter the password"),
});
const PasswordPage = () => {
  const { user } = useAuth();
  const { setisloading } = usePassword();
  const {
    updatePass,
    isUpdating,
    checkPassword,
    deletePassword,
    snackbar,
    handleSnackbar,
  } = useVault();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: user?.email,
      password: "",
    },
    enableReinitialize: true,
    vlaidationSchema: { ...vlaidationSchema },
    onSubmit: async (values) => {
      console.log(values);

      setisloading(true);
      const responce = await checkPassword(values);
      setisloading(false);
      if (responce) {
        if (updatePass?.action === "edit") {
          isUpdating({ isUpdating: true });
          navigate("/home");
        } else if (updatePass?.action === "delete") {
          navigate("/vault");
          deletePassword();
        }
      } else {
        isUpdating({ isUpdating: false });
        setOpen(true);
        setisloading(false);
      }
    },
  });
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="password--wrapper">
      <div className="password-form">
        <ShieldIcon sx={{ fontSize: "3rem" }} className="mx-auto" />
        <p className="password-form__header">Confirm access</p>
        <form action="" onSubmit={formik.handleSubmit}>
          <p>Please Enter Your Pasword</p>
          <TextField
            InputLabelProps={{
              shrink: false,
            }}
            fullWidth
            variant="outlined"
            size="small"
            label=" "
            name="password"
            onChange={formik.handleChange}
            type={"password"}
          />
          <Button
            className="mt-4"
            variant="contained"
            fullWidth
            type="submit"
            color="success"
          >
            Confirm Password
          </Button>
        </form>
        <p className="disclaimer">
          Warning: Please note that you cannot able to change or delete your
          saved passwords for 24 hours if you have enterd the password wrongly
          for three times
        </p>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Invalid Password
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PasswordPage;
