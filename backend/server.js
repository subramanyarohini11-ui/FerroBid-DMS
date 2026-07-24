import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    const contentType = req.headers['content-type'] || '';
    if (contentType.includes('application/json')) {
      express.json({ limit: '10mb' })(req, res, (err) => {
        if (err) {
          console.error('JSON parse error', err.message);
          return res.status(400).json({ success: false, message: 'Invalid JSON payload' });
        }
        return next();
      });
      return;
    }
  }
  next();
});
app.use(express.urlencoded({ extended: true }));

const uploadDir = path.join(__dirname, 'uploads');
const dataDir = path.join(__dirname, 'data');
const dataFilePath = path.join(dataDir, 'records.json');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const makeRecordId = () => Date.now() + Math.floor(Math.random() * 1000);

const createDefaultRecords = () => ({
  approval: [],
  lot: [],
  account: [],
  emd: [],
  buyers: [],
  sellers: [],
  catalogs: [],
  documents: [],
  users: [],
  lots: [],
  reports: [],
});

const loadRecords = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return createDefaultRecords();
    }

    const raw = fs.readFileSync(dataFilePath, 'utf8');
    const parsed = JSON.parse(raw);
    const defaults = createDefaultRecords();

    return {
      ...defaults,
      ...parsed,
      approval: Array.isArray(parsed.approval) ? parsed.approval : defaults.approval,
      lot: Array.isArray(parsed.lot) ? parsed.lot : defaults.lot,
      account: Array.isArray(parsed.account) ? parsed.account : defaults.account,
      emd: Array.isArray(parsed.emd) ? parsed.emd : defaults.emd,
      buyers: Array.isArray(parsed.buyers) ? parsed.buyers : defaults.buyers,
      sellers: Array.isArray(parsed.sellers) ? parsed.sellers : defaults.sellers,
      catalogs: Array.isArray(parsed.catalogs) ? parsed.catalogs : defaults.catalogs,
      documents: Array.isArray(parsed.documents) ? parsed.documents : defaults.documents,
      users: Array.isArray(parsed.users) ? parsed.users : defaults.users,
      lots: Array.isArray(parsed.lots) ? parsed.lots : defaults.lots,
      reports: Array.isArray(parsed.reports) ? parsed.reports : defaults.reports,
    };
  } catch (error) {
    console.error('Failed to load records file', error);
    return createDefaultRecords();
  }
};

const saveRecords = (records) => {
  const tempFilePath = `${dataFilePath}.tmp`;
  fs.writeFileSync(tempFilePath, JSON.stringify(records, null, 2));
  fs.renameSync(tempFilePath, dataFilePath);
};

let records = loadRecords();

const getCollection = (key) => records[key] || [];
const saveCollection = (key, value) => {
  records[key] = value;
  saveRecords(records);
};

const updateById = (key, id, patch) => {
  const items = getCollection(key);
  const index = items.findIndex((item) => String(item.id) === String(id));
  if (index === -1) return null;
  items[index] = { ...items[index], ...patch };
  saveCollection(key, items);
  return items[index];
};

const deleteById = (key, id) => {
  const items = getCollection(key);
  const nextItems = items.filter((item) => String(item.id) !== String(id));
  if (nextItems.length === items.length) return false;
  saveCollection(key, nextItems);
  return true;
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/approval', upload.single('file'), (req, res) => {
  const record = {
    id: makeRecordId(),
    companyName: req.body.companyName,
    fileName: req.file?.originalname || 'approval-letter',
    storedFileName: req.file?.filename,
    filePath: `/uploads/${req.file?.filename}`,
  };
  records.approval.push(record);
  saveRecords(records);
  res.json({ success: true, record });
});

app.get('/api/approval', (req, res) => {
  res.json(records.approval);
});

app.post('/api/lot', upload.single('file'), (req, res) => {
  const record = {
    id: makeRecordId(),
    companyName: req.body.companyName,
    fileName: req.file?.originalname || 'lot-letter',
    storedFileName: req.file?.filename,
    filePath: `/uploads/${req.file?.filename}`,
  };
  records.lot.push(record);
  saveRecords(records);
  res.json({ success: true, record });
});

