import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, NavLink } from "react-router-dom";
import "./shared.css";
import LoginIcon from "@mui/icons-material/Login";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthProvider";
import { LinearProgress, Tooltip } from "@mui/material";
import { useVault } from "../context/VaultProvider";
import { usePassword } from "../context/ContextProvider";
import HomeIcon from "@mui/icons-material/Home";
const NavBar = () => {
  const { logout, user } = useAuth();
  const { pathname } = useLocation();
  const { setPasswords } = useVault();
  const { isLoading } = usePassword();
  console.log(pathname);

  const handelLogout = () => {
    logout();
    setPasswords([]);
  };
  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar
    //     className="app-bar"
    //     sx={{
    //       backgroundColor: "white",
    //       height: "63px",
    //     }}
    //     position="static"
    //   >
    //     <Toolbar>
    //       <Typography
    //         variant="h6"
    //         component="div"
    //         sx={{ flexGrow: 1, color: "black" }}
    //       >
    //         <Link className="link home" to={"/home"}>
    //           HOME
    //         </Link>
    //       </Typography>
    //       <Link to={"/vault"}>
    //         <IconButton>
    //           <LockIcon sx={{ color: "black" }} />
    //         </IconButton>
    //       </Link>
    //       {!user ? (
    //         <Tooltip arrow title={"Login"}>
    //           <Link to={"/login"}>
    //             <IconButton sx={{ color: "black" }}>
    //               <LoginIcon />
    //             </IconButton>
    //           </Link>
    //         </Tooltip>
    //       ) : (
    //         <Tooltip arrow title={"Logout"}>
    //           <Link to={"/"}>
    //             <IconButton onClick={handelLogout} sx={{ color: "black" }}>
    //               <LogoutIcon />
    //             </IconButton>
    //           </Link>
    //         </Tooltip>
    //       )}
    //     </Toolbar>
    //   </AppBar>
    //   <LinearProgress hidden={!isLoading} />
    // </Box>
    <header>
      <NavLink
        className={(state) => (state.isActive ? "active" : "text-dark")}
        to={"/home"}
      >
        <IconButton color="inherit">
          <HomeIcon color="inherit" />
        </IconButton>
      </NavLink>
      <NavLink
        className={(state) => (state.isActive ? "active" : "text-dark")}
        to={"/vault"}
      >
        <IconButton color="inherit">
          <LockIcon color="inherit" />
        </IconButton>
      </NavLink>
      {!user ? (
        <Tooltip arrow title={"Login"}>
          <NavLink to={"/login"}>
            <IconButton>
              <LoginIcon />
            </IconButton>
          </NavLink>
        </Tooltip>
      ) : (
        <Tooltip arrow title={"Logout"}>
          <Link to={"/"}>
            <IconButton onClick={handelLogout} sx={{ color: "black" }}>
              <LogoutIcon />
            </IconButton>
          </Link>
        </Tooltip>
      )}
    </header>
  );
};

export default NavBar;
