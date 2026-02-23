import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:4000/api/v1",
  baseURL: "https://qa-emission-calc-poc.ggexcel.ai/api/v1",
  timeout: 5000,
});

export const calculateEmission = async (payload) => {
  try {
    const response = await api.post("/calculate/emission", payload);
    return response.data;
  } catch (error) {
    console.error("Emission calculation failed:", error);
    throw error;
  }
};

// const api = axios.create({
//   baseURL: "http://localhost:8147/api/app-user",
//   timeout: 5000,
//   headers: {
//     Accept: "*/*",
//     Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQVBQX1VTRVIiLCJ1c2VySWQiOjI0MSwic3ViIjoiYXNoQHlvcG1haWwuY29tIiwiaWF0IjoxNzcxODMwNzkwLCJleHAiOjE3NzE4MzI1OTB9.JdH1GWx5-6_0_ZMz2OnPRS56M_OBw22uH4AjfIxi6xQ`,
//     "Refresh-Token": `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2hAeW9wbWFpbC5jb20iLCJpYXQiOjE3NzE4MzA3OTAsImV4cCI6MTc3MTg0MTU5MH0.6grvKbFJ-hAUtxdCetSW28xtrWGmES_UISwfs-zQ5Yo`,
//   },
// });

// export const calculateEmission = async (payload) => {
//   try {
//     const response = await api.post("/calculate-carbon-emission-new", payload);
//     return response.data;
//   } catch (error) {
//     console.error("Emission calculation failed:", error);
//     throw error;
//   }
// };

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
