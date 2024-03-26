import React, { ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel
} from "@mui/material";
import { ButtonControl } from "../Button/Button";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  handleIsOpen: () => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => void;
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
              value={""}
              onChange={(e) => props.handleChange(e)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              variant="standard"
            >
              <MenuItem value="">
                <b className="text-sm font-normal">None</b>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
        </DialogContent>
        <DialogActions className="">
          <ButtonControl
            title={"Cancel"}
            handleCancel={props.handleIsOpen}
            handleSave={() => {}}
          />
          <ButtonControl
            title={"Save"}
            handleCancel={() => {}}
            handleSave={props.handleSubmit}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
