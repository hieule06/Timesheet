import { useState } from "react";
import "./ProjectPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import Modal from "../../components/Modal/Modal";
import { HeaderContainer } from "../../components/HeaderContainer/HeaderContainer";
import { ButtonControl } from "../../components/Button/Button";

const ProjectPage = () => {
  const [focused, setFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Xử lý dữ liệu biểu mẫu ở đây, ví dụ: gửi dữ liệu đến server
    console.log(formData);
    // Đóng dialog
    handleIsOpen();
  };

  return (
    <div>
      <div className="wrapper-task-page p-[30px] table:ml-[300px] bg-[#e9e9e9] pt-[100px] ">
        <div className="task-page bg-white border-gray-200 border-dashed dark:border-gray-700">
          <HeaderContainer title={"Manage Projects"} />
          <div className="p-5">
            <div className="flex w-full">
              <div className="w-2/6">
                <button
                  type="button"
                  className="flex items-center text-sm font-semibold bg-red-500 text-white px-4 py-2 ml-[10px] shadow-md rounded-md transform transition duration-300 hover:bg-red-600"
                  onClick={handleIsOpen}
                >
                  <FontAwesomeIcon
                    className="space-y-2 mr-1 text-lg line-height-36 padding-x-16"
                    icon={faPlus}
                  />
                  New Task
                </button>
              </div>
              <div className="mb-5 px-[15px] w-4/6">
                <TextField
                  className="w-[450px]"
                  label={
                    <span style={{ letterSpacing: "1px" }}>
                      Search by task name
                    </span>
                  }
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <SearchIcon position="start">
                        <Visibility></Visibility>
                      </SearchIcon>
                    )
                  }}
                  InputLabelProps={{
                    shrink: focused || currentValue,
                    style: { marginLeft: 30 }
                  }}
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </div>
            </div>
            <div className="wrapper-task-list grid gap-4">
              <table className="w-full text-sm text-left bg-[#D3D3D3] rounded-[5px]">
                <thead className="p-[10px] pl-5 text-lg font-bold text-[#555555]">
                  <tr className="border-b dark:border-gray-700">
                    <th scope="col" className="px-6 py-3">
                      client1 api
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="flex justify-between items-center bg-white border-b">
                    <th className="mx-[5px] px-[5px] py-[10px] font-medium text-gray-900 whitespace-nowrap ">
                      <b className="text-sm text-[#555] font-normal">Coding</b>
                    </th>
                    <td className="px-[5px]">
                      <ButtonControl
                        handleCancel={() => {}}
                        handleSave={() => {}}
                        title={"Delete"}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            isOpen={isOpen}
            handleIsOpen={handleIsOpen}
            handleSubmit={handleSubmit}
            handleChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
