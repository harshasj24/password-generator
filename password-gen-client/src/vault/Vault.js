import React, { useEffect, useRef, useState } from "react";
import CustomModel from "./CustomModel";
import { useVault } from "../context/VaultProvider";
import TabelPassword from "./TabelPassword";
import vaultImage from "../assets/Image1.jpeg";
import "./vaultstyle.css";
import { usePassword } from "../context/ContextProvider";
import GetPassModel from "./GetPassModel";
import SearchIcon from "@mui/icons-material/Search";
import {
  Modal,
  Button,
  Card,
  CardHeader,
  IconButton,
  TextField,
  SwipeableDrawer,
  InputAdornment,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import SwipeableEdgeDrawer from "./SwipeableEdgeDrawer";
import VaultCard from "./VaultCard";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth } from "../context/AuthProvider";
import { LockOpen, LockOutlined } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AddPasswords from "./AddPasswords";
import { useNavigate } from "react-router-dom";

const Vault = () => {
  const {
    passwords,
    updatePass,
    getAllPasswords,
    checkPassword,
    getOnePassword,
    snackbar,
    handleSnackbar,
    modalDetails,
    handleModalDetails,
    savePassword,
  } = useVault();
  const { password, copyToClipBoard } = usePassword();
  const navigate = useNavigate();
  const isLoading = useRef(true);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [confirmAccess, setConfirmAccess] = useState(false);
  const [grantedAccess, setGrantedAccess] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  // const [modalDetails, setModalDetails] = useState({
  //   open: false,
  //   _id: null,
  //   type: "",
  // });
  const [vaultPassword, setVaultPassword] = useState({
    open: null,
    password: "",
  });

  const [typePassword, setTypePassword] = useState(true);
  const initialValues = {
    password: "",
    pName: "",
  };

  const validationSchema = yup.object({
    pName: yup.string().required("*Please provide a name for your password"),
    password: yup.string().required("password is required"),
  });
  const handelChange = (field, setFieldValues) => (e) => {
    setFieldValues(field, e.target.value);
    console.log(e.target.value);
  };
  const handleSubmit = (values) => {
    savePassword(values);
    handleClose();
    handleSnackbar(true, "Password Added Sucessfully");
  };

  const handleViewCopy = (type) => async () => {
    if (grantedAccess && !vaultPassword.password) {
      const responce = await getOnePassword(modalDetails._id);
      console.log(responce);
      if (responce.status === 200) {
        if (type === "view") {
          setVaultPassword({
            ...vaultPassword,
            open: true,
            password: responce.data.data.password,
          });
        } else if (type === "copy") {
          copyToClipBoard(responce.data.data.password);
          setVaultPassword({
            ...vaultPassword,
            password: responce.data.data.password,
          });
        }
      }
    } else {
      if (grantedAccess && type === "copy") {
        copyToClipBoard(vaultPassword.password);
      } else if (grantedAccess && type === "view") {
        setVaultPassword({
          ...vaultPassword,
          open: true,
        });
      } else {
        setConfirmAccess(true);
      }
    }
  };

  useEffect(() => {
    if (isLoading.current) {
      isLoading.current = false;
      getAllPasswords();
    }
  }, [snackbar]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleModalOpen = (_id) => () => {
    handleModalDetails({ ...modalDetails, open: true, _id, type: "view" });
  };
  const handleClose = () => {
    handleModalDetails({
      ...modalDetails,
      open: false,
      type: "",
    });
    setVaultPassword({ open: false, password: "" });
    setGrantedAccess(false);
    setConfirmAccess(false);
  };

  const handleDone = async () => {
    const payload = {
      email: user?.email,
      password: loginPassword,
    };
    const responce = await checkPassword(payload);
    if (responce) {
      setConfirmAccess(false);
      setGrantedAccess(true);
    } else {
      setConfirmAccess(true);
      alert("sede");
    }
  };

  const handleChange = (type) => (e) => {
    if (type === "search") {
      setSearch(e.target.value);
    }
    if (type === "login password") {
      setLoginPassword(e.target.value);
    }
  };

  const getLenth = (data, status) => {
    if (status === "strong") {
      console.log(data.filter((val) => val.status >= 12));
      return data.filter((val) => val.status >= 12).length;
    } else if (status === "week") {
      return data.filter((val) => val.status > 5 && val.status <= 10).length;
    } else if (status === "bad") {
      return data.filter((val) => val.status < 6).length;
    } else {
      return data.length;
    }
  };
  const passCard = [
    {
      title: "All",
      length: getLenth(passwords, ""),
      color: "#9fccf5",
    },
    {
      title: "Strong",
      length: getLenth(passwords, "strong"),
      color: "#73ba72",
    },
    {
      title: "Week",
      length: getLenth(passwords, "week"),
      color: "#f67c54",
    },
    {
      title: "Bad",
      length: getLenth(passwords, "bad"),
      color: "#f56551",
    },
  ];
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div className="vault--wrapper">
      <div className="container">
        <div className="vault-header">
          <h3>Welcome, {user?.fName + " " + user.lName}</h3>
          <div className="search-filed">
            <TextField
              size="small"
              label=" "
              placeholder="search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={handleChange("search")}
            />
          </div>
        </div>
        <div className="vault-cards-section p-2">
          {passCard.map((val) => {
            return (
              <VaultCard
                title={val.title}
                length={val.length}
                color={val?.color}
              />
            );
          })}
        </div>

        <div className="vault-body__table mt-2">
          <TabelPassword
            search={search}
            passwords={passwords}
            setModal={setOpen}
            handleModalOpen={handleModalOpen}
          />
        </div>
      </div>
      {/* <div className="banner">
        <h2 className="text-light mt-3">Welcome To Vault</h2>
        <Button
          className="but"
          variant="outlined"
          sx={{ width: "180px" }}
          onClick={handleOpen}
        >
          Show Passwords
        </Button>
      </div>
      <div className="table">
        {/* <TabelPassword passwords={passwords} setModal={setOpen} /> */}
      {/* <SwipeableEdgeDrawer
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
        />
      </div>  */}

      <Modal open={modalDetails.open}>
        <div className="vault-modal--wrapper">
          {modalDetails.type === "view" && (
            <div className="vault-modal">
              <div className="vault-modal__header">Password Options</div>
              <div className="vault-modal__body">
                <div className="body__icons d-flex">
                  {!confirmAccess ? (
                    <div>
                      {grantedAccess ? (
                        <LockOpen color="success" sx={{ fontSize: "3rem" }} />
                      ) : (
                        <LockOutlined color="error" sx={{ fontSize: "3rem" }} />
                      )}
                    </div>
                  ) : (
                    <div className="container-layout__column">
                      <p className="text-center">
                        Please confirm your password
                      </p>
                      <div className="text-field container-layout__row ">
                        <TextField
                          variant="outlined"
                          size="small"
                          label=" "
                          placeholder="password"
                          type={"password"}
                          onChange={handleChange("login password")}
                          InputLabelProps={{ shrink: false }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                <div>
                                  <IconButton onClick={handleDone}>
                                    <DoneIcon />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => {
                                      setConfirmAccess(false);
                                    }}
                                  >
                                    <CloseIcon />
                                  </IconButton>
                                </div>
                              </InputAdornment>
                            ),
                          }}
                        />
                        {/* <IconButton onClick={handleDone}>
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setConfirmAccess(false);
                        }}
                      >
                        <CloseIcon />
                      </IconButton> */}
                      </div>
                    </div>
                  )}
                </div>
                <div className="body__actions d-flex flex-column ">
                  {vaultPassword.open ? (
                    <div>
                      <TextField
                        type={typePassword ? "password" : "text"}
                        size="small"
                        disabled
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <IconButton
                                onClick={() => {
                                  setTypePassword(!typePassword);
                                }}
                              >
                                {typePassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{ shrink: false }}
                        label=" "
                      />
                    </div>
                  ) : (
                    <Button
                      onClick={handleViewCopy("view")}
                      size="small"
                      variant="contained"
                    >
                      View Password
                    </Button>
                  )}
                  <Button
                    onClick={handleViewCopy("copy")}
                    size="small"
                    variant="contained"
                    color="success"
                  >
                    Copy Password
                  </Button>
                </div>
              </div>
              <div className="vault-modal__footer">
                <Button
                  onClick={handleClose}
                  className="footer_btn"
                  size="small"
                  variant="contained"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
          {modalDetails.type === "add" && (
            <div className="add__modal bg-light">
              <div className="add-modal__header">
                <p>Add Your Custom Password</p>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
              <div className="add-modal__body">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
                >
                  {({ setFieldValue }) => {
                    return (
                      <Form>
                        <div className="form__body">
                          <TextField
                            className=" my-3"
                            variant="outlined"
                            label="password"
                            name="password"
                            onChange={handelChange("password", setFieldValue)}
                            fullWidth
                          />
                          <ErrorMessage name="password">
                            {(msg) => {
                              return <p className="text-danger">{msg}</p>;
                            }}
                          </ErrorMessage>

                          <div className="pass-names my-3">
                            <TextField
                              onChange={handelChange("pName", setFieldValue)}
                              variant="outlined"
                              label="Name"
                              name="pName"
                              className="w-100"
                              fullWidth
                            />
                            <ErrorMessage name="pName">
                              {(msg) => {
                                return <p className="text-danger">{msg}</p>;
                              }}
                            </ErrorMessage>
                          </div>
                        </div>
                        <div className="vault-modal__footer">
                          <Button
                            type="submit"
                            className="d-flex ml-auto"
                            color="secondary"
                            variant="contained"
                          >
                            add
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Snackbar
        autoHideDuration={6000}
        open={snackbar.open}
        onClose={() => {
          handleSnackbar(false, "");
        }}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
      >
        <Alert action={action} severity="success">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Vault;
