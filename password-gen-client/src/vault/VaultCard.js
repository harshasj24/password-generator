import { Card } from "@mui/material";
import React from "react";
import "./vaultcard.css";
const VaultCard = ({ title, length, color }) => {
  return (
    <div className="card--wrapper">
      <Card
        sx={{
          borderLeft: `5px solid ${color}`,
        }}
        className="d-card"
      >
        <div className="card-content">
          <div className="left-content">
            <h6>{title}</h6>
            <p>Password</p>
          </div>
          <div className="right-content">{length}</div>
        </div>
      </Card>
    </div>
  );
};

export default VaultCard;
