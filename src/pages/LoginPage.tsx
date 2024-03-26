import Person from "@mui/icons-material/Person";
import { Box, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { loginAPI } from "../services/Auth";
import axios from "axios";

const LoginPage = () => {
  const [formLogin, setFormLogin] = useState({
    nameOrEmail: "",
    passWord: ""
  });

  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await loginAPI(formLogin.nameOrEmail, formLogin.passWord);
  };

  const handleData = async () => {
    const abc = await axios.get("https://training-api-timesheet.nccsoft.vn", {
      url: "/api/services/app/Task/GetAll"
    });
    console.log("first: ", abc);
  };

  return (
    <section className="bg-[#00bcd4] dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-4xl font-semibold text-white dark:text-white"
        >
          Timesheet
        </a>
        <div className="bg-white shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 space-y-4 md:space-y-6 sm:p-5">
            <h4 className="text-center text-[#555] font-semibold text-lg md:text-2xl dark:text-white my-[10px]">
              Log in
            </h4>
            <form className="space-y-4 md:space-y-6 w-[320px]" action="#">
              <div>
                <div className="relative h-11 w-full">
                  <Box sx={{ display: "flex", alignItems: "end", gap: 2 }}>
                    <Person className="text-[#555] !text-xl"></Person>
                    <TextField
                      id="standard-basic"
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
                  type="submit"
                  className="text-sm bg-[#e0e0e0] hover:bg-pink-500 text-white py-2 px-4 rounded"
                  onClick={handleSubmit}
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
