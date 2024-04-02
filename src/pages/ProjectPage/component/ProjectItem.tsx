import dayjs from "dayjs";
import { DataItemProp } from "../../../type/DataItemProp";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";

interface ProjectItemProps {
  dataItemTask: Partial<DataItemProp> | undefined;
  name: string;
  activeMember: number;
  pms: Array<string>;
  timeStart: string;
  timeEnd: string;
}
export const ProjectItem: React.FC<ProjectItemProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <tr className="flex justify-between items-center bg-white border-b">
        <th className="mx-[5px] px-[5px] py-[10px] font-medium text-gray-900 whitespace-nowrap ">
          <b className="text-sm text-[#555] font-normal">{props.name}</b>
          <span className="text-xs text-white font-semibold bg-[#2e95ea] ml-[5px] py-[2px] px-[5px] rounded-[10px]">
            {props.pms.map((item: string, index) =>
              index > 0 ? `,${item}` : item
            )}
          </span>
          <span className="text-xs text-white font-semibold bg-[#f44336] ml-[5px] py-[2px] px-[5px] rounded-[10px]">
            {props.activeMember} members
          </span>
          <span className="text-xs text-white font-semibold bg-[#f89c26] ml-[5px] py-[2px] px-[5px] rounded-[10px]">
            T&M
          </span>
          {(props.timeStart || props.timeEnd) && (
            <span className="text-xs text-white font-semibold bg-[#4caf50] ml-[5px] py-[2px] px-[5px] rounded-[10px]">
              {`${
                props.timeStart
                  ? dayjs(props.timeStart).format("DD/MM/YYYY")
                  : undefined
              }`}
              {props.timeStart && props.timeEnd && " - "}
              {props.timeEnd
                ? dayjs(props.timeEnd).format("DD/MM/YYYY")
                : undefined}
            </span>
          )}
        </th>
        <div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            endIcon={<ArrowDropDownIcon />}
          >
            Actions
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Option 1</MenuItem>
            <MenuItem onClick={handleClose}>Option 2</MenuItem>
            <MenuItem onClick={handleClose}>Option 3</MenuItem>
          </Menu>
        </div>
      </tr>
    </>
  );
};
