import axios from "axios";

// Create a configured instance of Axios
export const api = axios.create({
  // This points to your Python Backend
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to upload the bill
export const uploadBill = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  // We post to the /upload endpoint we built
  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
