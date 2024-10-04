import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        toast.success("Login Successful");
        // alert(response.message);

        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || "Login Failed, Please Check Credentials"
        );
        // alert(errorData.message);
      }
    } catch (error) {
      console.log("Login Error", error);
      toast.error("An unexpected error occured, Please Try Again Later");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="USername"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
