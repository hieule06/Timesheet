import axiosClient from "../axiosClient";

export const getUserNotPagging = async () => {
  try {
    const response = await axiosClient.get(
      "/api/services/app/User/GetUserNotPagging"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
