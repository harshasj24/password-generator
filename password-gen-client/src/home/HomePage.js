import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  Modal,
  OutlinedInput,
  TextField,
  Tooltip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ErrorIcon from "@mui/icons-material/Error";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CryptoJS from "crypto-js";

import { lowerCaseAlpa, upperCaseAlpa, numbers, splChars } from "./charcters";
import React, { useContext, useEffect, useState } from "react";
import SliderComponent from "./SliderComponent";
import "./componentstyles.css";
import CustomizedSlider from "./CustomizedSlider";
import { usePassword } from "../context/ContextProvider";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { fontSize } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import AddPasswords from "../vault/AddPasswords";
import { useVault } from "../context/VaultProvider";
const HomePage = () => {
  // context
  const { sliderVal, password, setPassword } = usePassword();
  const { user } = useAuth();
  const { updatePass, updatePassword, isUpdating } = useVault();
  // hookes
  const navigate = useNavigate();
  // sates

  const [open, setOpen] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [genPass, setGenPass] = useState("");
  const [isChar, setIsChar] = useState({
    lowerCase: true,
    upperCase: true,
    numbers: true,
    splChars: true,
  });
  const [toolTipTitle, setToolTipTitle] = useState("Copy");
  // password generation logic
  const generatePassword = (length) => {
    let pass = new Object(); //object having array of characters

    // setting the key value pairs to objcet base don check boxes
    if (isChar.lowerCase) {
      pass["lowerCase"] = lowerCaseAlpa;
    }
    if (isChar.upperCase) {
      pass["upperCase"] = upperCaseAlpa;
    }
    if (isChar.numbers) {
      pass["numbers"] = numbers;
    }
    if (isChar.splChars) {
      pass["splChars"] = splChars;
    }

    let passNames = Object.keys(pass); //getting all keys in object
    let password = "";

    for (let i = 0; i < length; i++) {
      // random number for selecting array
      let passIndex = Math.floor(Math.random() * passNames.length);
      // random number for selecting array elements
      let char = Math.floor(Math.random() * pass[passNames[passIndex]].length);
      password += pass[passNames[passIndex]][char];
    }
    setPassword(password);
  };
  let isCharKey = Object.keys(isChar);
  // use effect hook
  useEffect(() => {
    generatePassword(sliderVal);
  }, [sliderVal, isChar, updatePass]);

  // setting the values based on the slider actions
  const setBasedOnSlider = (week, strong, bad) => {
    if (sliderVal > 5 && sliderVal <= 10) {
      return week;
    } else if (sliderVal > 10) {
      return strong;
    } else {
      return bad;
    }
  };

  // based on checkboxes update char satae
  let updateCharSate = (objKey) => {
    let falses = Object.values(isChar).filter((v) => v === false).length;
    console.log(falses);

    if (falses >= 3) {
      setIsChar({
        ...isChar,
        [objKey]: !isChar[objKey],
        lowerCase: true,
      });
    } else {
      setIsChar({
        ...isChar,
        [objKey]: !isChar[objKey],
      });
    }
  };

  // paasword refresh
  const handleRefreshButton = () => {
    let deg = rotate;
    deg += 180;
    generatePassword(sliderVal);
    setRotate(deg);
  };

  // copy to clipboard logic
  const copyToClipBoard = () => {
    navigator?.clipboard?.writeText(password || "");
    setToolTipTitle("Copied");
  };

  // setting the tooltip lable on mouse leave event
  const setTitleAfterOnleave = () => {
    setTimeout(() => {
      setToolTipTitle("Copy");
    }, 1000);
  };

  // model state
  const handelClose = () => {
    setOpen(false);
  };
  const handelOpen = () => {
    if (user) {
      setOpen(true);
    } else {
      navigate("/login");
    }
  };

  // updating the password
  const handelUpdate = () => {
    if (window.confirm("Do you want to change the password")) {
      updatePassword(password);
      navigate("/vault");
    } else {
      isUpdating({ isUpdating: false, _id: null });
    }
  };
  return (
    <div className="main-content">
      <Card
        style={{
          backgroundColor: `var(${setBasedOnSlider(
            "--weekPass",
            "--strongPass",
            "--badPass"
          )})`,
        }}
        elevation={1}
        className="pass-card"
      >
        <div className="password-display ">
          <div
            style={{
              fontSize: `calc(3rem - calc(${sliderVal}px / 2))`,
            }}
            className="password"
          >
            {password}
          </div>
          <IconButton
            data-testid="refresh"
            onClick={handleRefreshButton}
            className=" ml-auto"
          >
            <AutorenewIcon
              style={{ transform: `rotate(${rotate}deg)` }}
              className=" icons white"
            />
          </IconButton>
          {updatePass.isUpdating ? (
            <Button
              role={"button"}
              onClick={handelUpdate}
              variant="outlined"
              className="d-flex"
              sx={{ color: "white", border: "solid white" }}
            >
              Change
            </Button>
          ) : (
            <div className="password-icons ">
              <Tooltip placement="top" title={toolTipTitle}>
                <IconButton
                  data-testid="copy"
                  onMouseLeave={toolTipTitle !== "Copy" && setTitleAfterOnleave}
                  onClick={copyToClipBoard}
                >
                  <ContentCopyIcon className="icons white" />
                </IconButton>
              </Tooltip>

              <IconButton data-testid="add" onClick={handelOpen}>
                <AddCircleIcon className="icons white" />
              </IconButton>
            </div>
          )}
        </div>
        <div className="pass-status">
          {setBasedOnSlider(
            <ErrorOutlineIcon />,
            <CheckCircleOutlineIcon />,
            <ErrorIcon />
          )}
          {setBasedOnSlider("Week", "Strong", "Bad") + " password"}
        </div>
      </Card>
      <Card className="pass-options">
        <p>Use the slider below to set the length of your password</p>
        <p>Password Length [4-50]</p>
        <div className="slider">
          <CustomizedSlider></CustomizedSlider>
        </div>
        <div data-testid="checkBoxes" className="check-boxes">
          {isCharKey.map((key, index) => {
            return (
              <FormControlLabel
                className="label"
                key={index}
                control={
                  <Checkbox
                    onClick={() => {
                      updateCharSate(key);
                    }}
                    checked={isChar[key]}
                  />
                }
                label={
                  key === "upperCase"
                    ? "Uppercase"
                    : key === "lowerCase"
                    ? "Lowercase"
                    : key === "numbers"
                    ? "Number"
                    : "Symbols"
                }
              />
            );
          })}
        </div>
      </Card>
      {/* add pasword model */}
      <Modal data-testid="modal" open={open}>
        <div className="add-password w-50 bg-light mx-auto p-4">
          <div className="close-icon d-flex ml-auto">
            <IconButton
              data-testid="close"
              onClick={handelClose}
              className="ml-auto"
            >
              <CloseIcon />
            </IconButton>
          </div>
          <h4 className="mb-3">Save your password</h4>
          <AddPasswords closeModel={setOpen} />
        </div>
      </Modal>
    </div>
  );
};
export default HomePage;
