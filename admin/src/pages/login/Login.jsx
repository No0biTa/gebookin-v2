import React, { useState, useContext } from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import "./login.scss";

import logo from "../../assets/Logo GeBookIn .png";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://gebookin-api.onrender.com/api/v1/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    }  catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ERROR" });
      }, 5000);
    }
  };

  return (
      <div className="login">
        <div className="lContainer">
          <div className="logoContainer">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <form onSubmit={handleLogin} className="formContainer">
            <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                onChange={handleChange}
                className="lInput"
            />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                className="lInput"
            />
            <button type="submit" disabled={loading} onClick={handleLogin} className="lButton">
              Login
            </button>
            {error && (
                <div className="errorContainer">
                  <span className="error">{error.message}</span>
                </div>)}
          </form>
        </div>
      </div>
  );
};

export default Login;
