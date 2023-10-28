import "./App.css";
import HomePage from "./home/HomePage";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import NavBar from "./shared/NavBar";
import Vault from "./vault/Vault";
import Login from "./auth/Login";
import ProctectedRoute from "./proctected/ProctectedRoute";
import Auth from "./auth/Auth";
import AddPasswords from "./vault/AddPasswords";
import PasswordPage from "./password-page/PasswordPage";
import Restricted from "./errors/Restricted";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthProvider";
function App() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let navigateToRes = null;
  // interceptors
  axios.interceptors.request.use(
    (config) => {
      console.log("interceptors called");
      if (user) {
        config.headers["Authorization"] = "barrer " + user.token;
      }
      return config;
    },
    (error) => {
      console.log(error);
    }
  );
  axios.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response.status === 403) {
        navigateToRes();
      }
      console.log(error.response.status);
    }
  );
  useEffect(() => {
    console.log("callled use effect");
    navigateToRes = () => {
      navigate("/");
    };
  });
  return (
    <div className="app--wrapper">
      <div className="nav-bar">
        {pathname !== "/login" && pathname !== "/signUp" && <NavBar />}
      </div>
      <div className="app-body">
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signUp" element={<Auth />} />
          <Route path="/access" element={<PasswordPage />} />
          <Route path="/restricted" element={<Restricted />} />
          <Route
            path="/vault"
            element={
              <ProctectedRoute>
                <Vault />
              </ProctectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
