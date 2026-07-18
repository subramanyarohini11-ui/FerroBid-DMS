import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function OperationsDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    }
  };
  const [buyerName, setBuyerName] = useState("");
const [buyerCompany, setBuyerCompany] = useState("");
const [buyerContact, setBuyerContact] = useState("");
const [gstFile, setGstFile] = useState(null);
const [bankFile, setBankFile] = useState(null);
const [panFile, setPanFile] = useState(null);
const [aadhaarFile, setAadhaarFile] = useState(null);
const [kycFile, setKycFile] = useState(null);
const [chequeFile, setChequeFile] = useState(null);
const [buyers, setBuyers] = useState([]);

const handleSaveBuyer = () => {
  if (
    !buyerName ||
    !buyerCompany ||
    !buyerContact ||
    !gstFile ||
    !bankFile ||
    !panFile ||
    !aadhaarFile ||
    !kycFile ||
    !chequeFile
  ) {
    alert("Please fill all fields and upload all documents.");
    return;
  }

  const newBuyer = {
    id: Date.now(),
    name: buyerName,
    company: buyerCompany,
    contact: buyerContact,
    gstFile: gstFile.name,
    gstURL: URL.createObjectURL(gstFile),
    bankFile: bankFile.name,
    bankURL: URL.createObjectURL(bankFile),
    panFile: panFile.name,
    panURL: URL.createObjectURL(panFile),
    aadhaarFile: aadhaarFile.name,
    aadhaarURL: URL.createObjectURL(aadhaarFile),
    kycFile: kycFile.name,
    kycURL: URL.createObjectURL(kycFile),
    chequeFile: chequeFile.name,
    chequeURL: URL.createObjectURL(chequeFile),
  };

  setBuyers([...buyers, newBuyer]);

  setBuyerName("");
  setBuyerCompany("");
  setBuyerContact("");
  setGstFile(null);
  setBankFile(null);
  setPanFile(null);
  setAadhaarFile(null);
  setKycFile(null);
  setChequeFile(null);

  alert("Buyer saved successfully.");
};

const [sellerName, setSellerName] = useState("");
const [sellerCompany, setSellerCompany] = useState("");
const [sellerContact, setSellerContact] = useState("");
const [sellerGstFile, setSellerGstFile] = useState(null);
const [sellerBankFile, setSellerBankFile] = useState(null);
const [sellerPanFile, setSellerPanFile] = useState(null);
const [sellerAadhaarFile, setSellerAadhaarFile] = useState(null);
const [sellerKycFile, setSellerKycFile] = useState(null);
const [sellerChequeFile, setSellerChequeFile] = useState(null);
const [sellers, setSellers] = useState([]);

