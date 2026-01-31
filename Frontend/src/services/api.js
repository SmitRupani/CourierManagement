import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to get cookie value
const getCookie = (name) => {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
};

// Interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    // Try cookies first, then localStorage for backward compatibility
    const token = getCookie('token') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  getCurrentUser: () => api.get('/auth/me'),
};

export const packageService = {
  createPackage: (data) => api.post('/packages', data),
  getPackageById: (id) => api.get(`/packages/${id}`),
  trackPackage: (trackingNumber) => api.get(`/packages/track/${trackingNumber}`),
  getMyPackages: () => api.get('/packages/my-packages'),
  getAllPackages: (params) => api.get('/packages', { params }),
  updateStatus: (id, data) => api.patch(`/packages/${id}/status`, data),
  cancelPackage: (id) => api.patch(`/packages/${id}/cancel`),
  calculatePrice: (data) => api.post('/packages/calculate-price', data),
};

export const adminService = {
  getStats: () => api.get('/admin/stats'),
  getAllUsers: (params) => api.get('/admin/users', { params }),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  updateUserRole: (id, role) => api.patch(`/admin/users/${id}/role`, { role }),
  updateUserStatus: (id, active) => api.patch(`/admin/users/${id}/status`, { active }),
  assignCourier: (packageId, courierId) => api.patch(`/admin/packages/${packageId}/assign`, { courierId }),
};

export const hubService = {
  getAllHubs: () => api.get('/hubs'),
  getHubById: (id) => api.get(`/hubs/${id}`),
  createHub: (data) => api.post('/hubs', data),
  updateHub: (id, data) => api.put(`/hubs/${id}`, data),
  deleteHub: (id) => api.delete(`/hubs/${id}`),
};

export const trackingService = {
  getHistory: (trackingNumber) => api.get(`/tracking/${trackingNumber}/history`),
  addEvent: (packageId, data) => api.post(`/tracking/${packageId}/event`, data),
};

export const userService = {
    getProfile: () => api.get('/users/me'),
    updateProfile: (data) => api.put('/users/me', data),
};

export const notificationService = {
    getNotifications: () => api.get('/notifications'),
};

export default api;
