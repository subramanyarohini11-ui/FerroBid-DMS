import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function SubAdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const normalizedUsername = username.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (
      normalizedUsername === "subadmin" &&
      normalizedPassword === "subadmin123"
    ) {
      setErrorMessage("");
      navigate("/operations-dashboard");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1>Sub Admin Login</h1>

        <p className="portal-title">
          FerroBid Document Management System
        </p>

        <p className="login-hint">
          Demo Login: <strong>subadmin</strong> / <strong>subadmin123</strong>
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default SubAdminLogin;