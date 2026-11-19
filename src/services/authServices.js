import api from "./api";

export const adminLogin = async (credentials) => {
  const response = await api.post("/admin/login", credentials);
  return response.data;
};

export const getAdminProfile = async () => {
  const response = await api.get("/admin/me");
  return response.data;
};

export const adminLogout = async () => {
  const response = await api.post("/admin/logout");
  return response.data;
};