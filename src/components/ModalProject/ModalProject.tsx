import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  AppBar,
  Box,
  IconButton,
  Tab,
  Tabs,
  Typography,
  DialogActions
} from "@mui/material";
import "./ModalProject.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ModalGeneral } from "./ModalGeneral/ModalGeneral";
import { ModalTeam } from "./ModalTeam/ModalTeam";
import { ModalTaskPrj } from "./ModalTaskPrj/ModalTaskPrj";
import { ButtonControl } from "../Button/Button";
import { TITLE_BUTTON } from "../../constants/button/ButtonConstants";
import { TypeDataModalProject } from "../../type/TypeDataModalProject";
import { TypeListCustomer } from "../../type/TypeListCustomer";
import { DataItemTaskProp } from "../../type/DataItemTaskProp";
import { DataItemProjectProp } from "../../type/DataItemProjectProp";
import { TypeDataUser } from "../../type/TypeDataUser";
import { createOrUpdateProject } from "../../services/ProjectServices/projectServices";
import { Toast } from "../toast/Toast";
import { ModalConfirm } from "../ModalConfirm/ModalConfirm";
import { ArrayTabPanel } from "../../constants/project/ListTabPanel";

interface ModalProjectProps {
  handleIsOpenModal: () => void;
  handleIsCloseModal: () => void;
  isOpenModal: boolean;
  dataItemProjectProp: Partial<TypeDataModalProject> | undefined;
  dataListCustomer: TypeListCustomer[] | undefined;
  dataListTask: DataItemTaskProp[] | undefined;
  dataListUserNotPagging: TypeDataUser[] | undefined;
  handleGetDataModalProject: (
    item: Partial<TypeDataModalProject> | undefined
  ) => void;
  handleIsOnKeyDown: () => void;
  handleGetListCusTomer?: (listCustomer: TypeListCustomer[]) => void;
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

  const handleCancel = () => {
    props.handleGetDataModalProject(undefined);
    props.handleIsCloseModal();
    setValue(0); // trở về modal tab general
  };

  const handleSave = async () => {
    try {
      const arrTask: { taskId: number; billable: boolean }[] | undefined = [];
      props.dataItemProjectProp?.tasks
        ? props.dataItemProjectProp?.tasks
        : props.dataListTask &&
          props.dataListTask.map(
            (item) =>
              item.type === 0 &&
              arrTask.push({ taskId: item.id, billable: true })
          );
      if (!props.dataItemProjectProp?.users) {
        ModalConfirm(`Project must have at least one member!`, undefined);
      } else {
        const result = await createOrUpdateProject(
          props.dataItemProjectProp?.projectType
            ? props.dataItemProjectProp
            : {
                ...props.dataItemProjectProp,
                projectType: 1,
                projectTargetUsers: [],
                tasks:
                  arrTask.length > 0
                    ? arrTask
                    : props.dataItemProjectProp?.tasks
              }
        );
        if (result && result.success) {
          props.handleIsCloseModal();
          await Toast.fire({
            icon: "success",
            title: "Update Project Successfully",
            background: "#51a351"
          });
          props.handleIsOnKeyDown();
          setValue(0); // trở về modal tab general
          props.handleGetDataModalProject(undefined);
        } else {
          await Toast.fire({
            icon: "error",
            title: `${result.response.data.error.message}`,
            background: "#bd362f"
          });
        }
      }
    } catch (error) {
      await Toast.fire({
        icon: "error",
        title: `${error?.response?.data?.error?.message}`,
        background: "#bd362f"
      });
    }
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
          className="!text-3xl text-[#000000DE] font-extrabold border-b border-gray-300 !mt-5 !mb-[10px]"
        >
          Edit Project : {props.dataItemProjectProp?.name}
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
              className="pt-5 bg-white"
            >
              {ArrayTabPanel.map((tab) => (
                <Tab
                  sx={{ maxWidth: "180px" }}
                  label={<span className="normal-case font-medium">{tab}</span>}
                />
              ))}
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <ModalGeneral
              dataItemProjectProp={props.dataItemProjectProp}
              dataListCustomer={props.dataListCustomer}
              handleGetDataModalProject={(
                item: Partial<DataItemProjectProp> | undefined
              ) => props.handleGetDataModalProject(item)}
              handleGetListCusTomer={(listCustomer) =>
                props.handleGetListCusTomer &&
                props.handleGetListCusTomer(listCustomer)
              }
            />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <ModalTeam
              dataItemProjectProp={props.dataItemProjectProp}
              dataListUserNotPagging={props.dataListUserNotPagging}
              handleGetDataModalProject={(
                item: Partial<DataItemProjectProp> | undefined
              ) => props.handleGetDataModalProject(item)}
            />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <ModalTaskPrj
              dataListTask={props.dataListTask}
              dataItemProjectProp={props.dataItemProjectProp}
              handleGetDataModalProject={(
                item: Partial<DataItemProjectProp> | undefined
              ) => props.handleGetDataModalProject(item)}
            />
          </TabPanel>
        </Box>
        <DialogActions className="left-0 bg-white">
          <ButtonControl
            title={TITLE_BUTTON.CANCEL}
            handleClick={handleCancel}
            dataItem={undefined}
          />
          <ButtonControl
            title={TITLE_BUTTON.SAVE}
            handleClick={handleSave}
            disabled={
              props.dataItemProjectProp?.customerId &&
              props.dataItemProjectProp?.name &&
              props.dataItemProjectProp?.code
                ? false
                : true
            }
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalProject;
