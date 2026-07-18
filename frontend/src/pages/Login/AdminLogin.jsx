import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";


function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleLogin = (e) => {

    e.preventDefault();

    const normalizedUsername = username.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if(normalizedUsername === "admin" && normalizedPassword === "admin123") {

      setErrorMessage("");
      navigate("/admin-dashboard");

    } 
    else {

      setErrorMessage("Invalid username or password");

    }

  };


  return (

    <div className="admin-login-container">

      <div className="admin-login-card">

        <h1>Admin Login</h1>

        <p>
          FerroBid Document Management Portal
        </p>

        <p className="login-hint">Demo: admin / admin123</p>

        <form onSubmit={handleLogin}>


          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />


          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />


          <button type="submit">
            Login
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

        </form>


      </div>


    </div>

  );

}


export default AdminLogin;