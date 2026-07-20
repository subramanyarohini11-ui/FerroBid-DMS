import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getBuyers,
  createBuyer,
  updateBuyer,
  deleteBuyer,
  getSellers,
  createSeller,
  updateSeller,
  deleteSeller,
  getCatalogs as getAdminCatalogs,
  createCatalog,
  updateCatalog,
  deleteCatalog,
  getLots,
  createLot,
  updateLot,
  deleteLot,
  getDocuments as getAdminDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getReports,
  createReport,
  deleteReport,
} from "../../services/api";

function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", status: "Active" });

  const [documents, setDocuments] = useState([]);

  const [reports, setReports] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    }
  };

  const [buyers, setBuyers] = useState([]);
  const [editingBuyer, setEditingBuyer] = useState(null);
  const [newBuyer, setNewBuyer] = useState({ name: "", company: "", status: "Active" });

  const loadAdminData = async () => {
    try {
      const [usersResponse, buyersResponse, sellersResponse, catalogsResponse, lotsResponse, documentsResponse, reportsResponse] = await Promise.all([
        getUsers(),
        getBuyers(),
        getSellers(),
        getAdminCatalogs(),
        getLots(),
        getAdminDocuments(),
        getReports(),
      ]);

      setUsers((usersResponse.data || []).map((item) => ({ ...item, status: item.status || "Active" })));
      setBuyers((buyersResponse.data || []).map((item) => ({ ...item, status: item.status || "Active" })));
      setSellers((sellersResponse.data || []).map((item) => ({ ...item, status: item.status || "Active" })));
      setCatalogs((catalogsResponse.data || []).map((item) => ({ ...item, status: item.status || "Upcoming" })));
      setLots((lotsResponse.data || []).map((item) => ({ ...item, status: item.status || "Pending" })));
      setDocuments((documentsResponse.data || []).map((item) => ({ ...item, status: item.status || "Pending" })));
      setReports((reportsResponse.data || []).map((item) => ({ ...item, status: item.status || "Completed" })));
    } catch (error) {
      console.error("Failed to load admin data", error);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleAddBuyer = async (e) => {
    e.preventDefault();
    if (!newBuyer.name || !newBuyer.company) {
      alert("Name and Company are required");
      return;
    }
    try {
      const response = await createBuyer({ name: newBuyer.name, company: newBuyer.company, status: newBuyer.status });
      setBuyers((prev) => [...prev, response.data.record]);
      setNewBuyer({ name: "", company: "", status: "Active" });
      alert("Buyer saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to save buyer.");
    }
  };

  const handleEditBuyerClick = (buyer) => setEditingBuyer({ ...buyer });
  const handleEditBuyerChange = (field, value) => setEditingBuyer((prev) => ({ ...prev, [field]: value }));
  const handleSaveEditedBuyer = async () => {
    try {
      const response = await updateBuyer(editingBuyer.id, editingBuyer);
      setBuyers((prev) => prev.map((b) => (b.id === editingBuyer.id ? response.data.record : b)));
      setEditingBuyer(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update buyer.");
    }
  };
  const handleDeleteBuyer = async (id) => {
    if (!window.confirm("Delete this buyer?")) return;
    try {
      await deleteBuyer(id);
      setBuyers((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete buyer.");
    }
  };
  const handleViewBuyer = (buyer) => {
    alert(`Buyer details:\nName: ${buyer.name}\nCompany: ${buyer.company}\nStatus: ${buyer.status}`);
  };

  const [sellers, setSellers] = useState([]);
  const [editingSeller, setEditingSeller] = useState(null);
  const [newSeller, setNewSeller] = useState({ name: "", company: "", status: "Active" });

  const handleAddSeller = async (e) => {
    e.preventDefault();
    if (!newSeller.name || !newSeller.company) {
      alert("Name and Company are required");
      return;
    }
    try {
      const response = await createSeller({ name: newSeller.name, company: newSeller.company, status: newSeller.status });
      setSellers((prev) => [...prev, response.data.record]);
      setNewSeller({ name: "", company: "", status: "Active" });
      alert("Seller saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to save seller.");
    }
  };

  const handleEditSellerClick = (seller) => setEditingSeller({ ...seller });
  const handleEditSellerChange = (field, value) => setEditingSeller((prev) => ({ ...prev, [field]: value }));
  const handleSaveEditedSeller = async () => {
    try {
      const response = await updateSeller(editingSeller.id, editingSeller);
      setSellers((prev) => prev.map((s) => (s.id === editingSeller.id ? response.data.record : s)));
      setEditingSeller(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update seller.");
    }
  };
  const handleDeleteSeller = async (id) => {
    if (!window.confirm("Delete this seller?")) return;
    try {
      await deleteSeller(id);
      setSellers((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete seller.");
    }
  };
  const handleViewSeller = (seller) => {
    alert(`Seller details:\nName: ${seller.name}\nCompany: ${seller.company}\nStatus: ${seller.status}`);
  };

  const [catalogs, setCatalogs] = useState([]);
  const [editingCatalog, setEditingCatalog] = useState(null);
  const [newCatalog, setNewCatalog] = useState({ name: "", startDate: "", status: "Upcoming" });

  const handleAddCatalog = async (e) => {
    e.preventDefault();
    if (!newCatalog.name || !newCatalog.startDate) {
      alert("Catalog Name and Start Date are required");
      return;
    }
    try {
      const response = await createCatalog({ name: newCatalog.name, startDate: newCatalog.startDate, status: newCatalog.status });
      setCatalogs((prev) => [...prev, response.data.record]);
      setNewCatalog({ name: "", startDate: "", status: "Upcoming" });
      alert("Catalog saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to save catalog.");
    }
  };

  const handleEditCatalogClick = (catalog) => setEditingCatalog({ ...catalog });
  const handleEditCatalogChange = (field, value) => setEditingCatalog((prev) => ({ ...prev, [field]: value }));
  const handleSaveEditedCatalog = async () => {
    try {
      const response = await updateCatalog(editingCatalog.id, editingCatalog);
      setCatalogs((prev) => prev.map((c) => (c.id === editingCatalog.id ? response.data.record : c)));
      setEditingCatalog(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update catalog.");
    }
  };
  const handleViewCatalog = (catalog) => {
    alert(`Catalog details:\nName: ${catalog.name}\nStart Date: ${catalog.startDate}\nStatus: ${catalog.status}`);
  };

  const handleDeleteCatalog = async (id) => {
    if (!window.confirm("Delete this catalog?")) return;
    try {
      await deleteCatalog(id);
      setCatalogs((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete catalog.");
    }
  };

  const [lots, setLots] = useState([]);
  const [editingLot, setEditingLot] = useState(null);
  const [newLot, setNewLot] = useState({ name: "", catalog: "", status: "Pending" });

  const handleAddLot = async (e) => {
    e.preventDefault();
    if (!newLot.name || !newLot.catalog) {
      alert("Lot Name and Catalog are required");
      return;
    }
    try {
      const response = await createLot({ name: newLot.name, catalog: newLot.catalog, status: newLot.status });
      setLots((prev) => [...prev, response.data.record]);
      setNewLot({ name: "", catalog: "", status: "Pending" });
      alert("Lot saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to save lot.");
    }
  };

  const handleEditLotClick = (lot) => setEditingLot({ ...lot });
  const handleEditLotChange = (field, value) => setEditingLot((prev) => ({ ...prev, [field]: value }));
  const handleSaveEditedLot = async () => {
    try {
      const response = await updateLot(editingLot.id, editingLot);
      setLots((prev) => prev.map((l) => (l.id === editingLot.id ? response.data.record : l)));
      setEditingLot(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update lot.");
    }
  };
  const handleViewLot = (lot) => {
    alert(`Lot details:\nName: ${lot.name}\nCatalog: ${lot.catalog}\nStatus: ${lot.status}`);
  };
  const handleDeleteLot = async (id) => {
    if (!window.confirm("Delete this lot?")) return;
    try {
      await deleteLot(id);
      setLots((prev) => prev.filter((l) => l.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete lot.");
    }
  };

  const handleUploadDocument = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await createDocument({ name: file.name, category: file.name.toLowerCase().includes("kyc") ? "KYC" : "Other", status: "Pending", file });
      setDocuments((prev) => [...prev, response.data.record]);
      e.target.value = "";
      alert("Document uploaded successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to upload document.");
    }
  };

  const handleViewDocument = (doc) => {
    alert(`Document:\nName: ${doc.name}\nCategory: ${doc.category}\nStatus: ${doc.status}`);
  };

  const handleEditDocument = async (doc) => {
    const newStatus = doc.status === "Approved" ? "Pending" : "Approved";
    try {
      const response = await updateDocument(doc.id, { ...doc, status: newStatus });
      setDocuments((prev) => prev.map((d) => (d.id === doc.id ? response.data.record : d)));
    } catch (error) {
      console.error(error);
      alert("Failed to update document.");
    }
  };

  const handleDeleteDocument = async (id) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete document.");
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await createReport({ name: `Auto Report #${Date.now()}`, type: "Users", status: "Completed" });
      setReports((prev) => [...prev, response.data.record]);
    } catch (error) {
      console.error(error);
      alert("Failed to generate report.");
    }
  };

  const handleViewReport = (report) => {
    alert(`Report:\nName: ${report.name}\nType: ${report.type}\nStatus: ${report.status}`);
  };

  const handleDownloadReport = (report) => {
    const csvContent = `Name,Type,Status\n${report.name},${report.type},${report.status}\n`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${report.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDeleteReport = async (id) => {
    if (!window.confirm("Delete this report?")) return;
    try {
      await deleteReport(id);
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete report.");
    }
  };

  const handleViewUser = (user) => {
    alert(`User details:\nName: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nStatus: ${user.status}`);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      alert("Name and Email are required");
      return;
    }
    try {
      const response = await createUser({ name: newUser.name, email: newUser.email, role: newUser.role, status: newUser.status });
      setUsers((prev) => [...prev, response.data.record]);
      setNewUser({ name: "", email: "", role: "", status: "Active" });
      alert("User saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to save user.");
    }
  };

  const handleEditUserClick = (user) => setEditingUser({ ...user });
  const handleEditUserChange = (field, value) => setEditingUser((prev) => ({ ...prev, [field]: value }));
  const handleSaveEditedUser = async () => {
    try {
      const response = await updateUser(editingUser.id, editingUser);
      setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? response.data.record : u)));
      setEditingUser(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update user.");
    }
  };
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "User Management":
        return (
          <>
            <h1>User Management</h1>
            <p className="module-description">Admin Portal – Full access to manage all data and users.</p>

            <div className="cards">
              <div className="card">
                <h3>Total Users</h3>
                <p>{users.length}</p>
              </div>
              <div className="card">
                <h3>Active Roles</h3>
                <p>3</p>
              </div>
            </div>

            <div className="module-box">
              <div className="module-header">
                <h2>User Records</h2>
              </div>

              <form className="user-form" onSubmit={handleAddUser}>
                <h3>Add User</h3>
                <input type="text" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))} />
                <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))} />
                <input type="text" placeholder="Role" value={newUser.role} onChange={(e) => setNewUser((prev) => ({ ...prev, role: e.target.value }))} />
                <button type="submit" className="primary-btn">+ Add User</button>
              </form>

              {editingUser && (
                <div className="edit-user-box">
                  <h3>Edit User</h3>
                  <input type="text" value={editingUser.name} onChange={(e) => handleEditUserChange("name", e.target.value)} />
                  <input type="email" value={editingUser.email} onChange={(e) => handleEditUserChange("email", e.target.value)} />
                  <input type="text" value={editingUser.role} onChange={(e) => handleEditUserChange("role", e.target.value)} />
                  <select value={editingUser.status} onChange={(e) => handleEditUserChange("status", e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <button className="primary-btn" onClick={handleSaveEditedUser}>Save</button>
                  <button className="link-btn" onClick={() => setEditingUser(null)}>Cancel</button>
                </div>
              )}

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
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                      <td>
                        <button className="link-btn" onClick={() => handleViewUser(user)}>View</button>
                        <button className="link-btn" onClick={() => handleEditUserClick(user)}>Edit</button>
                        <button className="link-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
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

            <div className="cards">
              <div className="card">
                <h3>Total Buyers</h3>
                <p>{buyers.length}</p>
              </div>
              <div className="card">
                <h3>Active Buyers</h3>
                <p>{buyers.filter((b) => b.status === "Active").length}</p>
              </div>
            </div>

            <div className="module-box">
              <div className="module-header">
                <h2>Buyer Records</h2>
              </div>

              <form className="user-form" onSubmit={handleAddBuyer}>
                <h3>Add Buyer</h3>
                <input type="text" placeholder="Name" value={newBuyer.name} onChange={(e) => setNewBuyer((prev) => ({ ...prev, name: e.target.value }))} />
                <input type="text" placeholder="Company" value={newBuyer.company} onChange={(e) => setNewBuyer((prev) => ({ ...prev, company: e.target.value }))} />
                <select value={newBuyer.status} onChange={(e) => setNewBuyer((prev) => ({ ...prev, status: e.target.value }))}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <button type="submit" className="primary-btn">+ Add Buyer</button>
              </form>

              {editingBuyer && (
                <div className="edit-user-box">
                  <h3>Edit Buyer</h3>
                  <input type="text" value={editingBuyer.name} onChange={(e) => handleEditBuyerChange("name", e.target.value)} />
                  <input type="text" value={editingBuyer.company} onChange={(e) => handleEditBuyerChange("company", e.target.value)} />
                  <select value={editingBuyer.status} onChange={(e) => handleEditBuyerChange("status", e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <button className="primary-btn" onClick={handleSaveEditedBuyer}>Save</button>
                  <button className="link-btn" onClick={() => setEditingBuyer(null)}>Cancel</button>
                </div>
              )}

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
                  {buyers.map((buyer) => (
                    <tr key={buyer.id}>
                      <td>{buyer.name}</td>
                      <td>{buyer.company}</td>
                      <td>{buyer.status}</td>
                      <td>
                        <button className="link-btn" onClick={() => handleViewBuyer(buyer)}>View</button>
                        <button className="link-btn" onClick={() => handleEditBuyerClick(buyer)}>Edit</button>
                        <button className="link-btn" onClick={() => handleDeleteBuyer(buyer.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
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

            <div className="cards">
              <div className="card">
                <h3>Total Sellers</h3>
                <p>{sellers.length}</p>
              </div>
              <div className="card">
                <h3>Pending Sellers</h3>
                <p>{sellers.filter((s) => s.status === "Pending").length}</p>
              </div>
            </div>

            <div className="module-box">
              <div className="module-header">
                <h2>Seller Records</h2>
              </div>

              <form className="user-form" onSubmit={handleAddSeller}>
                <h3>Add Seller</h3>
                <input type="text" placeholder="Name" value={newSeller.name} onChange={(e) => setNewSeller((prev) => ({ ...prev, name: e.target.value }))} />
                <input type="text" placeholder="Company" value={newSeller.company} onChange={(e) => setNewSeller((prev) => ({ ...prev, company: e.target.value }))} />
                <select value={newSeller.status} onChange={(e) => setNewSeller((prev) => ({ ...prev, status: e.target.value }))}>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <button type="submit" className="primary-btn">+ Add Seller</button>
              </form>

              {editingSeller && (
                <div className="edit-user-box">
                  <h3>Edit Seller</h3>
                  <input type="text" value={editingSeller.name} onChange={(e) => handleEditSellerChange("name", e.target.value)} />
                  <input type="text" value={editingSeller.company} onChange={(e) => handleEditSellerChange("company", e.target.value)} />
                  <select value={editingSeller.status} onChange={(e) => handleEditSellerChange("status", e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <button className="primary-btn" onClick={handleSaveEditedSeller}>Save</button>
                  <button className="link-btn" onClick={() => setEditingSeller(null)}>Cancel</button>
                </div>
              )}

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
                  {sellers.map((seller) => (
                    <tr key={seller.id}>
                      <td>{seller.name}</td>
                      <td>{seller.company}</td>
                      <td>{seller.status}</td>
                      <td>
                        <button className="link-btn" onClick={() => handleViewSeller(seller)}>View</button>
                        <button className="link-btn" onClick={() => handleEditSellerClick(seller)}>Edit</button>
                        <button className="link-btn" onClick={() => handleDeleteSeller(seller.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
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
                <p>{catalogs.filter((c) => c.status === "Live").length}</p>
              </div>
              <div className="card">
                <h3>Catalog Items</h3>
                <p>{catalogs.length}</p>
              </div>
            </div>

            <div className="module-box">
              <div className="module-header">
                <h2>Auction Catalog Records</h2>
              </div>

              <form className="user-form" onSubmit={handleAddCatalog}>
                <h3>Add Catalog</h3>
                <input type="text" placeholder="Catalog Name" value={newCatalog.name} onChange={(e) => setNewCatalog((prev) => ({ ...prev, name: e.target.value }))} />
                <input type="date" value={newCatalog.startDate} onChange={(e) => setNewCatalog((prev) => ({ ...prev, startDate: e.target.value }))} />
                <select value={newCatalog.status} onChange={(e) => setNewCatalog((prev) => ({ ...prev, status: e.target.value }))}>
                  <option value="Live">Live</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>
                <button type="submit" className="primary-btn">+ Add Catalog</button>
              </form>

              {editingCatalog && (
                <div className="edit-user-box">
                  <h3>Edit Catalog</h3>
                  <input type="text" value={editingCatalog.name} onChange={(e) => handleEditCatalogChange("name", e.target.value)} />
                  <input type="date" value={editingCatalog.startDate} onChange={(e) => handleEditCatalogChange("startDate", e.target.value)} />
                  <select value={editingCatalog.status} onChange={(e) => handleEditCatalogChange("status", e.target.value)}>
                    <option value="Live">Live</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button className="primary-btn" onClick={handleSaveEditedCatalog}>Save</button>
                  <button className="link-btn" onClick={() => setEditingCatalog(null)}>Cancel</button>
                </div>
              )}

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
                  {catalogs.map((catalog) => (
                    <tr key={catalog.id}>
                      <td>{catalog.name}</td>
                      <td>{catalog.startDate}</td>
                      <td>{catalog.status}</td>
                      <td>
                        <button className="link-btn" onClick={() => handleViewCatalog(catalog)}>View</button>
                        <button className="link-btn" onClick={() => handleEditCatalogClick(catalog)}>Edit</button>
                      </td>
                    </tr>
                  ))}
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
                <p>{lots.length}</p>
              </div>
              <div className="card">
                <h3>Pending Review</h3>
                <p>{lots.filter((l) => l.status === "Pending").length}</p>
              </div>
            </div>

            <div className="module-box">
              <div className="module-header">
                <h2>Lot Records</h2>
              </div>

              <form className="user-form" onSubmit={handleAddLot}>
                <h3>Add Lot</h3>
                <input type="text" placeholder="Lot Name" value={newLot.name} onChange={(e) => setNewLot((prev) => ({ ...prev, name: e.target.value }))} />
                <input type="text" placeholder="Catalog" value={newLot.catalog} onChange={(e) => setNewLot((prev) => ({ ...prev, catalog: e.target.value }))} />
                <select value={newLot.status} onChange={(e) => setNewLot((prev) => ({ ...prev, status: e.target.value }))}>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Sold">Sold</option>
                </select>
                <button type="submit" className="primary-btn">+ Add Lot</button>
              </form>

              {editingLot && (
                <div className="edit-user-box">
                  <h3>Edit Lot</h3>
                  <input type="text" value={editingLot.name} onChange={(e) => handleEditLotChange("name", e.target.value)} />
                  <input type="text" value={editingLot.catalog} onChange={(e) => handleEditLotChange("catalog", e.target.value)} />
                  <select value={editingLot.status} onChange={(e) => handleEditLotChange("status", e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Sold">Sold</option>
                  </select>
                  <button className="primary-btn" onClick={handleSaveEditedLot}>Save</button>
                  <button className="link-btn" onClick={() => setEditingLot(null)}>Cancel</button>
                </div>
              )}

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
                  {lots.map((lot) => (
                    <tr key={lot.id}>
                      <td>{lot.name}</td>
                      <td>{lot.catalog}</td>
                      <td>{lot.status}</td>
                      <td>
                        <button className="link-btn" onClick={() => handleViewLot(lot)}>View</button>
                        <button className="link-btn" onClick={() => handleEditLotClick(lot)}>Edit</button>
                        <button className="link-btn" onClick={() => handleDeleteLot(lot.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
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
                <p>{documents.length}</p>
              </div>
              <div className="card">
                <h3>Pending Approval</h3>
                <p>{documents.filter((d) => d.status === "Pending").length}</p>
              </div>
            </div>

            <div className="module-box">
              <div className="module-header">
                <h2>Document Records</h2>
                <label className="primary-btn">
                  + Upload Document
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleUploadDocument}
                  />
                </label>
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
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.name}</td>
                      <td>{doc.category}</td>
                      <td>{doc.status}</td>
                      <td>
                        <button className="link-btn" onClick={() => handleViewDocument(doc)}>View</button>
                        <button className="link-btn" onClick={() => handleEditDocument(doc)}>Toggle Status</button>
                        <button className="link-btn" onClick={() => handleDeleteDocument(doc.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
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
                <p>{reports.filter((r) => r.status === "Completed").length}</p>
              </div>
              <div className="card">
                <h3>Pending Reports</h3>
                <p>{reports.filter((r) => r.status === "Pending").length}</p>
              </div>
            </div>

            <div className="module-box">
              <div className="module-header">
                <h2>Report Records</h2>
                <button className="primary-btn" onClick={handleGenerateReport}>
                  + Generate Report
                </button>
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
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.name}</td>
                      <td>{report.type}</td>
                      <td>{report.status}</td>
                      <td>
                        <button className="link-btn" onClick={() => handleViewReport(report)}>View</button>
                        <button className="link-btn" onClick={() => handleDownloadReport(report)}>Download</button>
                        <button className="link-btn" onClick={() => handleDeleteReport(report.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      default:
        return <h1>Welcome to Admin Dashboard</h1>;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActiveMenu("Dashboard")}>Dashboard</li>
          <li onClick={() => setActiveMenu("User Management")}>User Management</li>
          <li onClick={() => setActiveMenu("Buyer Management")}>Buyer Management</li>
          <li onClick={() => setActiveMenu("Seller Management")}>Seller Management</li>
          <li onClick={() => setActiveMenu("Auction Catalog")}>Auction Catalog</li>
          <li onClick={() => setActiveMenu("Auction Lots")}>Auction Lots</li>
          <li onClick={() => setActiveMenu("Document Management")}>Document Management</li>
          <li onClick={() => setActiveMenu("Reports")}>Reports</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
}

export default AdminDashboard;