app.get('/api/lot', (req, res) => {
  res.json(records.lot);
});

app.post('/api/account', upload.single('file'), (req, res) => {
  const record = {
    id: makeRecordId(),
    accountHolderName: req.body.accountHolderName,
    companyName: req.body.companyName,
    fileName: req.file?.originalname || 'account-document',
    storedFileName: req.file?.filename,
    filePath: `/uploads/${req.file?.filename}`,
  };
  records.account.push(record);
  saveRecords(records);
  res.json({ success: true, record });
});

app.get('/api/account', (req, res) => {
  res.json(records.account);
});

app.post('/api/emd', upload.single('file'), (req, res) => {
  const record = {
    id: makeRecordId(),
    documentName: req.body.documentName,
    companyName: req.body.companyName,
    fileName: req.file?.originalname || 'emd-document',
    storedFileName: req.file?.filename,
    filePath: `/uploads/${req.file?.filename}`,
  };
  records.emd.push(record);
  saveRecords(records);
  res.json({ success: true, record });
});

app.get('/api/emd', (req, res) => {
  res.json(records.emd);
});

app.post('/api/buyers', upload.fields([
  { name: 'gstFile', maxCount: 1 },
  { name: 'bankFile', maxCount: 1 },
  { name: 'panFile', maxCount: 1 },
  { name: 'aadhaarFile', maxCount: 1 },
  { name: 'kycFile', maxCount: 1 },
  { name: 'chequeFile', maxCount: 1 },
]), (req, res) => {
  const files = req.files || {};
  const record = {
    id: makeRecordId(),
    name: req.body.name,
    company: req.body.company,
    contact: req.body.contact,
    status: req.body.status || 'Active',
    gstFile: files.gstFile?.[0]?.originalname || '',
    gstURL: files.gstFile?.[0] ? `/uploads/${files.gstFile[0].filename}` : '',
    bankFile: files.bankFile?.[0]?.originalname || '',
    bankURL: files.bankFile?.[0] ? `/uploads/${files.bankFile[0].filename}` : '',
    panFile: files.panFile?.[0]?.originalname || '',
    panURL: files.panFile?.[0] ? `/uploads/${files.panFile[0].filename}` : '',
    aadhaarFile: files.aadhaarFile?.[0]?.originalname || '',
    aadhaarURL: files.aadhaarFile?.[0] ? `/uploads/${files.aadhaarFile[0].filename}` : '',
    kycFile: files.kycFile?.[0]?.originalname || '',
    kycURL: files.kycFile?.[0] ? `/uploads/${files.kycFile[0].filename}` : '',
    chequeFile: files.chequeFile?.[0]?.originalname || '',
    chequeURL: files.chequeFile?.[0] ? `/uploads/${files.chequeFile[0].filename}` : '',
  };
  records.buyers.push(record);
  saveRecords(records);
  res.json({ success: true, record });
});

app.get('/api/buyers', (req, res) => {
  res.json(records.buyers);
});

