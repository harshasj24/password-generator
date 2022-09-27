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
function App() {
  const { pathname } = useLocation();

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
