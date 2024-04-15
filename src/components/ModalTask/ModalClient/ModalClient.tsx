import React, { ChangeEvent } from "react";
import { DialogContent, TextField, SelectChangeEvent } from "@mui/material";
import { DataItemTaskProp } from "../../../type/DataItemTaskProp";

interface ModalClientProps {
  dataItemTaskProp: Partial<DataItemTaskProp> | undefined;
  handleChange: (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<"">
      | SelectChangeEvent<number>
  ) => void;
}

export const ModalClient: React.FC<ModalClientProps> = (props) => {
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
        <TextField
          defaultValue={
            props.dataItemTaskProp && props.dataItemTaskProp.name
              ? props.dataItemTaskProp.name
              : ""
          }
          id="standard-basic"
          label={<span className="text-sm">Code</span>}
          name="code"
          variant="standard"
          required
          onChange={(e) => props.handleChange(e)}
        />
      </div>
      <div className="pb-[18px]">
        <TextField
          defaultValue={
            props.dataItemTaskProp && props.dataItemTaskProp.name
              ? props.dataItemTaskProp.name
              : ""
          }
          id="standard-basic"
          label={<span className="text-sm">Address</span>}
          name="address"
          variant="standard"
          onChange={(e) => props.handleChange(e)}
        />
      </div>
    </DialogContent>
  );
};

export default ModalClient;
