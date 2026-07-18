import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    if (role === "admin") {
      navigate("/admin-login");
    } else if (role === "subadmin") {
      navigate("/subadmin-login");
    } else {
      navigate("/operations-login");
    }
  };

  return (
    <div className="home-container">
      <div className="left-section">
        <h1>FerroBid</h1>
        <h2>Document Management Portal</h2>
        <p>
          A secure internal portal for management teams, operations staff,
          and administrative users.
        </p>

        <ul>
          <li>✔ Admin Management</li>
          <li>✔ Subadmin Support</li>
          <li>✔ Operations Tracking</li>
          <li>✔ Workflow Coordination</li>
          <li>✔ Document Access</li>
          <li>✔ Team Reports</li>
        </ul>
      </div>

      <div className="right-section">
        <h3 className="role-title">Choose your role to continue</h3>

        <div className="login-card">
          <h3>👨‍💼 Admin</h3>
          <p>Manage system settings, users, and platform controls.</p>
          <button type="button" onClick={() => handleSelectRole("admin")}>Login as Admin</button>
        </div>

        <div className="login-card">
          <h3>🛠️ Sub-Admin</h3>
          <p>Handle approvals, internal support, and team operations.</p>
          <button type="button" onClick={() => handleSelectRole("subadmin")}>Login as Sub-Admin</button>
        </div>

        <div className="login-card">
          <h3>📋 Operations Executive</h3>
          <p>Track workflow updates and daily execution tasks.</p>
          <button type="button" onClick={() => handleSelectRole("operations")}>Login as Operations Executive</button>
        </div>
      </div>
    </div>
  );
}

export default Home;