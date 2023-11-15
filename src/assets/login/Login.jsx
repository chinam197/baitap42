import React from "react";
import { useState, useEffect } from "react";
import "./login.css";
import { client } from "../../config/client";
import Btnloading from "./Btnloading";
import "bootstrap/dist/css/bootstrap.min.css";
function Login({ onLogin }) {
  localStorage.removeItem("apiKey");
  const [form, Setform] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInformation = async (email) => {
    setLoading(true);
    const { response, data } = await client.get(`/api-key?email=${email}`);

    const status = response.ok;
    if (response.ok) {
      localStorage.setItem("apiKey", JSON.stringify(data.data.apiKey));
      onLogin(status);
      setLoading(false);
      return;
    }
    setLoading(false);
    alert("Đăng nhập thất bại");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email } = form;
    handleInformation(email);
  };
  const handleChange = (e) => {
    Setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-login">
      <form action="" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          onChange={handleChange}
          className="login-email"
        />
        {loading ? (
          <Btnloading />
        ) : (
          <button className="btn btn-primary">Login...</button>
        )}
      </form>
    </div>
  );
}

export default Login;
