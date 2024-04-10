import { AxiosRequestConfig } from "axios";
import axiosClient from "../axiosClient";
import { TypeDataModalProject } from "../../type/TypeDataModalProject";

export const getAllProjects = async (params: {
  status: number | null;
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

export const getProjectsById = async (
  id: number | AxiosRequestConfig<number> | undefined
) => {
  try {
    const response = await axiosClient.get(
      `/api/services/app/Project/Get?input=${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const handleDeActiveProjects = async (
  id: number | AxiosRequestConfig<number> | undefined
) => {
  try {
    const response = await axiosClient.post(
      "/api/services/app/Project/Inactive",
      {
        id
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const handleActiveProjects = async (
  id: number | AxiosRequestConfig<number> | undefined
) => {
  try {
    const response = await axiosClient.post(
      "/api/services/app/Project/Active",
      {
        id
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const deleteProject = async (
  id: number | AxiosRequestConfig<number> | undefined
) => {
  try {
    const response = await axiosClient.delete(
      `/api/services/app/Project/Delete?Id=${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createOrUpdateProject = async (
  dataProject: Partial<TypeDataModalProject> | undefined
) => {
  try {
    const response = await axiosClient.post(
      "/api/services/app/Project/Save",
      dataProject
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
