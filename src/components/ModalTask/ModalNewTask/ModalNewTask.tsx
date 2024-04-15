import React, { ChangeEvent } from "react";
import {
  DialogContent,
  TextField,
  InputLabel,
  SelectChangeEvent,
  Select,
  MenuItem
} from "@mui/material";
import { DataItemTaskProp } from "../../../type/DataItemTaskProp";
import { ArrayTypeTask } from "../../../constants/task/ArrayTypeTask";

interface ModalNewTaskProps {
  dataItemTaskProp: Partial<DataItemTaskProp> | undefined;
  handleChange: (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<"">
      | SelectChangeEvent<number>
  ) => void;
}

export const ModalNewTask: React.FC<ModalNewTaskProps> = (props) => {
  return (
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
  );
};

export default ModalNewTask;
