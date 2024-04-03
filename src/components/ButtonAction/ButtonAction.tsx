import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button } from "@mui/material";

interface ButtonActionProps {
  handleIsOpenModal: () => void;
  handleIsCloseModal: () => void;
  isOpenModal: boolean;
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
      >
        <MenuItem
          onClick={() => {
            handleClose(), props.handleIsOpenModal();
          }}
        >
          Option 1
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose(), props.handleIsOpenModal();
          }}
        >
          Option 2
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose(), props.handleIsOpenModal();
          }}
        >
          Option 3
        </MenuItem>
      </Menu>
    </th>
  );
};
