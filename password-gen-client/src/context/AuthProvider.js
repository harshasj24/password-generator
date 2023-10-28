import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/UseLocalStorage";
import axios from "axios";
import { useVault } from "./VaultProvider";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedin] = useState(false);
  const [user, setUser] = useLocalStorage("user", null);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const login = async (userDetails) => {
    setUser(userDetails);
    console.log(userDetails, "auth-provider");
  };
  const logout = async () => {
    setUser(null);
    // console.log(responce);
  };
  const value = useMemo(() => {
    return { user, login, logout, setUser };
  }, [user, login]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
