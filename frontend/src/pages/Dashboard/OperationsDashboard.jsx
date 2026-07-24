import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import {
  uploadBuyer,
  getBuyers,
  updateBuyer,
  deleteBuyer,
  uploadSeller,
  getSellers,
  updateSeller,
  deleteSeller,
  uploadCatalog,
  getCatalogs,
  updateCatalog,
  deleteCatalog,
  uploadDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
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

  const normalizeFileUrl = (value) => {
    if (!value) return "";
    if (typeof value !== "string") return "";
    if (value.startsWith("http://") || value.startsWith("https://")) return value;
    if (value.startsWith("/")) return `http://localhost:5000${value}`;
    return `http://localhost:5000/${value}`;
  };

  const getFileUrl = (record, keys = []) => {
    for (const key of keys) {
      const value = record?.[key];
      if (value) return normalizeFileUrl(value);
    }
    return "";
  };

  const getFileLabel = (record, labelKeys = [], urlKeys = []) => {
    for (const key of labelKeys) {
      const value = record?.[key];
      if (typeof value === "string" && value.trim()) return value;
    }

    const urlValue = getFileUrl(record, urlKeys);
    if (urlValue) {
      const segments = urlValue.split("/");
      return segments[segments.length - 1] || "Uploaded file";
    }

    return "";
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
const [editingBuyerId, setEditingBuyerId] = useState(null);
const [buyerResetKey, setBuyerResetKey] = useState(0);

const resetBuyerForm = () => {
  setBuyerName("");
  setBuyerCompany("");
  setBuyerContact("");
  setGstFile(null);
  setBankFile(null);
  setPanFile(null);
  setAadhaarFile(null);
  setKycFile(null);
  setChequeFile(null);
  setEditingBuyerId(null);
  setBuyerResetKey((prev) => prev + 1);
};

const handleSaveBuyer = async () => {
  if (!buyerName || !buyerCompany || !buyerContact) {
    alert("Please fill the buyer name, company, and contact details.");
    return;
  }

  try {
    if (editingBuyerId) {
      await updateBuyer(editingBuyerId, {
        name: buyerName,
        company: buyerCompany,
        contact: buyerContact,
        gstFile: gstFile || null,
        bankFile: bankFile || null,
        panFile: panFile || null,
        aadhaarFile: aadhaarFile || null,
        kycFile: kycFile || null,
        chequeFile: chequeFile || null,
      });
    } else {
      await uploadBuyer({
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
    }

    await refreshOperationsData();
    resetBuyerForm();

    alert(editingBuyerId ? "Buyer updated successfully." : "Buyer saved successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to save buyer.");
  }
};

const handleEditBuyer = (buyer) => {
  setEditingBuyerId(buyer.id);
  setBuyerName(buyer.name || "");
  setBuyerCompany(buyer.company || "");
  setBuyerContact(buyer.contact || "");
  setGstFile(null);
  setBankFile(null);
  setPanFile(null);
  setAadhaarFile(null);
  setKycFile(null);
  setChequeFile(null);
  setBuyerResetKey((prev) => prev + 1);
};

const handleDeleteBuyer = async (id) => {
  if (!window.confirm("Delete this buyer record?")) return;
  try {
    await deleteBuyer(id);
    await refreshOperationsData();
  } catch (error) {
    console.error(error);
    alert("Failed to delete buyer.");
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
const [editingSellerId, setEditingSellerId] = useState(null);
const [sellerResetKey, setSellerResetKey] = useState(0);

const resetSellerForm = () => {
  setSellerName("");
  setSellerCompany("");
  setSellerContact("");
  setSellerGstFile(null);
  setSellerBankFile(null);
  setSellerPanFile(null);
  setSellerAadhaarFile(null);
  setSellerKycFile(null);
  setSellerChequeFile(null);
  setEditingSellerId(null);
  setSellerResetKey((prev) => prev + 1);
};

const handleSaveSeller = async () => {
  if (!sellerName || !sellerCompany || !sellerContact) {
    alert("Please fill the seller name, company, and contact details.");
    return;
  }

  try {
    if (editingSellerId) {
      await updateSeller(editingSellerId, {
        name: sellerName,
        company: sellerCompany,
        contact: sellerContact,
        gstFile: sellerGstFile || null,
        bankFile: sellerBankFile || null,
        panFile: sellerPanFile || null,
        aadhaarFile: sellerAadhaarFile || null,
        kycFile: sellerKycFile || null,
        chequeFile: sellerChequeFile || null,
      });
    } else {
      await uploadSeller({
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
    }

    await refreshOperationsData();
    resetSellerForm();

    alert(editingSellerId ? "Seller updated successfully." : "Seller saved successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to save seller.");
  }
};

const handleEditSeller = (seller) => {
  setEditingSellerId(seller.id);
  setSellerName(seller.name || "");
  setSellerCompany(seller.company || "");
  setSellerContact(seller.contact || "");
  setSellerGstFile(null);
  setSellerBankFile(null);
  setSellerPanFile(null);
  setSellerAadhaarFile(null);
  setSellerKycFile(null);
  setSellerChequeFile(null);
  setSellerResetKey((prev) => prev + 1);
};

const handleDeleteSeller = async (id) => {
  if (!window.confirm("Delete this seller record?")) return;
  try {
    await deleteSeller(id);
    await refreshOperationsData();
  } catch (error) {
    console.error(error);
    alert("Failed to delete seller.");
  }
};

  // Auction Catalog States
  const [catalogName, setCatalogName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [catalogFile, setCatalogFile] = useState(null);
  const [lotNumber, setLotNumber] = useState("");
  const [lotName, setLotName] = useState("");
  const [lotDescription, setLotDescription] = useState("");
  const [lotImageFile, setLotImageFile] = useState(null);
  const [supportingDocumentFile, setSupportingDocumentFile] = useState(null);
  const [catalogs, setCatalogs] = useState([]);
  const [editingCatalogId, setEditingCatalogId] = useState(null);
  const [catalogResetKey, setCatalogResetKey] = useState(0);

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
        gstURL: getFileUrl(item, ["gstURL", "gstFileURL"]),
        bankURL: getFileUrl(item, ["bankURL", "bankFileURL"]),
        panURL: getFileUrl(item, ["panURL", "panFileURL"]),
        aadhaarURL: getFileUrl(item, ["aadhaarURL", "aadhaarFileURL"]),
        kycURL: getFileUrl(item, ["kycURL", "kycFileURL"]),
        chequeURL: getFileUrl(item, ["chequeURL", "chequeFileURL"]),
      })));
      setSellers((sellersResponse.data || []).map((item) => ({
        ...item,
        gstURL: getFileUrl(item, ["gstURL", "gstFileURL"]),
        bankURL: getFileUrl(item, ["bankURL", "bankFileURL"]),
        panURL: getFileUrl(item, ["panURL", "panFileURL"]),
        aadhaarURL: getFileUrl(item, ["aadhaarURL", "aadhaarFileURL"]),
        kycURL: getFileUrl(item, ["kycURL", "kycFileURL"]),
        chequeURL: getFileUrl(item, ["chequeURL", "chequeFileURL"]),
      })));
      setCatalogs((catalogsResponse.data || []).map((item) => ({
        ...item,
        fileURL: getFileUrl(item, ["fileURL", "filePath"]),
        lotImageURL: getFileUrl(item, ["lotImageURL"]),
        supportingDocumentURL: getFileUrl(item, ["supportingDocumentURL"]),
      })));
      setDocuments((documentsResponse.data || []).map((item) => ({
        ...item,
        fileURL: getFileUrl(item, ["fileURL", "filePath"]),
      })));
    } catch (error) {
      console.error("Failed to load operations data", error);
      throw error;
    }
  };

  useEffect(() => {
    refreshOperationsData().catch(() => {});
  }, []);

  const resetCatalogForm = () => {
    setCatalogName("");
    setCompanyName("");
    setCatalogFile(null);
    setLotNumber("");
    setLotName("");
    setLotDescription("");
    setLotImageFile(null);
    setSupportingDocumentFile(null);
    setEditingCatalogId(null);
    setCatalogResetKey((prev) => prev + 1);
  };

  const handleSaveCatalog = async () => {
    if (!catalogName || !companyName) {
      alert("Please fill all fields.");
      return;
    }

    try {
      if (editingCatalogId) {
        await updateCatalog(editingCatalogId, {
          catalogName,
          companyName,
          file: catalogFile || null,
          lotNumber,
          lotName,
          lotDescription,
          lotImage: lotImageFile || null,
          supportingDocument: supportingDocumentFile || null,
        });
      } else {
        if (!catalogFile) {
          alert("Please choose a catalog file.");
          return;
        }
        await uploadCatalog({
          catalogName,
          companyName,
          file: catalogFile,
          lotNumber,
          lotName,
          lotDescription,
          lotImage: lotImageFile,
          supportingDocument: supportingDocumentFile,
        });
      }

      await refreshOperationsData();
      resetCatalogForm();

      alert(editingCatalogId ? "Catalog updated successfully." : "Catalog uploaded successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to upload catalog.");
    }
  };

  const handleEditCatalog = (catalog) => {
    setEditingCatalogId(catalog.id);
    setCatalogName(catalog.catalogName || catalog.name || "");
    setCompanyName(catalog.companyName || "");
    setCatalogFile(null);
    setLotNumber(catalog.lotNumber || "");
    setLotName(catalog.lotName || "");
    setLotDescription(catalog.lotDescription || "");
    setLotImageFile(null);
    setSupportingDocumentFile(null);
    setCatalogResetKey((prev) => prev + 1);
  };

  const handleDeleteCatalog = async (id) => {
    if (!window.confirm("Delete this catalog?")) return;
    try {
      await deleteCatalog(id);
      await refreshOperationsData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete catalog.");
    }
  };

  const [auctionName, setAuctionName] = useState("");
  const [auctionCompanyName, setAuctionCompanyName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [editingDocumentId, setEditingDocumentId] = useState(null);
  const [documentResetKey, setDocumentResetKey] = useState(0);

  const resetDocumentForm = () => {
    setAuctionName("");
    setAuctionCompanyName("");
    setDocumentType("");
    setDocumentFile(null);
    setEditingDocumentId(null);
    setDocumentResetKey((prev) => prev + 1);
  };

  const handleSaveDocument = async () => {
    if (!auctionName || !auctionCompanyName || !documentType) {
      alert("Please fill all fields.");
      return;
    }

    try {
      if (editingDocumentId) {
        await updateDocument(editingDocumentId, {
          auctionName,
          companyName: auctionCompanyName,
          documentType,
          file: documentFile || null,
        });
      } else {
        if (!documentFile) {
          alert("Please select a document file.");
          return;
        }
        await uploadDocument({
          auctionName,
          companyName: auctionCompanyName,
          documentType,
          file: documentFile,
        });
      }

      await refreshOperationsData();
      resetDocumentForm();

      alert(editingDocumentId ? "Document updated successfully." : "Document uploaded successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to upload document.");
    }
  };

  const handleEditDocument = (doc) => {
    setEditingDocumentId(doc.id);
    setAuctionName(doc.auctionName || "");
    setAuctionCompanyName(doc.companyName || "");
    setDocumentType(doc.documentType || "");
    setDocumentFile(null);
    setDocumentResetKey((prev) => prev + 1);
  };

  const handleDeleteDocument = async (id) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await deleteDocument(id);
      await refreshOperationsData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete document.");
    }
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
            {editingBuyerId ? "Save Changes" : "Save Buyer"}
          </button>
          <button
            type="button"
            className="primary-btn"
            onClick={resetBuyerForm}
            style={{ margin: 0 }}
          >
            Cancel
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
                    {getFileLabel(buyer, ["gstFile"], ["gstURL", "gstFileURL"]) ? (
                      <a href={getFileUrl(buyer, ["gstURL", "gstFileURL"])} target="_blank" rel="noreferrer">
                        {getFileLabel(buyer, ["gstFile"], ["gstURL", "gstFileURL"])}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {getFileLabel(buyer, ["bankFile"], ["bankURL", "bankFileURL"]) ? (
                      <a href={getFileUrl(buyer, ["bankURL", "bankFileURL"])} target="_blank" rel="noreferrer">
                        {getFileLabel(buyer, ["bankFile"], ["bankURL", "bankFileURL"])}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {getFileLabel(buyer, ["panFile"], ["panURL", "panFileURL"]) ? (
                      <a href={getFileUrl(buyer, ["panURL", "panFileURL"])} target="_blank" rel="noreferrer">
                        {getFileLabel(buyer, ["panFile"], ["panURL", "panFileURL"])}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {getFileLabel(buyer, ["aadhaarFile"], ["aadhaarURL", "aadhaarFileURL"]) ? (
                      <a
                        href={getFileUrl(buyer, ["aadhaarURL", "aadhaarFileURL"])}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {getFileLabel(buyer, ["aadhaarFile"], ["aadhaarURL", "aadhaarFileURL"])}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {getFileLabel(buyer, ["kycFile"], ["kycURL", "kycFileURL"]) ? (
                      <a href={getFileUrl(buyer, ["kycURL", "kycFileURL"])} target="_blank" rel="noreferrer">
                        {getFileLabel(buyer, ["kycFile"], ["kycURL", "kycFileURL"])}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {getFileLabel(buyer, ["chequeFile"], ["chequeURL", "chequeFileURL"]) ? (
                      <a
                        href={getFileUrl(buyer, ["chequeURL", "chequeFileURL"])}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {getFileLabel(buyer, ["chequeFile"], ["chequeURL", "chequeFileURL"])}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{buyer.contact}</td>
                  <td>
                    <button
                      className="link-btn"
                      onClick={() => {
                        const fileUrl = getFileUrl(buyer, ["gstURL", "gstFileURL", "bankURL", "bankFileURL", "panURL", "panFileURL", "aadhaarURL", "aadhaarFileURL", "kycURL", "kycFileURL", "chequeURL", "chequeFileURL"]);
                        if (fileUrl) window.open(fileUrl, "_blank", "noopener,noreferrer");
                        else alert("No file available to open.");
                      }}
                    >
                      View
                    </button>
                    <button className="link-btn" onClick={() => handleEditBuyer(buyer)}>
                      Edit
                    </button>
                    <button className="link-btn" onClick={() => handleDeleteBuyer(buyer.id)}>
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
            {editingSellerId ? "Save Changes" : "Save Seller"}
          </button>
          <button
            type="button"
            className="primary-btn"
            onClick={resetSellerForm}
            style={{ margin: 0 }}
          >
            Cancel
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
                    {getFileLabel(seller, ["gstFile"], ["gstURL", "gstFileURL"]) ? (
                      <a href={getFileUrl(seller, ["gstURL", "gstFileURL"])} target="_blank" rel="noreferrer">
                        {getFileLabel(seller, ["gstFile"], ["gstURL", "gstFileURL"])}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {getFileLabel(seller, ["bankFile"], ["bankURL", "bankFileURL"]) ? (
                      <a href={getFileUrl(seller, ["bankURL", "bankFileURL"])} target="_blank" rel="noreferrer">
                        {getFileLabel(seller, ["bankFile"], ["bankURL", "bankFileURL"])}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {getFileLabel(seller, ["panFile"], ["panURL", "panFileURL"]) ? (
                      <a href={getFileUrl(seller, ["panURL", "panFileURL"])} target="_blank" rel="noreferrer">
                        {getFileLabel(seller, ["panFile"], ["panURL", "panFileURL"])}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {getFileLabel(seller, ["aadhaarFile"], ["aadhaarURL", "aadhaarFileURL"]) ? (
                      <a
                        href={getFileUrl(seller, ["aadhaarURL", "aadhaarFileURL"])}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {getFileLabel(seller, ["aadhaarFile"], ["aadhaarURL", "aadhaarFileURL"])}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {getFileLabel(seller, ["kycFile"], ["kycURL", "kycFileURL"]) ? (
                      <a href={getFileUrl(seller, ["kycURL", "kycFileURL"])} target="_blank" rel="noreferrer">
                        {getFileLabel(seller, ["kycFile"], ["kycURL", "kycFileURL"])}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {getFileLabel(seller, ["chequeFile"], ["chequeURL", "chequeFileURL"]) ? (
                      <a
                        href={getFileUrl(seller, ["chequeURL", "chequeFileURL"])}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {getFileLabel(seller, ["chequeFile"], ["chequeURL", "chequeFileURL"])}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{seller.contact}</td>
                  <td>
                    <button
                      className="link-btn"
                      onClick={() => {
                        const fileUrl = getFileUrl(seller, ["gstURL", "gstFileURL", "bankURL", "bankFileURL", "panURL", "panFileURL", "aadhaarURL", "aadhaarFileURL", "kycURL", "kycFileURL", "chequeURL", "chequeFileURL"]);
                        if (fileUrl) window.open(fileUrl, "_blank", "noopener,noreferrer");
                        else alert("No file available to open.");
                      }}
                    >
                      View
                    </button>
                    <button className="link-btn" onClick={() => handleEditSeller(seller)}>
                      Edit
                    </button>
                    <button className="link-btn" onClick={() => handleDeleteSeller(seller.id)}>
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
      case "Auction Catalog":
  return (
    <>
      <h1>Auction Catalog</h1>
      <p className="module-description">
        Upload and manage auction catalogs.
      </p>

      <div className="module-box">
        <h2>Store Catalog</h2>

        <div className="form-row">
          <label>Catalog Number</label>
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

        <h3>Lot Details</h3>

        <div className="form-row">
          <label>Lot Number</label>
          <input
            type="text"
            placeholder="Enter Lot Number"
            value={lotNumber}
            onChange={(e) => setLotNumber(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label>Lot Name</label>
          <input
            type="text"
            placeholder="Enter Lot Name"
            value={lotName}
            onChange={(e) => setLotName(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label>Lot Description</label>
          <textarea
            placeholder="Enter Lot Description"
            value={lotDescription}
            onChange={(e) => setLotDescription(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label>Upload Lot Image</label>
          <input
            key={`lot-image-${catalogResetKey}`}
            type="file"
            accept="image/*"
            onChange={(e) => setLotImageFile(e.target.files[0])}
          />
        </div>

        <div className="form-row">
          <label>Upload Supporting Document</label>
          <input
            key={`supporting-document-${catalogResetKey}`}
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={(e) => setSupportingDocumentFile(e.target.files[0])}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "22px" }}>
          <button type="button" className="primary-btn" onClick={handleSaveCatalog} style={{ margin: 0 }}>
            {editingCatalogId ? "Save Changes" : "Save Catalog"}
          </button>
          <button
            type="button"
            className="primary-btn"
            onClick={resetCatalogForm}
            style={{ margin: 0 }}
          >
            Cancel
          </button>
        </div>
      </div>

      <br />

      <div className="module-box">
        <h2>Uploaded Catalogs</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Catalog Number</th>
              <th>Company Name</th>
              <th>Catalog PDF</th>
              <th>Lot Number</th>
              <th>Lot Name</th>
              <th>Lot Description</th>
              <th>Lot Image</th>
              <th>Supporting Document</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {catalogs.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No Catalog Uploaded
                </td>
              </tr>
            ) : (
              catalogs.map((catalog, index) => (
                <tr key={catalog.id}>
                  <td>{index + 1}</td>
                  <td>{catalog.catalogName}</td>
                  <td>{catalog.companyName}</td>
                  <td>{catalog.fileName}</td>
                  <td>{catalog.lotNumber}</td>
                  <td>{catalog.lotName}</td>
                  <td>{catalog.lotDescription}</td>
                  <td>
                    {getFileLabel(catalog, ["lotImage"], ["lotImageURL"]) ? (
                      <a href={getFileUrl(catalog, ["lotImageURL"])} target="_blank" rel="noreferrer">
                        {getFileLabel(catalog, ["lotImage"], ["lotImageURL"])}
                      </a>
                    ) : ""}
                  </td>
                  <td>
                    {getFileLabel(catalog, ["supportingDocument"], ["supportingDocumentURL"]) ? (
                      <a href={getFileUrl(catalog, ["supportingDocumentURL"])} target="_blank" rel="noreferrer">
                        {getFileLabel(catalog, ["supportingDocument"], ["supportingDocumentURL"])}
                      </a>
                    ) : ""}
                  </td>
                  <td>
                    <button
                      className="link-btn"
                      onClick={() => {
                        const fileUrl = getFileUrl(catalog, ["fileURL", "filePath"]);
                        if (fileUrl) window.open(fileUrl, "_blank", "noopener,noreferrer");
                        else alert("No file available to open.");
                      }}
                    >
                      View
                    </button>

                    <button className="link-btn" onClick={() => handleEditCatalog(catalog)}>
                      Edit
                    </button>

                    <button className="link-btn" onClick={() => handleDeleteCatalog(catalog.id)}>
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
            onClick={resetDocumentForm}
            style={{ margin: 0 }}
          >
            Cancel
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
                    <button
                      className="link-btn"
                      onClick={() => {
                        const fileUrl = getFileUrl(doc, ["fileURL", "filePath"]);
                        if (fileUrl && fileUrl !== "http://localhost:5000#") window.open(fileUrl, "_blank", "noopener,noreferrer");
                        else alert("No file available to open.");
                      }}
                    >
                      View
                    </button>
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
            <h1>Subadmin Dashboard</h1>
            <p className="module-description">
              Manage buyers, sellers, auction catalogs, documents
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