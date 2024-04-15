import { DataItemClientProp } from "../../type/DataItemClientProp";
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

export const createOrUpdateClient = async (
  dataClient: Partial<DataItemClientProp>
) => {
  try {
    const response = await axiosClient.post(
      "/api/services/app/Customer/Save",
      dataClient
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
