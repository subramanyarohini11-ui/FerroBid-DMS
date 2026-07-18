import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function BuyerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      alert("Buyer login successful");
      navigate("/");
    } else {
      alert("Please enter your buyer credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1>Buyer Login</h1>
        <p>FerroBid Document Management Portal</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default BuyerLogin;