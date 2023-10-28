import { Button, Card } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./restricted.css";
import forbiddenImage from "../assets/forbidden.jpg";
import { useRef } from "react";
import { useState } from "react";

import { KeyboardArrowLeft } from "@mui/icons-material";
const Restricted = () => {
  const ref = useRef(true);
  const [timmer, setTimmer] = useState("");
  useEffect(() => {
    if (ref.current) {
    }
  });
  return (
    <div className="restricted--wrapper container__column--center">
      <Card
        sx={{
          width: "50%",
          padding: "10px",
          position: "relative",
        }}
      >
        <div className="card__body  container__column--center">
          <h1 className="text--135">Access Denied </h1>
          <img src={forbiddenImage} alt="" />
          <p className="text--100 text-center">
            Since you have entred the wrong password for three times you cannot
            be able to access your account for next 24 hourrs
          </p>

          <Button variant="contained">
            <KeyboardArrowLeft /> Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Restricted;
