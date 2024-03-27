import axiosClient from "./axiosClient";

export const loginAPI = async (
  userNameOrEmailAddress: string,
  password: string
) => {
  try {
    const response = await axiosClient.post("/api/TokenAuth/Authenticate", {
      userNameOrEmailAddress,
      password
    });
    if (response && response.data && response.data.result.accessToken) {
      // Lưu token vào localStorage
      localStorage.setItem("accessToken", response.data.result.accessToken);
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
