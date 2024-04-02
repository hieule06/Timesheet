import { AxiosRequestConfig } from "axios";
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

export const deleteArchive = async (
  id: number | AxiosRequestConfig<number> | undefined
) => {
  try {
    const response = await axiosClient.delete(
      `/api/services/app/Task/Archive?Id=${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const handleDeArchive = async (
  id: number | AxiosRequestConfig<number> | undefined
) => {
  try {
    const response = await axiosClient.post(`api/services/app/Task/DeArchive`, {
      id
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteTask = async (
  id: number | AxiosRequestConfig<number> | undefined
) => {
  try {
    const response = await axiosClient.delete(
      `/api/services/app/Task/Delete?Id=${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
