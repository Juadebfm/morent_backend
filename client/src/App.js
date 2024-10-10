import "./index.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import CarDetails from "./pages/CarDetails/CarDetails";
import CategoryFilter from "./pages/CategoryFilter/CategoryFilter";
import { AuthProvider } from "./context/authContext";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ProtectedRoutes from "./lib/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/car/:id"
              element={
                <ProtectedRoutes>
                  <CarDetails />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/categoryfilter"
              element={
                <ProtectedRoutes>
                  <CategoryFilter />
                </ProtectedRoutes>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
