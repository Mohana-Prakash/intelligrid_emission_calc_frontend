import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  timeout: 5000,
});

export const calculateEmission = (payload) =>
  api.post(`/calculate/emission`, payload);

// export const fetchCalculationHistory = (payload) =>
//   api.get(`/calculate/history?user_id=${payload.user_id}`);

export const fetchEmissionFactors = (activity) =>
  api.get(`/emission-factors`, {
    params: { activity },
  });

export const addEmissionFactors = (records) =>
  api.post("/emission-factors/bulk", records);

export const updateEmissionFactor = (scopeId, payload) =>
  api.put(`/emission-factors/${scopeId}`, payload);

export const deleteEmissionFactor = (scopeId) =>
  api.delete(`/emission-factors/${scopeId}`);

export default api;
