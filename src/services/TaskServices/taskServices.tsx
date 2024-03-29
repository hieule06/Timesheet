import { DataItemProp } from "../../type/DataItemProp";
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

export const createOrUpdateTask = async (dataTask: Partial<DataItemProp>) => {
  try {
    const response = await axiosClient.post(
      "/api/services/app/Task/Save",
      dataTask
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
