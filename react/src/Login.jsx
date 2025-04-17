import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         const decoded = jwtDecode(token);
    //         if (decoded.role === "admin") {
    //             navigate("/admin-dashboard");
    //         } else {
    //             navigate("/user-dashboard");
    //         }
    //     }
    // }, [navigate]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decoded = jwtDecode(token);
            if (decoded.role === "admin") {
              navigate("/admin-dashboard");
            } else {
              navigate("/user-dashboard");
            }
          } catch (err) {
            console.error("Invalid token", err);
            localStorage.removeItem("token");
          }
        }
      }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/login", {
                username,
                password
            });

            localStorage.setItem("token", response.data.token);

            const decoded = jwtDecode(response.data.token);
            if (decoded.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/user-dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <button onClick={handleLogout} style={{ marginTop: "10px" }}>Logout</button>
        </div>
    );
};

export default Login;
