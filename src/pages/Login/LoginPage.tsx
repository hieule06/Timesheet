import Person from "@mui/icons-material/Person";
import { Box, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { loginAPI } from "../../services/Auth";
import axiosClient from "../../services/axiosClient";
import "./LoginPage.scss";

const LoginPage = () => {
  const [formLogin, setFormLogin] = useState({
    nameOrEmail: "",
    passWord: ""
  });

  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await loginAPI(formLogin.nameOrEmail, formLogin.passWord);
    window.location.href = "/task";
  };

  const handleData = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Token not found");
    }

    // Gửi yêu cầu để lấy dữ liệu người dùng
    try {
      const response = await axiosClient.get("/api/services/app/Task/GetAll");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="wrapper-login-page bg-[#00bcd4] dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
        <a
          href="#"
          className="flex items-center mb-6 text-4xl font-semibold text-white dark:text-white"
        >
          Timesheet
        </a>
        <div className="bg-white shadow mt-0 max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className="space-y-6 p-5">
            <h4 className="text-center text-[#555] font-semibold text-2xl dark:text-white my-[10px]">
              Log in
            </h4>
            <form className="space-y-6 w-[320px]" action="#">
              <div>
                <div className="relative h-11 w-full">
                  <Box sx={{ display: "flex", alignItems: "end", gap: 2 }}>
                    <Person className="text-[#555] !text-xl"></Person>
                    <TextField
                      id="standard-basic1"
                      name="nameOrEmail"
                      label={
                        <span className="text-sm">
                          User name or email
                          <span>*</span>
                        </span>
                      }
                      variant="standard"
                      fullWidth
                      onChange={handleOnChange}
                    />
                  </Box>
                </div>
              </div>
              <div>
                <Box sx={{ display: "flex", alignItems: "end", gap: 2 }}>
                  <LockIcon className="text-[#555] !text-xl"></LockIcon>
                  <TextField
                    id="standard-basic"
                    name="passWord"
                    label={
                      <span className="text-sm">
                        Password
                        <span>*</span>
                      </span>
                    }
                    variant="standard"
                    fullWidth
                    onChange={handleOnChange}
                  />
                </Box>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border-2 rounded border-solid border-gray-400"
                      required={undefined}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300 font-semibold"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  className={`text-sm bg-[#e0e0e0] ${
                    formLogin.nameOrEmail && formLogin.passWord && "bg-pink-500"
                  } text-white py-2 px-4 rounded`}
                  onClick={handleSubmit}
                  disabled={
                    formLogin.nameOrEmail && formLogin.passWord ? false : true
                  }
                >
                  Log in
                </button>
              </div>
              <div className="mb-[15px]">
                <button
                  className="w-full text-sm text-white bg-[#3f51b5] rounded py-2"
                  onClick={handleData}
                >
                  Log In With Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
