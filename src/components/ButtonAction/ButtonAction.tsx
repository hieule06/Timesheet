import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataItemProjectProp } from "../../type/DataItemProjectProp";
import {
  deleteProject,
  getProjectsById,
  handleActiveProjects,
  handleDeActiveProjects
} from "../../services/ProjectServices/projectServices";
import { Toast } from "../toast/Toast";
import { ModalConfirm } from "../ModalConfirm/ModalConfirm";
import { TITLE_TOAST } from "../../constants/toast/ToastConstants";
import { getAllClients } from "../../services/Customer/customerService";
import { TypeDataModalProject } from "../../type/TypeDataModalProject";
import { getAllTasks } from "../../services/TaskServices/taskServices";
import { DataItemTaskProp } from "../../type/DataItemTaskProp";
import { TypeListCustomer } from "../../type/TypeListCustomer";
import { getUserNotPagging } from "../../services/User/userService";
import { TypeDataUser } from "../../type/TypeDataUser";

interface ButtonActionProps {
  handleIsOpenModal: () => void;
  handleIsCloseModal: () => void;
  setIsOnKeyDown: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModal: boolean;
  dataItemProject: DataItemProjectProp;
  isOnKeyDown: boolean;
  handleGetDataModalProject: (
    item: Partial<TypeDataModalProject> | undefined
  ) => void;
  handleGetListCusTomer: (listCustomer: TypeListCustomer[]) => void;
  handleGetListTaskPrj: (listTask: DataItemTaskProp[] | undefined) => void;
  handleGetListUserNotPagging: (
    listUserNotPagging: TypeDataUser[] | undefined
  ) => void;
}

export const ButtonAction: React.FC<ButtonActionProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: {
    currentTarget: React.SetStateAction<null>;
  }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeActive = async () => {
    ModalConfirm(TITLE_TOAST.DEACTIVE, props.dataItemProject?.name).then(
      async (result) => {
        if (result.isConfirmed) {
          const result = await handleDeActiveProjects(props.dataItemProject.id);
          if (result && result.success) {
            const toast = await Toast.fire({
              icon: "success",
              title: "Deactive Project Successfully",
              background: "#51a351"
            });
            if (toast) {
              props.setIsOnKeyDown(!props.isOnKeyDown);
            }
          } else {
            await Toast.fire({
              icon: "error",
              title: `${result.response.data.error.message}`,
              background: "#bd362f"
            });
          }
        }
      }
    );
    handleClose();
  };

  const handleActive = async () => {
    ModalConfirm(TITLE_TOAST.ACTIVE, props.dataItemProject?.name).then(
      async (result) => {
        if (result.isConfirmed) {
          const result = await handleActiveProjects(props.dataItemProject.id);
          if (result && result.success) {
            const toast = await Toast.fire({
              icon: "success",
              title: "Active Project Successfully",
              background: "#51a351"
            });
            if (toast) {
              props.setIsOnKeyDown(!props.isOnKeyDown);
            }
          } else {
            await Toast.fire({
              icon: "error",
              title: `${result.response.data.error.message}`,
              background: "#bd362f"
            });
          }
        }
      }
    );
    handleClose();
  };

  const handleDelete = async () => {
    ModalConfirm(TITLE_TOAST.DELETE, props.dataItemProject?.name).then(
      async (result) => {
        if (result.isConfirmed) {
          const result = await deleteProject(props.dataItemProject.id);
          if (result && result.success) {
            const toast = await Toast.fire({
              icon: "success",
              title: "Delete Project Successfully",
              background: "#51a351"
            });
            if (toast) {
              props.setIsOnKeyDown(!props.isOnKeyDown);
            }
          } else {
            await Toast.fire({
              icon: "error",
              title: `${result.response.data.error.message}`,
              background: "#bd362f"
            });
          }
        }
      }
    );
    handleClose();
  };

  return (
    <th className="wrapper-btn-action">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(e) => handleClick(e)}
        endIcon={<ArrowDropDownIcon />}
        className="btn-action"
      >
        Actions
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {
          handleClose();
        }}
        sx={{ padding: "0 16px" }}
      >
        <MenuItem
          onClick={async () => {
            const listClients = await getAllClients();
            if (listClients && listClients.result) {
              props.handleGetListCusTomer(listClients.result);
            }
            const dataItemProject = await getProjectsById(
              props.dataItemProject.id
            );
            if (dataItemProject && dataItemProject.result) {
              props.handleGetDataModalProject(dataItemProject.result);
            }
            handleClose(), props.handleIsOpenModal();
            const listTask = await getAllTasks();
            if (listTask && listTask.result) {
              props.handleGetListTaskPrj(listTask.result);
            }
            const listUserNotPagging = await getUserNotPagging();
            if (listUserNotPagging && listUserNotPagging.result) {
              props.handleGetListUserNotPagging(listUserNotPagging.result);
            }
          }}
          sx={{ fontSize: "14px" }}
        >
          <EditIcon
            sx={{ marginRight: "16px", height: "48px", color: "#0000008A" }}
          />
          Edit
        </MenuItem>
        {props.dataItemProject.status === 1 ? (
          <MenuItem onClick={handleActive} sx={{ fontSize: "14px" }}>
            <DoneIcon
              sx={{ marginRight: "16px", height: "48px", color: "#0000008A" }}
            />
            Active
          </MenuItem>
        ) : (
          <MenuItem onClick={handleDeActive} sx={{ fontSize: "14px" }}>
            <ClearIcon
              sx={{ marginRight: "16px", height: "48px", color: "#0000008A" }}
            />
            Deactive
          </MenuItem>
        )}
        <MenuItem
          onClick={handleDelete}
          sx={{ fontSize: "14px", color: "#A94442" }}
        >
          <DeleteIcon
            sx={{ marginRight: "16px", height: "48px", color: "#0000008A" }}
          />
          Delete
        </MenuItem>
      </Menu>
    </th>
  );
};
