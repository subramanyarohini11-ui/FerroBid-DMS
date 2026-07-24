import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function OperationsLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (normalizedUsername === "operations" && normalizedPassword === "operations123") {
      setErrorMessage("");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "operations");
      navigate("/subadmin");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1>Operations Executive Login</h1>
        <p>FerroBid Document Management Portal</p>
        <p className="login-hint">Demo: operations / operations123</p>

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

          <button type="submit">Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default OperationsLogin;