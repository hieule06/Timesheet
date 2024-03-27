import axiosClient from "../axiosClient";

export const getAllTasks = async () => {
  try {
    const response = await axiosClient.get("/api/services/app/Task/GetAll");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
