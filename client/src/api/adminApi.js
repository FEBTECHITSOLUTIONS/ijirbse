import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api';
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;


// ✅ Create a reusable axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});


export const getArchivedIssues = async () => {
  try {
    const response = await api.get("/archivedissues");
    return {
      data: response.data.data,
      message: response.data.message,
      status: response.status,
    };
  } catch (error) {
    console.error("❌ Error fetching archived issues:", error);
    return {
      data: [],
      message: error.response?.data?.message || "Failed to fetch archived issues",
      status: error.response?.status || 500,
    };
  }
};
