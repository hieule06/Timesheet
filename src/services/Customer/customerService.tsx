import axiosClient from "../axiosClient";

export const getAllClients = async () => {
  try {
    const response = await axiosClient.get("/api/services/app/Customer/GetAll");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
