import React, { ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  SelectChangeEvent
} from "@mui/material";
import { ButtonControl } from "../Button/Button";
import "./ModalCreateNew.scss";
import { DataItemTaskProp } from "../../type/DataItemTaskProp";
import { TITLE_BUTTON } from "../../constants/button/ButtonConstants";
import ModalClient from "./ModalClient/ModalClient";
import ModalNewTask from "./ModalNewTask/ModalNewTask";

interface ModalCreateNewProps {
  isClient?: boolean;
  disable?: boolean;
  isOpen: boolean;
  handleIsOpen: () => void;
  handleChange: (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<"">
      | SelectChangeEvent<number>
  ) => void;
  handleSubmit: () => void;
  dataItemTaskProp: Partial<DataItemTaskProp> | undefined;
  handleGetDataModalTask: (item: Partial<DataItemTaskProp> | undefined) => void;
}

export const ModalCreateNew: React.FC<ModalCreateNewProps> = (props) => {
  return (
    <div className="modal">
      <Dialog
        open={props.isOpen}
        onClose={props.handleIsOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onBackdropClick="false"
        className="min-w-56"
      >
        <DialogTitle id="alert-dialog-title">
          <h3 className="text-xl font-normal text-gray-900 dark:text-white">
            New Task
          </h3>
        </DialogTitle>
        {props.isClient ? (
          <ModalClient
            dataItemTaskProp={props.dataItemTaskProp}
            handleChange={(e) => props.handleChange(e)}
          />
        ) : (
          <ModalNewTask
            dataItemTaskProp={props.dataItemTaskProp}
            handleChange={(e) => props.handleChange(e)}
          />
        )}
        <DialogActions className="">
          <ButtonControl
            title={TITLE_BUTTON.CANCEL}
            dataItem={props.dataItemTaskProp}
            handleClick={() => {
              props.handleIsOpen(), props.handleGetDataModalTask(undefined);
            }}
          />
          <ButtonControl
            title={TITLE_BUTTON.SAVE}
            dataItem={props.dataItemTaskProp}
            handleClick={() => {
              props.handleSubmit(), props.handleGetDataModalTask(undefined);
            }}
            disabled={props.disable}
            isClient={props.isClient}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalCreateNew;
