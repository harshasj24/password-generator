import {
  Button,
  CircularProgress,
  IconButton,
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
import { useAuth } from "../context/AuthProvider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { Facebook, NavigateBefore, Twitter } from "@mui/icons-material";
import { links, checkLinks } from "./constant";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const TabelPassword = ({ passwords, setModal, search, handleModalOpen }) => {
  const { copyToClipBoard } = usePassword();
  const { updatePass, isUpdating, headers, setSelectedId, getOnePassword } =
    useVault();

  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const getPercentage = (value) => {
    return (value / 50) * 100;
  };

  const handelClick = (_id) => async (e) => {
    // console.log(_id);
    // e.target.innerText = "....";
    // const responce = await axios.get(
    //   `http://localhost:4500/vault/getPassword/${_id}`,
    //   {
    //     headers: headers,
    //   }
    // );
    // copyToClipBoard(responce.data.data.password);
    // e.target.innerText = "Copied";
    // setTimeout(() => {
    //   e.target.innerText = "copy";
    // }, 2000);
    // // <CircularProgress size="23px" />
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
  };

  const handleLinkClick = (_id, pName) => () => {
    isUpdating({ _id: _id, action: "edit", pName: pName });
    navigate("/access");
  };
  const getColor = (status) => {
    console.log(status);
    return status >= 12
      ? "success"
      : status > 5 && status <= 10
      ? "warning"
      : "error";
  };

  const handleDelete = (_id) => () => {
    isUpdating({ _id: _id, action: "delete" });
    navigate("/access");
  };
  return (
    <div>
      <TableContainer sx={{ height: "410px" }} component={Paper}>
        <Table stickyHeader>
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
                {" "}
                <h6>Status</h6>{" "}
              </TableCell>
              <TableCell>
                <h6>Actions</h6>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="tableBody">
            {passwords.filter((data) =>
              data.pName.toLowerCase().includes(search.toLowerCase())
            ).length > 0 ? (
              passwords
                .filter((data) =>
                  data.pName.toLowerCase().includes(search.toLowerCase())
                )
                .map((data, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      {data.pName}
                      {checkLinks(data.pName) && (
                        <a
                          className="ml-2"
                          target="_blank"
                          href={checkLinks(data.pName)?.link}
                        >
                          <LaunchIcon fontSize="inherit" />
                        </a>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={handleModalOpen(data._id)}
                        data-testid={`copy${i}`}
                        size="small"
                        variant="outlined"
                      >
                        view/copy
                      </Button>
                      {/* <IconButton
                      onClick={handleModalOpen(data._id)}
                      data-testid={`copy${i}`}
                      size="small"
                      variant="outlined"
                    >
                      <MoreHorizIcon />
                    </IconButton> */}
                    </TableCell>
                    <TableCell>{modifieDate(data.date)}</TableCell>
                    <TableCell>
                      <CircularProgressWithLabel
                        color={getColor(data.status)}
                        value={getPercentage(data.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={handleLinkClick(data._id, data.pName)}
                      >
                        <EditOutlinedIcon color="primary" fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={handleDelete(data._id)}
                        sx={{ ml: 2 }}
                        size="small"
                      >
                        <DeleteOutlineIcon color="error" fontSize="small" />
                      </IconButton>
                      {/* <Button onClick={handleLinkClick(data._id)}>
                    change <Launch fontSize="inherit" />
                  </Button> */}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TabelPassword;
