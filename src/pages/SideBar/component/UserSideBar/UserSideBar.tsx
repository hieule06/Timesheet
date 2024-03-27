import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "@mui/material";
import React from "react";
import InputIcon from "@mui/icons-material/Input";
import "./UserSideBar.scss";

export default function UserSideBar() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="wrapper-user-sidebar flex items-center">
      <img
        className="h-[86px] w-full"
        src="https://training-timesheet.nccsoft.vn/user-img-background.7f354e93c30f9d51fc3a.jpg"
        alt=""
      />
      <div className="absolute flex items-center justify-between px-[15px] w-full">
        <div className=" flex items-center cursor-pointer">
          <img
            className="h-[60px] w-[60px] rounded-full mr-3"
            src="https://training-api-timesheet.nccsoft.vn/avatars/host/20231230145539_94b45da9-f885-47d2-afe3-626ea2104d27.jpg"
            alt=""
          />
          <div>
            <a href="" className="block text-sm text-white font-medium">
              <span className="block">thai bui</span>
              <span>thai.buiminh@gmail.com</span>
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 right-2 cursor-pointer">
          <span aria-describedby={id} onClick={handleClick}>
            <FontAwesomeIcon className="text-white" icon={faChevronDown} />
          </span>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
          >
            <button
              className="py-[7px] px-[18px] rounded-none text-[#666666] text-sm"
              onClick={handleLogOut}
            >
              <span className="inline-block mt-[2px] mr-[7px]">
                <InputIcon />
              </span>{" "}
              Logout
            </button>
          </Popover>
        </div>
      </div>
    </div>
  );
}
