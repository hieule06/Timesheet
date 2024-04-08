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
import "./ModalTask.scss";
import { ArrayTypeTask } from "../../constants/task/ArrayTypeTask";
import { DataItemTaskProp } from "../../type/DataItemTaskProp";
import { TITLE_BUTTON } from "../../constants/button/ButtonConstants";

interface ModalTaskProps {
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

export const ModalTask: React.FC<ModalTaskProps> = (props) => {
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
                props.dataItemTaskProp && props.dataItemTaskProp.name
                  ? props.dataItemTaskProp.name
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
                props.dataItemTaskProp && props.dataItemTaskProp.id
                  ? props.dataItemTaskProp.type
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
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalTask;
