import React, { ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent
} from "@mui/material";
import { ButtonControl } from "../Button/Button";
import "./Modal.scss";
import { ArrayTypeTask } from "../../constants/task/ArrayTypeTask";
import { DataItemProp } from "../../type/DataItemProp";
import { TITLE_BUTTON } from "../../constants/button/ButtonConstants";

interface ModalProps {
  isOpen: boolean;
  handleIsOpen: () => void;
  handleChange: (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<"">
      | SelectChangeEvent<number>
  ) => void;
  handleSubmit: () => void;
  dataItemProp: Partial<DataItemProp> | undefined;
  handleGetDataModal: (item: Partial<DataItemProp> | undefined) => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
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
        <DialogContent>
          <div className="pb-[18px]">
            <TextField
              defaultValue={
                props.dataItemProp && props.dataItemProp.name
                  ? props.dataItemProp.name
                  : ""
              }
              id="standard-basic"
              label={<span className="text-sm">Name</span>}
              name="name"
              variant="standard"
              required
              onChange={(e) => props.handleChange(e)}
            />
          </div>
          <div className="pb-[18px]">
            <InputLabel>
              <span className="text-xs">Task type</span>
            </InputLabel>
            <Select
              name="type"
              value={
                props.dataItemProp && props.dataItemProp.id
                  ? props.dataItemProp.type
                  : 0
              }
              onChange={(e) => props.handleChange(e)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              variant="standard"
            >
              {ArrayTypeTask.map((item, index) => (
                <MenuItem value={item.type} className="!text-sm" key={index}>
                  {item.titleTask}
                </MenuItem>
              ))}
            </Select>
          </div>
        </DialogContent>
        <DialogActions className="">
          <ButtonControl
            title={TITLE_BUTTON.CANCEL}
            dataItem={props.dataItemProp}
            handleClick={() => {
              props.handleIsOpen(), props.handleGetDataModal(undefined);
            }}
          />
          <ButtonControl
            title={TITLE_BUTTON.SAVE}
            dataItem={props.dataItemProp}
            handleClick={() => {
              props.handleSubmit(), props.handleGetDataModal(undefined);
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
