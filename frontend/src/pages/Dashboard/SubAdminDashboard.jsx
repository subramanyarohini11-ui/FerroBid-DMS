import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import {
  uploadApproval,
  getApprovalRecords,
  uploadLotLetter,
  getLotRecords,
  uploadAccountDetails,
  getAccountRecords,
  uploadEmdDocument,
  getEmdRecords,
} from "../../services/api";

function SubAdminDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [approvalCompany, setApprovalCompany] = useState("");
  const [approvalFile, setApprovalFile] = useState(null);
  const [approvalRecords, setApprovalRecords] = useState([]);
  const [approvalResetKey, setApprovalResetKey] = useState(0);

  const [lotCompany, setLotCompany] = useState("");
  const [lotFile, setLotFile] = useState(null);
  const [lotRecords, setLotRecords] = useState([]);
  const [lotResetKey, setLotResetKey] = useState(0);
  const isLotFormValid = Boolean(lotCompany.trim()) && Boolean(lotFile);

  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountCompany, setAccountCompany] = useState("");
  const [accountFile, setAccountFile] = useState(null);
  const [accountRecords, setAccountRecords] = useState([]);
  const [accountResetKey, setAccountResetKey] = useState(0);

  const [emdName, setEmdName] = useState("");
  const [emdCompany, setEmdCompany] = useState("");
  const [emdFile, setEmdFile] = useState(null);
  const [emdRecords, setEmdRecords] = useState([]);
  const [emdResetKey, setEmdResetKey] = useState(0);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/subadmin-login", { replace: true });
    }
  };

  const buildFileUrl = (item) => {
    if (!item) return "#";
    if (item.fileURL) return item.fileURL;
    if (item.filePath) {
      return item.filePath.startsWith("http") ? item.filePath : `http://localhost:5000${item.filePath}`;
    }
    return "#";
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [approvalResponse, lotResponse, accountResponse, emdResponse] = await Promise.all([
          getApprovalRecords(),
          getLotRecords(),
          getAccountRecords(),
          getEmdRecords(),
        ]);

        setApprovalRecords((approvalResponse.data || []).map((item) => ({ ...item, fileURL: buildFileUrl(item) })));
        setLotRecords((lotResponse.data || []).map((item) => ({ ...item, fileURL: buildFileUrl(item) })));
        setAccountRecords((accountResponse.data || []).map((item) => ({ ...item, fileURL: buildFileUrl(item) })));
        setEmdRecords((emdResponse.data || []).map((item) => ({ ...item, fileURL: buildFileUrl(item) })));
      } catch (error) {
        console.error("Failed to load subadmin records", error);
      }
    };

    loadData();
  }, []);

  const addApprovalRecord = async () => {
    if (!approvalCompany || !approvalFile) {
      alert("Please enter company name and upload the approval letter.");
      return;
    }

    try {
      const response = await uploadApproval(approvalCompany, approvalFile);
      const savedRecord = { ...response.data.record, fileURL: buildFileUrl(response.data.record) };
      setApprovalRecords((prev) => [...prev, savedRecord]);
      setApprovalCompany("");
      setApprovalFile(null);
      setApprovalResetKey((prev) => prev + 1);
      alert("Approval letter uploaded successfully.");
    } catch (error) {
      alert("Failed to upload approval letter.");
      console.error(error);
    }
  };

  const addLotRecord = async () => {
    if (!lotCompany || !lotFile) {
      alert("Please enter company name and upload the lot configuration letter.");
      return;
    }

    try {
      const response = await uploadLotLetter(lotCompany, lotFile);
      const savedRecord = { ...response.data.record, fileURL: buildFileUrl(response.data.record) };
      setLotRecords((prev) => [...prev, savedRecord]);
      setLotCompany("");
      setLotFile(null);
      setLotResetKey((prev) => prev + 1);
      alert("Lot configuration letter uploaded successfully.");
    } catch (error) {
      alert("Failed to upload lot configuration letter.");
      console.error(error);
    }
  };

  const addAccountRecord = async () => {
    if (!accountHolderName || !accountCompany || !accountFile) {
      alert("Please enter account holder name, company name, and upload the document.");
      return;
    }

    try {
      const response = await uploadAccountDetails(accountHolderName, accountCompany, accountFile);
      const savedRecord = { ...response.data.record, fileURL: buildFileUrl(response.data.record) };
      setAccountRecords((prev) => [...prev, savedRecord]);
      setAccountHolderName("");
      setAccountCompany("");
      setAccountFile(null);
      setAccountResetKey((prev) => prev + 1);
      alert("Account details uploaded successfully.");
    } catch (error) {
      alert("Failed to upload account details.");
      console.error(error);
    }
  };

  const addEmdRecord = async () => {
    if (!emdName || !emdCompany || !emdFile) {
      alert("Please enter document name, company name, and upload the EMD document.");
      return;
    }

    try {
      const response = await uploadEmdDocument(emdName, emdCompany, emdFile);
      const savedRecord = { ...response.data.record, fileURL: buildFileUrl(response.data.record) };
      setEmdRecords((prev) => [...prev, savedRecord]);
      setEmdName("");
      setEmdCompany("");
      setEmdFile(null);
      setEmdResetKey((prev) => prev + 1);
      alert("EMD document uploaded successfully.");
    } catch (error) {
      alert("Failed to upload EMD document.");
      console.error(error);
    }
  };

  const renderContent = () => {
    if (activeMenu === "Approval Letter") {
      return (
        <>
          <h1>Approval Letter</h1>
          <p className="module-description">Upload approval letters for companies and review the uploaded records.</p>

          <div className="module-box">
            <h2>Upload Approval Letter</h2>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter company name"
                value={approvalCompany}
                onChange={(e) => setApprovalCompany(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Upload Approval Letter</label>
              <input
                key={approvalResetKey}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setApprovalFile(e.target.files[0])}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "22px" }}>
              <button type="button" className="primary-btn" onClick={addApprovalRecord} style={{ margin: 0 }}>
                Add Approval Letter
              </button>
            </div>
          </div>

          <div className="module-box">
            <h2>Approval Letter Records</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Company Name</th>
                  <th>Approval Letter</th>
                </tr>
              </thead>
              <tbody>
                {approvalRecords.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      No approval letters uploaded yet.
                    </td>
                  </tr>
                ) : (
                  approvalRecords.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.companyName}</td>
                      <td>
                        <a href={item.fileURL} target="_blank" rel="noreferrer">
                          {item.fileName}
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      );
    }

    if (activeMenu === "Lot Configuration Letter") {
      return (
        <>
          <h1>Lot Configuration Letter</h1>
          <p className="module-description">Upload lot configuration letters and view them in the table below.</p>

          <div className="module-box">
            <h2>Upload Lot Configuration Letter</h2>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter company name"
                value={lotCompany}
                onChange={(e) => setLotCompany(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Upload Lot Configuration Letter</label>
              <input
                key={lotResetKey}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setLotFile(e.target.files[0])}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "22px" }}>
              <button
                type="button"
                className="primary-btn"
                onClick={addLotRecord}
                style={{ margin: 0, opacity: isLotFormValid ? 1 : 0.6 }}
                disabled={!isLotFormValid}
              >
                Add Lot Configuration Letter
              </button>
            </div>
          </div>

          <div className="module-box">
            <h2>Lot Configuration Letter Records</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Company Name</th>
                  <th>Lot Configuration Letter</th>
                </tr>
              </thead>
              <tbody>
                {lotRecords.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      No lot configuration letters uploaded yet.
                    </td>
                  </tr>
                ) : (
                  lotRecords.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.companyName}</td>
                      <td>
                        <a href={item.fileURL} target="_blank" rel="noreferrer">
                          {item.fileName}
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      );
    }

    if (activeMenu === "Account Details") {
      return (
        <>
          <h1>Account Details</h1>
          <p className="module-description">Upload account holder details and bank or account proof documents.</p>

          <div className="module-box">
            <h2>Upload Account Details</h2>
            <div className="form-group">
              <label>Account Holder Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter account holder name"
                value={accountHolderName}
                onChange={(e) => setAccountHolderName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter company name"
                value={accountCompany}
                onChange={(e) => setAccountCompany(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Upload Account Photo / Bank Details</label>
              <input
                key={accountResetKey}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setAccountFile(e.target.files[0])}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "22px" }}>
              <button type="button" className="primary-btn" onClick={addAccountRecord} style={{ margin: 0 }}>
                Add Account Details
              </button>
            </div>
          </div>

          <div className="module-box">
            <h2>Account Details Records</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Account Holder</th>
                  <th>Company Name</th>
                  <th>Document</th>
                </tr>
              </thead>
              <tbody>
                {accountRecords.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No account details uploaded yet.
                    </td>
                  </tr>
                ) : (
                  accountRecords.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.accountHolderName}</td>
                      <td>{item.companyName}</td>
                      <td>
                        <a href={item.fileURL} target="_blank" rel="noreferrer">
                          {item.fileName}
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      );
    }

    if (activeMenu === "EMD Documents") {
      return (
        <>
          <h1>EMD Documents</h1>
          <p className="module-description">Upload EMD documents and keep them available in the records table.</p>

          <div className="module-box">
            <h2>Upload EMD Document</h2>
            <div className="form-group">
              <label>Document Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter document name"
                value={emdName}
                onChange={(e) => setEmdName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter company name"
                value={emdCompany}
                onChange={(e) => setEmdCompany(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Upload EMD Document</label>
              <input
                key={emdResetKey}
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={(e) => setEmdFile(e.target.files[0])}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "22px" }}>
              <button type="button" className="primary-btn" onClick={addEmdRecord} style={{ margin: 0 }}>
                Add EMD Document
              </button>
            </div>
          </div>

          <div className="module-box">
            <h2>EMD Document Records</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Document Name</th>
                  <th>Company Name</th>
                  <th>Document</th>
                </tr>
              </thead>
              <tbody>
                {emdRecords.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No EMD documents uploaded yet.
                    </td>
                  </tr>
                ) : (
                  emdRecords.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.documentName}</td>
                      <td>{item.companyName}</td>
                      <td>
                        <a href={item.fileURL} target="_blank" rel="noreferrer">
                          {item.fileName}
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      );
    }

    return (
      <>
        <h1>Welcome Operation Executive</h1>
        <p className="module-description">Manage approval letters, lot configuration letters, account details, and EMD documents from one place.</p>

        <div className="cards">
          <div className="card">
            <h3>Approval Letters</h3>
            <p>{approvalRecords.length}</p>
          </div>
          <div className="card">
            <h3>Lot Configuration Letters</h3>
            <p>{lotRecords.length}</p>
          </div>
          <div className="card">
            <h3>Account Details</h3>
            <p>{accountRecords.length}</p>
          </div>
          <div className="card">
            <h3>EMD Documents</h3>
            <p>{emdRecords.length}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>FerroBid Subadmin</h2>
        <ul>
          <li onClick={() => setActiveMenu("Dashboard")}>Dashboard</li>
          <li onClick={() => setActiveMenu("Approval Letter")}>Approval Letter</li>
          <li onClick={() => setActiveMenu("Lot Configuration Letter")}>Lot Configuration Letter</li>
          <li onClick={() => setActiveMenu("Account Details")}>Account Details</li>
          <li onClick={() => setActiveMenu("EMD Documents")}>EMD Documents</li>
          <li onClick={handleLogout} style={{ color: "#fda4af", fontWeight: "bold" }}>
            Logout
          </li>
        </ul>
      </div>

      <div className="main-content">{renderContent()}</div>
    </div>
  );
}

export default SubAdminDashboard;
