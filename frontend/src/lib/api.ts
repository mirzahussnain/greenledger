import axios from "axios";

export interface Bill {
  id: number;
  file_name: string;
  extracted_kwh: number;
  upload_date: string;
}
// Create a configured instance of Axios
export const api = axios.create({
  // This points to your Python Backend
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to upload the bill
export const uploadBill = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append("file", file);

  // We post to the /upload endpoint we built
  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getBills = async (token: string): Promise<Bill[]> => {
  const response = await api.get("/bills", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
