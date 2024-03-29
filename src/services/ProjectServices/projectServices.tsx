import axiosClient from "../axiosClient";

export const getAllProjects = async (params: {
  status: number;
  search: string;
}) => {
  try {
    const response = await axiosClient.get("/api/services/app/Project/GetAll", {
      params: params
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