const handleSaveSeller = () => {
  if (
    !sellerName ||
    !sellerCompany ||
    !sellerContact ||
    !sellerGstFile ||
    !sellerBankFile ||
    !sellerPanFile ||
    !sellerAadhaarFile ||
    !sellerKycFile ||
    !sellerChequeFile
  ) {
    alert("Please fill all fields and upload all documents.");
    return;
  }

  const newSeller = {
    id: Date.now(),
    name: sellerName,
    company: sellerCompany,
    contact: sellerContact,
    gstFile: sellerGstFile.name,
    gstURL: URL.createObjectURL(sellerGstFile),
    bankFile: sellerBankFile.name,
    bankURL: URL.createObjectURL(sellerBankFile),
    panFile: sellerPanFile.name,
    panURL: URL.createObjectURL(sellerPanFile),
    aadhaarFile: sellerAadhaarFile.name,
    aadhaarURL: URL.createObjectURL(sellerAadhaarFile),
    kycFile: sellerKycFile.name,
    kycURL: URL.createObjectURL(sellerKycFile),
    chequeFile: sellerChequeFile.name,
    chequeURL: URL.createObjectURL(sellerChequeFile),
  };

  setSellers([...sellers, newSeller]);

  setSellerName("");
  setSellerCompany("");
  setSellerContact("");
  setSellerGstFile(null);
  setSellerBankFile(null);
  setSellerPanFile(null);
  setSellerAadhaarFile(null);
  setSellerKycFile(null);
  setSellerChequeFile(null);

  alert("Seller saved successfully.");
};

  // Auction Catalog States
  const [catalogName, setCatalogName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [catalogFile, setCatalogFile] = useState(null);
  const [catalogs, setCatalogs] = useState([]);

  // Save Catalog
  const handleSaveCatalog = () => {
    if (!catalogName || !companyName || !catalogFile) {
      alert("Please fill all fields.");
      return;
    }

    const newCatalog = {
      id: Date.now(),
      catalogName,
      companyName,
      fileName: catalogFile.name,
      fileURL: URL.createObjectURL(catalogFile),
    };

    setCatalogs([...catalogs, newCatalog]);

    setCatalogName("");
    setCompanyName("");
    setCatalogFile(null);

    alert("Catalog uploaded successfully.");
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "Buyer Management":
  return (
    <>
      <h1>Buyer Management</h1>
      <p className="module-description">
        Manage buyer accounts and related records.
      </p>

      <div className="module-box">
        <h2>Add New Buyer</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Buyer Name"
            className="form-input"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            className="form-input"
            value={buyerCompany}
            onChange={(e) => setBuyerCompany(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>GST Certificate</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setGstFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Bank Details</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setBankFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>PAN Card</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setPanFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Aadhaar Card</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setAadhaarFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>KYC Document</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setKycFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Cancelled Cheque</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setChequeFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Contact Details</label>
          <input
            type="text"
            placeholder="Enter Contact Number"
            className="form-input"
            value={buyerContact}
            onChange={(e) => setBuyerContact(e.target.value)}
          />
        </div>

        <button className="primary-btn" onClick={handleSaveBuyer}>
          Save Buyer
        </button>
      </div>

      <br />

      <div className="module-box">
        <h2>Buyer Records</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Company</th>
              <th>GST Certificate</th>
              <th>Bank Details</th>
              <th>PAN Card</th>
              <th>Aadhar Card</th>
              <th>KYC Document</th>
              <th>Cancelled Cheque</th>
              <th>Contact Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buyers.length === 0 ? (
              <tr>
                <td colSpan="11" style={{ textAlign: "center" }}>
                  No Buyer Records
                </td>
              </tr>
            ) : (
              buyers.map((buyer, index) => (
                <tr key={buyer.id}>
                  <td>{index + 1}</td>
                  <td>{buyer.name}</td>
                  <td>{buyer.company}</td>
                  <td>
                    {buyer.gstFile ? (
                      <a href={buyer.gstURL} target="_blank" rel="noreferrer">
                        {buyer.gstFile}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {buyer.bankFile ? (
                      <a href={buyer.bankURL} target="_blank" rel="noreferrer">
                        {buyer.bankFile}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {buyer.panFile ? (
                      <a href={buyer.panURL} target="_blank" rel="noreferrer">
                        {buyer.panFile}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {buyer.aadhaarFile ? (
                      <a
                        href={buyer.aadhaarURL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {buyer.aadhaarFile}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {buyer.kycFile ? (
                      <a href={buyer.kycURL} target="_blank" rel="noreferrer">
                        {buyer.kycFile}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {buyer.chequeFile ? (
                      <a
                        href={buyer.chequeURL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {buyer.chequeFile}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{buyer.contact}</td>
                  <td>
                    <button className="link-btn">View</button>
                    <button className="link-btn">Download</button>
                    <button className="link-btn">Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );

      case "Seller Management":
  return (
    <>
      <h1>Seller Management</h1>
      <p className="module-description">
        Manage seller profiles and approvals.
      </p>

      <div className="module-box">
        <h2>Add New Seller</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Seller Name"
            className="form-input"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            className="form-input"
            value={sellerCompany}
            onChange={(e) => setSellerCompany(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>GST Certificate</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setSellerGstFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Bank Details</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setSellerBankFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>PAN Card</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setSellerPanFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Aadhaar Card</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setSellerAadhaarFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>KYC Document</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setSellerKycFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Cancelled Cheque</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setSellerChequeFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Contact Details</label>
          <input
            type="text"
            placeholder="Enter Contact Number"
            className="form-input"
            value={sellerContact}
            onChange={(e) => setSellerContact(e.target.value)}
          />
        </div>

        <button className="primary-btn" onClick={handleSaveSeller}>
          Save Seller
        </button>
      </div>

      <br />

      <div className="module-box">
        <h2>Seller Records</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Company</th>
              <th>GST Certificate</th>
              <th>Bank Details</th>
              <th>PAN Card</th>
              <th>Aadhar Card</th>
              <th>KYC Document</th>
              <th>Cancelled Cheque</th>
              <th>Contact Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.length === 0 ? (
              <tr>
                <td colSpan="11" style={{ textAlign: "center" }}>
                  No Seller Records
                </td>
              </tr>
            ) : (
              sellers.map((seller, index) => (
                <tr key={seller.id}>
                  <td>{index + 1}</td>
                  <td>{seller.name}</td>
                  <td>{seller.company}</td>
                  <td>
                    {seller.gstFile ? (
                      <a href={seller.gstURL} target="_blank" rel="noreferrer">
                        {seller.gstFile}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {seller.bankFile ? (
                      <a href={seller.bankURL} target="_blank" rel="noreferrer">
                        {seller.bankFile}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {seller.panFile ? (
                      <a href={seller.panURL} target="_blank" rel="noreferrer">
                        {seller.panFile}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {seller.aadhaarFile ? (
                      <a
                        href={seller.aadhaarURL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {seller.aadhaarFile}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {seller.kycFile ? (
                      <a href={seller.kycURL} target="_blank" rel="noreferrer">
                        {seller.kycFile}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {seller.chequeFile ? (
                      <a
                        href={seller.chequeURL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {seller.chequeFile}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{seller.contact}</td>
                  <td>
                    <button className="link-btn">View</button>
                    <button className="link-btn">Download</button>
                    <button className="link-btn">Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
      case "Auction Catalog":
  return (
    <>
      <h1>Auction Catalog</h1>
      <p className="module-description">
        Upload and manage auction catalogs.
      </p>

      <div className="module-box">
        <h2>Create New Catalog</h2>

        <div className="form-row">
          <label>Catalog Name</label>
          <input
            type="text"
            placeholder="Enter Catalog Name"
            value={catalogName}
            onChange={(e) => setCatalogName(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label>Company Name</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label>Upload Catalog (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setCatalogFile(e.target.files[0])}
          />
        </div>

        <button className="primary-btn" onClick={handleSaveCatalog}>
          Save Catalog
        </button>
      </div>

      <br />

      <div className="module-box">
        <h2>Uploaded Catalogs</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>Catalog Name</th>
              <th>Company</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {catalogs.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Catalog Uploaded
                </td>
              </tr>
            ) : (
              catalogs.map((catalog) => (
                <tr key={catalog.id}>
                  <td>{catalog.catalogName}</td>
                  <td>{catalog.companyName}</td>
                  <td>{catalog.fileName}</td>
                  <td>
                    <a
                      href={catalog.fileURL}
                      target="_blank"
                      rel="noreferrer"
                      className="link-btn"
                    >
                      View
                    </a>

                    <button
                      className="link-btn"
                      onClick={() =>
                        alert("Edit functionality will be added next.")
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="link-btn"
                      onClick={() =>
                        setCatalogs(catalogs.filter((item) => item.id !== catalog.id))
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
      case "Auction Lots":
        return (
          <>
            <h1>Auction Lots</h1>
            <p className="module-description">
              Create and manage auction lot details.
            </p>

            <div className="module-box">
              <h2>Add New Lot</h2>

              <div className="form-group">
                <label>Lot Number</label>
                <input
                  type="text"
                  placeholder="Enter Lot Number"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Lot Name</label>
                <input
                  type="text"
                  placeholder="Enter Lot Name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Lot Description</label>
                <textarea
                  rows="4"
                  placeholder="Enter Lot Description"
                  className="form-input"
                ></textarea>
              </div>

              <div className="form-group">
                <label>Upload Lot Images</label>
                <input type="file" multiple accept="image/*" />
              </div>

              <div className="form-group">
                <label>Upload Supporting Documents</label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                />
              </div>

              <button className="primary-btn">Save Lot</button>
            </div>

            <br />

            <div className="module-box">
              <h2>Lot Records</h2>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Lot Number</th>
                    <th>Lot Name</th>
                    <th>Description</th>
                    <th>Images</th>
                    <th>Documents</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>LOT-001</td>
                    <td>Industrial Scrap</td>
                    <td>Steel Scrap Materials</td>
                    <td>3 Images</td>
                    <td>2 Files</td>
                    <td>
                      <button className="link-btn">View</button>
                      <button className="link-btn">Download</button>
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
      <p className="module-description">
        Upload and manage auction-related documents.
      </p>

      <div className="module-box">
        <h2>Upload Auction Document</h2>

        <div className="form-row">
          <label>Auction Name</label>
          <input
            type="text"
            placeholder="Enter Auction Name"
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label>Company Name</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label>Document Type</label>
          <select className="form-input">
            <option>Select Document Type</option>
            <option>Auction Approval Letter</option>
            <option>Delivery Order</option>
            <option>Auction Result</option>
            <option>Agreement</option>
            <option>Invoice</option>
            <option>Purchase Order</option>
            <option>EMD Receipt</option>
            <option>Payment Receipt</option>
            <option>Material Release Order</option>
            <option>Other Documents</option>
          </select>
        </div>

        <div className="form-row">
          <label>Upload Document</label>
          <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" />
        </div>

        <button className="primary-btn">Save Document</button>
      </div>

      <br />

      <div className="module-box">
        <h2>Uploaded Documents</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Auction Name</th>
              <th>Company Name</th>
              <th>Document Type</th>
              <th>Document</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Industrial Scrap Auction</td>
              <td>Tata Steel Ltd.</td>
              <td>Auction Approval Letter</td>
              <td>approval_letter.pdf</td>
              <td>
                <button className="link-btn">View</button>
                <button className="link-btn">Download</button>
                <button className="link-btn">Edit</button>
                <button className="link-btn">Delete</button>
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>Machinery Auction</td>
              <td>JSW Steel</td>
              <td>Delivery Order</td>
              <td>delivery_order.pdf</td>
              <td>
                <button className="link-btn">View</button>
                <button className="link-btn">Download</button>
                <button className="link-btn">Edit</button>
                <button className="link-btn">Delete</button>
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
            <h1>Welcome Operation Executive</h1>
            <p className="module-description">
              Manage buyers, sellers, auction catalogs, auction lots, documents
              and reports.
            </p>

            <div className="cards">
              <div className="card">
                <h3>Total Buyers</h3>
                <p>120</p>
              </div>

              <div className="card">
                <h3>Total Sellers</h3>
                <p>80</p>
              </div>

              <div className="card">
                <h3>Total Auction Catalogs</h3>
                <p>25</p>
              </div>

              <div className="card">
                <h3>Total Auction Lots</h3>
                <p>240</p>
              </div>

              <div className="card">
                <h3>Total Documents</h3>
                <p>560</p>
              </div>

              <div className="card">
                <h3>Reports Generated</h3>
                <p>40</p>
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
          <li onClick={() => setActiveMenu("Dashboard")}>Dashboard</li>
          <li onClick={() => setActiveMenu("Buyer Management")}>
            Buyer Management
          </li>
          <li onClick={() => setActiveMenu("Seller Management")}>
            Seller Management
          </li>
          <li onClick={() => setActiveMenu("Auction Catalog")}>
            Auction Catalog
          </li>
          <li onClick={() => setActiveMenu("Auction Lots")}>Auction Lots</li>
          <li onClick={() => setActiveMenu("Document Management")}>
            Document Management
          </li>
          <li onClick={() => setActiveMenu("Reports")}>Reports</li>
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

export default OperationsDashboard;