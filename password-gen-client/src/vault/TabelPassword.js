import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";

import { formatDate, formatTime } from "./customdate";
import { usePassword } from "../context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import Launch from "@mui/icons-material/Launch";
import { useVault } from "../context/VaultProvider";
import axios from "axios";

const TabelPassword = ({ passwords, setModal }) => {
  const { copyToClipBoard } = usePassword();
  const { updatePass, isUpdating, headers } = useVault();

  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const handelClick = (_id) => async (e) => {
    console.log(_id);
    e.target.innerText = "....";
    const responce = await axios.get(
      `http://localhost:4500/vault/getPassword/${_id}`,
      {
        headers: headers,
      }
    );
    copyToClipBoard(responce.data.data.password);
    e.target.innerText = "Copied";

    setTimeout(() => {
      e.target.innerText = "copy";
    }, 2000);
    // <CircularProgress size="23px" />
  };
  useEffect(() => {
    let interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const modifieDate = (date) => {
    const newDate = new Date(date);

    var diff = Math.trunc(
      (currentDate.getTime() - newDate.getTime()) / 1000 / 60
    );

    if (diff < 1) {
      return "Just now";
    } else if (diff > 0 && diff <= 60) {
      return diff + "min ago";
    } else if (diff > 60 && diff < 1440) {
      return Math.trunc(diff / 60) + "hr ago";
    } else if (diff >= 1440) {
      return `${formatDate(newDate)}\n${formatTime(newDate)}`;
    }

    return <p>{}</p>;
  };

  const handleLinkClick = (_id) => () => {
    isUpdating({ isUpdating: true, _id });
    navigate("/home");
    console.log("clicked");
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ color: "white" }}>
            <TableRow>
              <TableCell>
                {" "}
                <h6>Website</h6>{" "}
              </TableCell>
              <TableCell>
                <h6> password</h6>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <h6>Last Modified</h6>{" "}
              </TableCell>
              <TableCell>
                <h6>Actions</h6>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="tableBody">
            {passwords.map((data, i) => (
              <TableRow key={i}>
                <TableCell>{data.pName}</TableCell>
                <TableCell>
                  <Button
                    onClick={handelClick(data._id)}
                    data-testid={`copy${i}`}
                    size="small"
                    variant="outlined"
                  >
                    copy
                  </Button>
                </TableCell>
                <TableCell>{modifieDate(data.date)}</TableCell>
                <TableCell>
                  <Button onClick={handleLinkClick(data._id)}>
                    change <Launch fontSize="inherit" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TabelPassword;
