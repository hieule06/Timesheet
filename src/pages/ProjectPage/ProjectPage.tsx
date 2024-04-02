import { SetStateAction, useState } from "react";
import "./ProjectPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import Modal from "../../components/Modal/Modal";
import { HeaderContainer } from "../../components/HeaderContainer/HeaderContainer";
import { ProjectList } from "./component/ProjectList/ProjectList";
import {
  Dialog,
  Tabs,
  Tab,
  Box,
  DialogTitle,
  IconButton,
  Button
} from "@mui/material";
import { ButtonControl } from "../../components/Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, Form, Input, Select } from "antd";

const ProjectPage = () => {
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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

  const [tabIndex, setTabIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTabChange = (event: any, newIndex: SetStateAction<number>) => {
    setTabIndex(newIndex);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
                    shrink: focused || !!searchValue,
                    style: { marginLeft: 30 }
                  }}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </div>
            </div>
            <ProjectList />
          </div>
          <Modal
            isOpen={isOpen}
            handleIsOpen={handleIsOpen}
            handleSubmit={handleSubmit}
            handleChange={(e) => handleChange(e)}
            dataItemProp={undefined}
            handleGetDataModal={() => {}}
          />
        </div>
      </div>

      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          className="!text-3xl text-[#000000DE] font-bold border-b border-gray-300"
        >
          Edit Project : Ha-Test
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          className="tab-container border-b border-gray-300 mt-5"
        >
          <Tab
            label={<span className="normal-case">General</span>}
            className="opacity-60 !min-w-[160px]"
          />
          <Tab
            label={<span className="normal-case">Team</span>}
            className="opacity-60 !min-w-[160px]"
          />
          <Tab
            label={<span className="normal-case">Tasks</span>}
            className="opacity-60 !min-w-[160px]"
          />
        </Tabs>
        <Box p={2} className="tab-content-container">
          <div
            className={`tab-content ${
              tabIndex === 0 ? "active-tab" : "inactive-tab"
            }`}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" }
                ]}
                className=""
              >
                <div className="flex">
                  <Select
                    className="mr-9"
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={[
                      {
                        value: "jack",
                        label: "Jack"
                      },
                      {
                        value: "lucy",
                        label: "Lucy"
                      },
                      {
                        value: "tom",
                        label: "Tom"
                      }
                    ]}
                  />
                  <ButtonControl
                    handleClick={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    title={"abcd"}
                    dataItem={undefined}
                  />
                </div>
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" }
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" }
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button>Submit</Button>
              </Form.Item>
            </Form>
          </div>
          <div
            className={`tab-content ${
              tabIndex === 1 ? "active-tab" : "inactive-tab"
            }`}
          >
            Content of Tab 2
          </div>
          <div
            className={`tab-content ${
              tabIndex === 2 ? "active-tab" : "inactive-tab"
            }`}
          >
            Content of Tab 3
          </div>
        </Box>
      </Dialog>
    </div>
  );
};

export default ProjectPage;
