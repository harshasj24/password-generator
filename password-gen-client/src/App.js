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
function App() {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname !== "/login" && pathname !== "/signUp" && <NavBar />}
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signUp" element={<Auth />} />
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
  );
}

export default App;
