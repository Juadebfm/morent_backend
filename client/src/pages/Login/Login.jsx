import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginImg from "../../assets/images/car_login.jpg";
import "./Login.scss";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://morent-backend-zeta.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        login(data);
        toast.success("Login Successful", {
          onClose: () => {
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
          },
        });
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || "Login Failed, Please Check Credentials"
        );
      }
    } catch (error) {
      console.log("Login Error", error);
      toast.error("An unexpected error occurred, Please Try Again Later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login_container">
      <div className="right">
        <img src={LoginImg} alt="" />
      </div>
      <div className="left">
        <form onSubmit={handleSubmit}>
          <span>Login - Sign In</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </form>
        <div className="link">
          No Account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
