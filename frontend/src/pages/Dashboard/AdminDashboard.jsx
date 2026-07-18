import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function AdminDashboard() {

  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // Paste here 👇
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    }
  };
  const renderContent = () => {
    switch (activeMenu) {
      case "User Management":
        return (
          <>
            <h1>User Management</h1>
            <p className="module-description">
              Admin Portal – Full access to manage all data and users.
            </p>

            <div className="cards">
              <div className="card">
                <h3>Total Users</h3>
                <p>25</p>
              </div>
              <div className="card">
                <h3>Active Roles</h3>
                <p>3</p>
              </div>
            </div>

            <div className="module-box">
              <div className="module-header">
                <h2>User Records</h2>
                <button className="primary-btn">+ Add User</button>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Smith</td>
                    <td>john@example.com</td>
                    <td>Admin</td>
                    <td>Active</td>
                    <td>
                      <button className="link-btn">View</button>
                      <button className="link-btn">Edit</button>
                      <button className="link-btn">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Ravi Kumar</td>
                    <td>ravi@example.com</td>
                    <td>Sub-Admin</td>
                    <td>Active</td>
                    <td>
                      <button className="link-btn">View</button>
                      <button className="link-btn">Edit</button>
                      <button className="link-btn">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );
      case "Buyer Management":
        return (
          <>
            <h1>Buyer Management</h1>
            <p className="module-description">Manage buyer accounts and related records.</p>
            <div className="module-box">
              <div className="module-header">
                <h2>Buyer Records</h2>
                <button className="primary-btn">+ Add Buyer</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ashok Rao</td>
                    <td>Steel Works Ltd</td>
                    <td>Active</td>
                    <td>
                      <button className="link-btn">View</button>
                      <button className="link-btn">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );
      case "Seller Management":
        return (
          <>
            <h1>Seller Management</h1>
            <p className="module-description">Manage seller profiles and approvals.</p>
            <div className="module-box">
              <div className="module-header">
                <h2>Seller Records</h2>
                <button className="primary-btn">+ Add Seller</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Meera Patel</td>
                    <td>Iron Traders</td>
                    <td>Pending</td>
                    <td>
                      <button className="link-btn">View</button>
                      <button className="link-btn">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );
      case "Auction Catalog":
        return (
          <>
            <h1>Auction Catalog</h1>
            <p className="module-description">Manage auction listings and related catalog data.</p>

            <div className="cards">
              <div className="card">
                <h3>Active Auctions</h3>
                <p>8</p>
              </div>
              <div className="card">
                <h3>Catalog Items</h3>
                <p>120</p>
              </div>
            </div>

            <div className="module-box">
              <div className="module-header">
                <h2>Auction Catalog Records</h2>
                <button className="primary-btn">+ Add Catalog</button>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Catalog Name</th>
                    <th>Start Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Industrial Steel Auction</td>
                    <td>2026-07-20</td>
                    <td>Live</td>
                    <td>
                      <button className="link-btn">View</button>
                      <button className="link-btn">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Machinery Lot Catalog</td>
                    <td>2026-08-01</td>
                    <td>Upcoming</td>
                    <td>
                      <button className="link-btn">View</button>
                      <button className="link-btn">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );
      case "Auction Lots":
        return (
          <>
            <h1>Auction Lots</h1>
            <p className="module-description">Manage lots assigned to each auction catalog.</p>

            <div className="cards">
              <div className="card">
                <h3>Total Lots</h3>
                <p>42</p>
              </div>
              <div className="card">
                <h3>Pending Review</h3>
                <p>7</p>
              </div>
            </div>

            <div className="module-box">
              <div className="module-header">
                <h2>Lot Records</h2>
                <button className="primary-btn">+ Add Lot</button>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Lot Name</th>
                    <th>Catalog</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lot 101 - Heavy Machinery</td>
                    <td>Industrial Steel Auction</td>
                    <td>Active</td>
                    <td>
                      <button className="link-btn">View</button>
                      <button className="link-btn">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Lot 202 - Conveyor Unit</td>
                    <td>Machinery Lot Catalog</td>
                    <td>Pending</td>
                    <td>
                      <button className="link-btn">View</button>
                      <button className="link-btn">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );
      case "Document Management":
        return (
          <>
            <h1>Document Management</h1>
            <p className="module-description">Store, review, and manage uploaded documents.</p>

            <div className="cards">
              <div className="card">
                <h3>Total Documents</h3>
                <p>560</p>
              </div>
              <div className="card">
                <h3>Pending Approval</h3>
                <p>18</p>
              </div>
            </div>

            <div className="module-box">
              <div className="module-header">
                <h2>Document Records</h2>
                <button className="primary-btn">+ Upload Document</button>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Document Name</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Auction Agreement.pdf</td>
                    <td>Agreement</td>
                    <td>Approved</td>
                    <td>
                      <button className="link-btn">View</button>
                      <button className="link-btn">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Buyer KYC.docx</td>
                    <td>KYC</td>
                    <td>Pending</td>
                    <td>
                      <button className="link-btn">View</button>
                      <button className="link-btn">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );
      case "Reports":
        return (
          <>
            <h1>Reports</h1>
            <p className="module-description">View summary reports for users, auctions, and documents.</p>

            <div className="cards">
              <div className="card">
                <h3>Completed Reports</h3>
                <p>24</p>
              </div>
              <div className="card">
                <h3>Pending Reports</h3>
                <p>5</p>
              </div>
            </div>

            <div className="module-box">
              <div className="module-header">
                <h2>Report Records</h2>
                <button className="primary-btn">+ Generate Report</button>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Report Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>User Activity Summary</td>
                    <td>Users</td>
                    <td>Completed</td>
                    <td>
                      <button className="link-btn">View</button>
                      <button className="link-btn">Download</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Auction Performance</td>
                    <td>Auctions</td>
                    <td>Pending</td>
                    <td>
                      <button className="link-btn">View</button>
                      <button className="link-btn">Download</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );
      default:
        return (
          <>
            <h1>Welcome Admin</h1>
            <p className="module-description">
              Admin Portal – Full access to manage all data and users.
            </p>

            <div className="cards">
              <div className="card">
                <h3>Total Users</h3>
                <p>25</p>
              </div>

              <div className="card">
                <h3>Active Roles</h3>
                <p>3</p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
  <h2>FerroBid DMS</h2>

  <ul>
    <li onClick={() => setActiveMenu("Dashboard")}>
      Dashboard
    </li>

    <li onClick={() => setActiveMenu("User Management")}>
      User Management
    </li>

    <li onClick={() => setActiveMenu("Buyer Management")}>
      Buyer Management
    </li>

    <li onClick={() => setActiveMenu("Seller Management")}>
      Seller Management
    </li>

    <li onClick={() => setActiveMenu("Auction Catalog")}>
      Auction Catalog
    </li>

    <li onClick={() => setActiveMenu("Auction Lots")}>
      Auction Lots
    </li>

    <li onClick={() => setActiveMenu("Document Management")}>
      Document Management
    </li>

    <li onClick={() => setActiveMenu("Reports")}>
      Reports
    </li>

    <li
      onClick={handleLogout}
      style={{
        cursor: "pointer",
        color: "red",
        fontWeight: "bold",
      }}
    >
      Logout
    </li>
  </ul>
</div>

      <div className="main-content">{renderContent()}</div>
    </div>
  );
}

export default AdminDashboard;