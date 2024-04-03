import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  AppBar,
  Box,
  IconButton,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import "./ModalProject.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ModalGeneral } from "./ModalGeneral/ModalGeneral";
import { ModalTeam } from "./ModalTeam/ModalTeam";
import { ModalTaskPrj } from "./ModalTaskPrj/ModalTaskPrj";

interface ModalProjectProps {
  handleIsOpenModal: () => void;
  handleIsCloseModal: () => void;
  isOpenModal: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
    >
      {children}
    </Typography>
  );
}

export const ModalProject: React.FC<ModalProjectProps> = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Dialog
        open={props.isOpenModal}
        onClose={props.handleIsCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="wrapper-dialog-project"
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
          onClick={props.handleIsCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* <Tabs
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
        </Box> */}
        <Box
          sx={{
            bgcolor: "background.paper",
            width: 500,
            position: "relative",
            minHeight: 200
          }}
        >
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <ModalGeneral />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <ModalTeam />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ModalTaskPrj />
          </TabPanel>
        </Box>
      </Dialog>
    </>
  );
};

export default ModalProject;
