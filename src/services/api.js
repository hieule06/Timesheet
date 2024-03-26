import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://training-api-timesheet.nccsoft.vn" // Cập nhật baseURL của bạn
});

export default axiosInstance;
