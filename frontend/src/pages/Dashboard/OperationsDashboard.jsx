import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import {
  uploadBuyer,
  getBuyers,
  uploadSeller,
  getSellers,
  uploadCatalog,
  getCatalogs,
  uploadDocument,
  getDocuments,
} from "../../services/api";

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

const handleSaveBuyer = async () => {
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

  try {
    const response = await uploadBuyer({
      name: buyerName,
      company: buyerCompany,
      contact: buyerContact,
      gstFile,
      bankFile,
      panFile,
      aadhaarFile,
      kycFile,
      chequeFile,
    });

    const newBuyer = {
      ...response.data.record,
      gstURL: response.data.record.gstURL ? `http://localhost:5000${response.data.record.gstURL}` : "",
      bankURL: response.data.record.bankURL ? `http://localhost:5000${response.data.record.bankURL}` : "",
      panURL: response.data.record.panURL ? `http://localhost:5000${response.data.record.panURL}` : "",
      aadhaarURL: response.data.record.aadhaarURL ? `http://localhost:5000${response.data.record.aadhaarURL}` : "",
      kycURL: response.data.record.kycURL ? `http://localhost:5000${response.data.record.kycURL}` : "",
      chequeURL: response.data.record.chequeURL ? `http://localhost:5000${response.data.record.chequeURL}` : "",
    };

    await refreshOperationsData();

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
  } catch (error) {
    console.error(error);
    alert("Failed to save buyer.");
  }
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

const handleSaveSeller = async () => {
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

  try {
    const response = await uploadSeller({
      name: sellerName,
      company: sellerCompany,
      contact: sellerContact,
      gstFile: sellerGstFile,
      bankFile: sellerBankFile,
      panFile: sellerPanFile,
      aadhaarFile: sellerAadhaarFile,
      kycFile: sellerKycFile,
      chequeFile: sellerChequeFile,
    });

    const newSeller = {
      ...response.data.record,
      gstURL: response.data.record.gstURL ? `http://localhost:5000${response.data.record.gstURL}` : "",
      bankURL: response.data.record.bankURL ? `http://localhost:5000${response.data.record.bankURL}` : "",
      panURL: response.data.record.panURL ? `http://localhost:5000${response.data.record.panURL}` : "",
      aadhaarURL: response.data.record.aadhaarURL ? `http://localhost:5000${response.data.record.aadhaarURL}` : "",
      kycURL: response.data.record.kycURL ? `http://localhost:5000${response.data.record.kycURL}` : "",
      chequeURL: response.data.record.chequeURL ? `http://localhost:5000${response.data.record.chequeURL}` : "",
    };

    await refreshOperationsData();

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
  } catch (error) {
    console.error(error);
    alert("Failed to save seller.");
  }
};

  // Auction Catalog States
  const [catalogName, setCatalogName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [catalogFile, setCatalogFile] = useState(null);
  const [catalogs, setCatalogs] = useState([]);

  const refreshOperationsData = async () => {
    try {
      const [buyersResponse, sellersResponse, catalogsResponse, documentsResponse] = await Promise.all([
        getBuyers(),
        getSellers(),
        getCatalogs(),
        getDocuments(),
      ]);

      setBuyers((buyersResponse.data || []).map((item) => ({
        ...item,
        gstURL: item.gstURL ? `http://localhost:5000${item.gstURL}` : "",
        bankURL: item.bankURL ? `http://localhost:5000${item.bankURL}` : "",
        panURL: item.panURL ? `http://localhost:5000${item.panURL}` : "",
        aadhaarURL: item.aadhaarURL ? `http://localhost:5000${item.aadhaarURL}` : "",
        kycURL: item.kycURL ? `http://localhost:5000${item.kycURL}` : "",
        chequeURL: item.chequeURL ? `http://localhost:5000${item.chequeURL}` : "",
      })));
      setSellers((sellersResponse.data || []).map((item) => ({
        ...item,
        gstURL: item.gstURL ? `http://localhost:5000${item.gstURL}` : "",
        bankURL: item.bankURL ? `http://localhost:5000${item.bankURL}` : "",
        panURL: item.panURL ? `http://localhost:5000${item.panURL}` : "",
        aadhaarURL: item.aadhaarURL ? `http://localhost:5000${item.aadhaarURL}` : "",
        kycURL: item.kycURL ? `http://localhost:5000${item.kycURL}` : "",
        chequeURL: item.chequeURL ? `http://localhost:5000${item.chequeURL}` : "",
      })));
      setCatalogs((catalogsResponse.data || []).map((item) => ({
        ...item,
        fileURL: item.fileURL ? `http://localhost:5000${item.fileURL}` : "",
      })));
      setDocuments((documentsResponse.data || []).map((item) => ({
        ...item,
        fileURL: item.fileURL ? `http://localhost:5000${item.fileURL}` : "",
      })));
    } catch (error) {
      console.error("Failed to load operations data", error);
      throw error;
    }
  };

  useEffect(() => {
    refreshOperationsData().catch(() => {});
  }, []);

  const handleSaveCatalog = async () => {
    if (!catalogName || !companyName || !catalogFile) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await uploadCatalog({
        catalogName,
        companyName,
        file: catalogFile,
      });

      const newCatalog = {
        ...response.data.record,
        fileURL: response.data.record.fileURL ? `http://localhost:5000${response.data.record.fileURL}` : "",
      };

      await refreshOperationsData();

      setCatalogName("");
      setCompanyName("");
      setCatalogFile(null);

      alert("Catalog uploaded successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to upload catalog.");
    }
  };

  const [auctionName, setAuctionName] = useState("");
  const [auctionCompanyName, setAuctionCompanyName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [documents, setDocuments] = useState([
    {
      id: 1,
      auctionName: "Industrial Scrap Auction",
      companyName: "Tata Steel Ltd.",
      documentType: "Auction Approval Letter",
      fileName: "approval_letter.pdf",
      fileURL: "#",
    },
    {
      id: 2,
      auctionName: "Machinery Auction",
      companyName: "JSW Steel",
      documentType: "Delivery Order",
      fileName: "delivery_order.pdf",
      fileURL: "#",
    },
  ]);
  const [editingDocumentId, setEditingDocumentId] = useState(null);
  const [documentResetKey, setDocumentResetKey] = useState(0);

  const handleSaveDocument = async () => {
    if (!auctionName || !auctionCompanyName || !documentType || !documentFile) {
      alert("Please fill all fields and upload a document.");
      return;
    }

    try {
      const response = await uploadDocument({
        auctionName,
        companyName: auctionCompanyName,
        documentType,
        file: documentFile,
      });

      const newDocument = {
        ...response.data.record,
        fileURL: response.data.record.fileURL ? `http://localhost:5000${response.data.record.fileURL}` : "",
      };

      await refreshOperationsData();

      setAuctionName("");
      setAuctionCompanyName("");
      setDocumentType("");
      setDocumentFile(null);
      setEditingDocumentId(null);
      setDocumentResetKey((prev) => prev + 1);

      alert("Document uploaded successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to upload document.");
    }
  };

  const handleEditDocument = (doc) => {
    setEditingDocumentId(doc.id);
    setAuctionName(doc.auctionName);
    setAuctionCompanyName(doc.companyName);
    setDocumentType(doc.documentType);
    setDocumentFile(null);
  };

  const handleDeleteDocument = (id) => {
    setDocuments((prev) => prev.filter((item) => item.id !== id));
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

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "22px" }}>
          <button type="button" className="primary-btn" onClick={handleSaveBuyer} style={{ margin: 0 }}>
            Save Buyer
          </button>
          <button type="button" className="primary-btn" onClick={handleSaveBuyer} style={{ margin: 0 }}>
            Add Buyer
          </button>
        </div>
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

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "22px" }}>
          <button type="button" className="primary-btn" onClick={handleSaveSeller} style={{ margin: 0 }}>
            Save Seller
          </button>
          <button type="button" className="primary-btn" onClick={handleSaveSeller} style={{ margin: 0 }}>
            Add Seller
          </button>
        </div>
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

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "22px" }}>
          <button type="button" className="primary-btn" onClick={handleSaveCatalog} style={{ margin: 0 }}>
            Save Catalog
          </button>
          <button type="button" className="primary-btn" onClick={handleSaveCatalog} style={{ margin: 0 }}>
            Add Catalog
          </button>
        </div>
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

              <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "22px" }}>
                <button type="button" className="primary-btn" style={{ margin: 0 }}>
                  Save Lot
                </button>
                <button type="button" className="primary-btn" style={{ margin: 0 }}>
                  Add Lot
                </button>
              </div>
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
        <h2>{editingDocumentId ? "Edit Auction Document" : "Upload Auction Document"}</h2>

        <div className="form-row">
          <label>Auction Name</label>
          <input
            type="text"
            placeholder="Enter Auction Name"
            className="form-input"
            value={auctionName}
            onChange={(e) => setAuctionName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Company Name</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            className="form-input"
            value={auctionCompanyName}
            onChange={(e) => setAuctionCompanyName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Document Type</label>
          <select
            className="form-input"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="">Select Document Type</option>
            <option value="Auction Approval Letter">Auction Approval Letter</option>
            <option value="Delivery Order">Delivery Order</option>
            <option value="Auction Result">Auction Result</option>
            <option value="Agreement">Agreement</option>
            <option value="Invoice">Invoice</option>
            <option value="Purchase Order">Purchase Order</option>
            <option value="EMD Receipt">EMD Receipt</option>
            <option value="Payment Receipt">Payment Receipt</option>
            <option value="Material Release Order">Material Release Order</option>
            <option value="Other Documents">Other Documents</option>
          </select>
        </div>

        <div className="form-row">
          <label>Upload Document</label>
          <input
            key={documentResetKey}
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={(e) => setDocumentFile(e.target.files[0])}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "22px" }}>
          <button type="button" className="primary-btn" onClick={handleSaveDocument} style={{ margin: 0 }}>
            {editingDocumentId ? "Save Changes" : "Save Document"}
          </button>
          <button
            type="button"
            className="primary-btn"
            onClick={handleSaveDocument}
            style={{ margin: 0 }}
          >
            Add Document
          </button>
        </div>
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
            {documents.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Documents Uploaded
                </td>
              </tr>
            ) : (
              documents.map((doc, index) => (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td>{doc.auctionName}</td>
                  <td>{doc.companyName}</td>
                  <td>{doc.documentType}</td>
                  <td>
                    {doc.fileURL && doc.fileURL !== "#" ? (
                      <a href={doc.fileURL} target="_blank" rel="noreferrer">
                        {doc.fileName}
                      </a>
                    ) : (
                      doc.fileName
                    )}
                  </td>
                  <td>
                    <a href={doc.fileURL} target="_blank" rel="noreferrer" className="link-btn">
                      View
                    </a>
                    <button className="link-btn" onClick={() => handleEditDocument(doc)}>
                      Edit
                    </button>
                    <button className="link-btn" onClick={() => handleDeleteDocument(doc.id)}>
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