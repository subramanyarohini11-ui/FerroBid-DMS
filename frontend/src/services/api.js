import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const buildFormData = (payload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });
  return formData;
};

export const uploadApproval = (companyName, file) => {
  const formData = new FormData();
  formData.append('companyName', companyName);
  formData.append('file', file);
  return api.post('/approval', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getApprovalRecords = () => api.get('/approval');

export const uploadLotLetter = (companyName, file) => {
  const formData = new FormData();
  formData.append('companyName', companyName);
  formData.append('file', file);
  return api.post('/lot', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getLotRecords = () => api.get('/lot');

export const uploadAccountDetails = (accountHolderName, companyName, file) => {
  const formData = new FormData();
  formData.append('accountHolderName', accountHolderName);
  formData.append('companyName', companyName);
  formData.append('file', file);
  return api.post('/account', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getAccountRecords = () => api.get('/account');

export const uploadEmdDocument = (documentName, companyName, file) => {
  const formData = new FormData();
  formData.append('documentName', documentName);
  formData.append('companyName', companyName);
  formData.append('file', file);
  return api.post('/emd', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getEmdRecords = () => api.get('/emd');

export const uploadBuyer = (payload) => {
  const formData = buildFormData(payload);

  return api.post('/buyers', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getBuyers = () => api.get('/buyers');

export const createBuyer = (payload) => api.post('/buyers', payload);

export const updateBuyer = (id, payload) => api.put(`/buyers/${id}`, payload);
export const deleteBuyer = (id) => api.delete(`/buyers/${id}`);

export const uploadSeller = (payload) => {
  const formData = buildFormData(payload);

  return api.post('/sellers', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getSellers = () => api.get('/sellers');

export const createSeller = (payload) => api.post('/sellers', payload);

export const updateSeller = (id, payload) => api.put(`/sellers/${id}`, payload);
export const deleteSeller = (id) => api.delete(`/sellers/${id}`);

export const uploadCatalog = (payload) => {
  const formData = buildFormData(payload);

  return api.post('/catalogs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getCatalogs = () => api.get('/catalogs');

export const createCatalog = (payload) => api.post('/catalogs', payload);
export const updateCatalog = (id, payload) => api.put(`/catalogs/${id}`, payload);
export const deleteCatalog = (id) => api.delete(`/catalogs/${id}`);

export const uploadDocument = (payload) => {
  const formData = buildFormData(payload);

  return api.post('/documents', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getDocuments = () => api.get('/documents');

export const createDocument = (payload) => api.post('/documents', payload);

export const updateDocument = (id, payload) => api.put(`/documents/${id}`, payload);
export const deleteDocument = (id) => api.delete(`/documents/${id}`);

export const getUsers = () => api.get('/users');
export const createUser = (payload) => api.post('/users', payload);
export const updateUser = (id, payload) => api.put(`/users/${id}`, payload);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export const getLots = () => api.get('/lots');
export const createLot = (payload) => api.post('/lots', payload);
export const updateLot = (id, payload) => api.put(`/lots/${id}`, payload);
export const deleteLot = (id) => api.delete(`/lots/${id}`);

export const getReports = () => api.get('/reports');
export const createReport = (payload) => api.post('/reports', payload);
export const deleteReport = (id) => api.delete(`/reports/${id}`);
