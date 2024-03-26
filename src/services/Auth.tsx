import axios from "axios";

const api = "https://training-api-timesheet.nccsoft.vn/api/";

export const loginAPI = async (
  userNameOrEmailAddress: string,
  password: string
) => {
  try {
    const response = await axios.post(api + "TokenAuth/Authenticate", {
      userNameOrEmailAddress,
      password
    });
    if (response && response.data && response.data.result.accessToken) {
      // Lưu token vào localStorage
      localStorage.setItem("AuthToken", response.data.result.accessToken);
    }
  } catch (error) {
    console.log(error);
  }
};
