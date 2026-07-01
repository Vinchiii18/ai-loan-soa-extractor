import axios from "axios";

console.log(import.meta.env.VITE_API_URL);

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function analyzeLoan(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await API.post("/loan/analyze", formData);

  return response.data;
}