app.put('/api/buyers/:id', upload.fields([
  { name: 'gstFile', maxCount: 1 },
  { name: 'bankFile', maxCount: 1 },
  { name: 'panFile', maxCount: 1 },
  { name: 'aadhaarFile', maxCount: 1 },
  { name: 'kycFile', maxCount: 1 },
  { name: 'chequeFile', maxCount: 1 },
]), (req, res) => {
  const existing = records.buyers.find((item) => String(item.id) === String(req.params.id));
  if (!existing) return res.status(404).json({ success: false, message: 'Buyer not found' });

  const files = req.files || {};
  const patch = { ...req.body };

  if (files.gstFile?.[0]) {
    patch.gstFile = files.gstFile[0].originalname;
    patch.gstURL = `/uploads/${files.gstFile[0].filename}`;
  }
  if (files.bankFile?.[0]) {
    patch.bankFile = files.bankFile[0].originalname;
    patch.bankURL = `/uploads/${files.bankFile[0].filename}`;
  }
  if (files.panFile?.[0]) {
    patch.panFile = files.panFile[0].originalname;
    patch.panURL = `/uploads/${files.panFile[0].filename}`;
  }
  if (files.aadhaarFile?.[0]) {
    patch.aadhaarFile = files.aadhaarFile[0].originalname;
    patch.aadhaarURL = `/uploads/${files.aadhaarFile[0].filename}`;
  }
  if (files.kycFile?.[0]) {
    patch.kycFile = files.kycFile[0].originalname;
    patch.kycURL = `/uploads/${files.kycFile[0].filename}`;
  }
  if (files.chequeFile?.[0]) {
    patch.chequeFile = files.chequeFile[0].originalname;
    patch.chequeURL = `/uploads/${files.chequeFile[0].filename}`;
  }

  const updated = updateById('buyers', req.params.id, patch);
  if (!updated) return res.status(404).json({ success: false, message: 'Buyer not found' });
  res.json({ success: true, record: updated });
});

app.delete('/api/buyers/:id', (req, res) => {
  const removed = deleteById('buyers', req.params.id);
  if (!removed) return res.status(404).json({ success: false, message: 'Buyer not found' });
  res.json({ success: true });
});

app.post('/api/sellers', upload.fields([
  { name: 'gstFile', maxCount: 1 },
  { name: 'bankFile', maxCount: 1 },
  { name: 'panFile', maxCount: 1 },
  { name: 'aadhaarFile', maxCount: 1 },
  { name: 'kycFile', maxCount: 1 },
  { name: 'chequeFile', maxCount: 1 },
]), (req, res) => {
  const files = req.files || {};
  const record = {
    id: makeRecordId(),
    name: req.body.name,
    company: req.body.company,
    contact: req.body.contact,
    status: req.body.status || 'Active',
    gstFile: files.gstFile?.[0]?.originalname || '',
    gstURL: files.gstFile?.[0] ? `/uploads/${files.gstFile[0].filename}` : '',
    bankFile: files.bankFile?.[0]?.originalname || '',
    bankURL: files.bankFile?.[0] ? `/uploads/${files.bankFile[0].filename}` : '',
    panFile: files.panFile?.[0]?.originalname || '',
    panURL: files.panFile?.[0] ? `/uploads/${files.panFile[0].filename}` : '',
    aadhaarFile: files.aadhaarFile?.[0]?.originalname || '',
    aadhaarURL: files.aadhaarFile?.[0] ? `/uploads/${files.aadhaarFile[0].filename}` : '',
    kycFile: files.kycFile?.[0]?.originalname || '',
    kycURL: files.kycFile?.[0] ? `/uploads/${files.kycFile[0].filename}` : '',
    chequeFile: files.chequeFile?.[0]?.originalname || '',
    chequeURL: files.chequeFile?.[0] ? `/uploads/${files.chequeFile[0].filename}` : '',
  };
  records.sellers.push(record);
  saveRecords(records);
  res.json({ success: true, record });
});

app.get('/api/sellers', (req, res) => {
  res.json(records.sellers);
});

