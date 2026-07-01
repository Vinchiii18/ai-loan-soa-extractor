import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export async function analyzeLoan(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await API.post("/loan/analyze", formData);

  return response.data;
}