app.put('/api/sellers/:id', upload.fields([
  { name: 'gstFile', maxCount: 1 },
  { name: 'bankFile', maxCount: 1 },
  { name: 'panFile', maxCount: 1 },
  { name: 'aadhaarFile', maxCount: 1 },
  { name: 'kycFile', maxCount: 1 },
  { name: 'chequeFile', maxCount: 1 },
]), (req, res) => {
  const existing = records.sellers.find((item) => String(item.id) === String(req.params.id));
  if (!existing) return res.status(404).json({ success: false, message: 'Seller not found' });

  const files = req.files || {};
  const patch = { ...req.body };

  if (files.gstFile?.[0]) {
    patch.gstFile = files.gstFile[0].originalname;
    patch.gstURL = `/uploads/${files.gstFile[0].filename}`;
  }
  if (files.bankFile?.[0]) {
    patch.bankFile = files.bankFile[0].originalname;
    patch.bankURL = `/uploads/${files.bankFile[0].filename}`;
  }
  if (files.panFile?.[0]) {
    patch.panFile = files.panFile[0].originalname;
    patch.panURL = `/uploads/${files.panFile[0].filename}`;
  }
  if (files.aadhaarFile?.[0]) {
    patch.aadhaarFile = files.aadhaarFile[0].originalname;
    patch.aadhaarURL = `/uploads/${files.aadhaarFile[0].filename}`;
  }
  if (files.kycFile?.[0]) {
    patch.kycFile = files.kycFile[0].originalname;
    patch.kycURL = `/uploads/${files.kycFile[0].filename}`;
  }
  if (files.chequeFile?.[0]) {
    patch.chequeFile = files.chequeFile[0].originalname;
    patch.chequeURL = `/uploads/${files.chequeFile[0].filename}`;
  }

  const updated = updateById('sellers', req.params.id, patch);
  if (!updated) return res.status(404).json({ success: false, message: 'Seller not found' });
  res.json({ success: true, record: updated });
});

app.delete('/api/sellers/:id', (req, res) => {
  const removed = deleteById('sellers', req.params.id);
  if (!removed) return res.status(404).json({ success: false, message: 'Seller not found' });
  res.json({ success: true });
});

app.post('/api/catalogs', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'lotImage', maxCount: 1 },
  { name: 'supportingDocument', maxCount: 1 },
]), (req, res) => {
  const files = req.files || {};
  const record = {
    id: makeRecordId(),
    name: req.body.name || req.body.catalogName || 'Untitled Catalog',
    catalogName: req.body.catalogName || req.body.name || 'Untitled Catalog',
    companyName: req.body.companyName || '',
    startDate: req.body.startDate || '',
    status: req.body.status || 'Upcoming',
    fileName: files.file?.[0]?.originalname || 'catalog-file',
    fileURL: files.file?.[0] ? `/uploads/${files.file[0].filename}` : '',
    lotNumber: req.body.lotNumber || '',
    lotName: req.body.lotName || '',
    lotDescription: req.body.lotDescription || '',
    lotImage: files.lotImage?.[0]?.originalname || '',
    lotImageURL: files.lotImage?.[0] ? `/uploads/${files.lotImage[0].filename}` : '',
    supportingDocument: files.supportingDocument?.[0]?.originalname || '',
    supportingDocumentURL: files.supportingDocument?.[0] ? `/uploads/${files.supportingDocument[0].filename}` : '',
  };
  records.catalogs.push(record);
  saveRecords(records);
  res.json({ success: true, record });
});

app.get('/api/catalogs', (req, res) => {
  res.json(records.catalogs);
});

app.put('/api/catalogs/:id', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'lotImage', maxCount: 1 },
  { name: 'supportingDocument', maxCount: 1 },
]), (req, res) => {
  const existing = records.catalogs.find((item) => String(item.id) === String(req.params.id));
  if (!existing) return res.status(404).json({ success: false, message: 'Catalog not found' });

  const patch = { ...req.body };
  const files = req.files || {};
  if (files.file?.[0]) {
    patch.fileName = files.file[0].originalname;
    patch.fileURL = `/uploads/${files.file[0].filename}`;
  }
  if (files.lotImage?.[0]) {
    patch.lotImage = files.lotImage[0].originalname;
    patch.lotImageURL = `/uploads/${files.lotImage[0].filename}`;
  }
  if (files.supportingDocument?.[0]) {
    patch.supportingDocument = files.supportingDocument[0].originalname;
    patch.supportingDocumentURL = `/uploads/${files.supportingDocument[0].filename}`;
  }

  const updated = updateById('catalogs', req.params.id, patch);
  if (!updated) return res.status(404).json({ success: false, message: 'Catalog not found' });
  res.json({ success: true, record: updated });
});

app.delete('/api/catalogs/:id', (req, res) => {
  const removed = deleteById('catalogs', req.params.id);
  if (!removed) return res.status(404).json({ success: false, message: 'Catalog not found' });
  res.json({ success: true });
});

app.post('/api/lots', (req, res) => {
  const record = {
    id: makeRecordId(),
    name: req.body.name || 'Untitled Lot',
    catalog: req.body.catalog || '',
    status: req.body.status || 'Pending',
  };
  records.lots.push(record);
  saveRecords(records);
  res.json({ success: true, record });
});

app.get('/api/lots', (req, res) => {
  res.json(records.lots);
});

app.put('/api/lots/:id', (req, res) => {
  const updated = updateById('lots', req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'Lot not found' });
  res.json({ success: true, record: updated });
});

app.delete('/api/lots/:id', (req, res) => {
  const removed = deleteById('lots', req.params.id);
  if (!removed) return res.status(404).json({ success: false, message: 'Lot not found' });
  res.json({ success: true });
});

app.post('/api/users', (req, res) => {
  const record = {
    id: makeRecordId(),
    name: req.body.name || '',
    email: req.body.email || '',
    role: req.body.role || 'User',
    status: req.body.status || 'Active',
  };
  records.users.push(record);
  saveRecords(records);
  res.json({ success: true, record });
});

app.get('/api/users', (req, res) => {
  res.json(records.users);
});

app.put('/api/users/:id', (req, res) => {
  const updated = updateById('users', req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, record: updated });
});

app.delete('/api/users/:id', (req, res) => {
  const removed = deleteById('users', req.params.id);
  if (!removed) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true });
});

app.post('/api/reports', (req, res) => {
  const record = {
    id: makeRecordId(),
    name: req.body.name || 'Auto Report',
    type: req.body.type || 'Users',
    status: req.body.status || 'Completed',
  };
  records.reports.push(record);
  saveRecords(records);
  res.json({ success: true, record });
});

app.get('/api/reports', (req, res) => {
  res.json(records.reports);
});

app.put('/api/reports/:id', (req, res) => {
  const updated = updateById('reports', req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'Report not found' });
  res.json({ success: true, record: updated });
});

app.delete('/api/reports/:id', (req, res) => {
  const removed = deleteById('reports', req.params.id);
  if (!removed) return res.status(404).json({ success: false, message: 'Report not found' });
  res.json({ success: true });
});

app.post('/api/documents', upload.single('file'), (req, res) => {
  const record = {
    id: makeRecordId(),
    name: req.body.name || req.body.auctionName || req.file?.originalname || 'document-file',
    category: req.body.category || req.body.documentType || 'Other',
    status: req.body.status || 'Pending',
    auctionName: req.body.auctionName || '',
    companyName: req.body.companyName || '',
    documentType: req.body.documentType || '',
    fileName: req.file?.originalname || 'document-file',
    fileURL: req.file ? `/uploads/${req.file.filename}` : '',
  };
  records.documents.push(record);
  saveRecords(records);
  res.json({ success: true, record });
});

app.get('/api/documents', (req, res) => {
  res.json(records.documents);
});

app.put('/api/documents/:id', upload.single('file'), (req, res) => {
  const existing = records.documents.find((item) => String(item.id) === String(req.params.id));
  if (!existing) return res.status(404).json({ success: false, message: 'Document not found' });

  const patch = { ...req.body };
  if (req.file) {
    patch.fileName = req.file.originalname;
    patch.fileURL = `/uploads/${req.file.filename}`;
  }

  const updated = updateById('documents', req.params.id, patch);
  if (!updated) return res.status(404).json({ success: false, message: 'Document not found' });
  res.json({ success: true, record: updated });
});

app.delete('/api/documents/:id', (req, res) => {
  const removed = deleteById('documents', req.params.id);
  if (!removed) return res.status(404).json({ success: false, message: 'Document not found' });
  res.json({ success: true });
});

app.use('/uploads', express.static(uploadDir, { index: false }));

app.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: 'File not found' });
  }
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
