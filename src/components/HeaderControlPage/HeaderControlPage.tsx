import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import { useState } from "react";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./HeaderControlPage.scss";
import { ArrayStatusProject } from "../../constants/project/StatusProject";

interface HeaderControlPageProps {
  searchValue: string;
  statusProject: string;
  isOnKeyDown: boolean;
  handleIsOpen: () => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setStatusProject: React.Dispatch<React.SetStateAction<string>>;
  setIsOnKeyDown: React.Dispatch<React.SetStateAction<boolean>>;
  isShowControlProject: boolean;
}

export const HeaderControlPage: React.FC<HeaderControlPageProps> = (props) => {
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);

  const handleOnFocus = () => {
    setIsOnFocus(!isOnFocus);
  };

  const handleChange = (event: SelectChangeEvent) => {
    props.setStatusProject(event.target.value);
  };
  return (
    <div
      className={`flex w-full mb-5 ${
        props.isShowControlProject ? "justify-between gap-4 items-center" : ""
      }`}
    >
      {props.isShowControlProject ? (
        <>
          <div className="w-1/4">
            <button
              type="button"
              className="flex items-center justify-center h-[50px] min-w-[170px] text-sm font-semibold bg-red-500 text-white px-4 py-2 ml-[10px] shadow-md rounded-md transform transition duration-300 hover:bg-red-600"
              onClick={props.handleIsOpen}
            >
              <FontAwesomeIcon
                className="space-y-2 mr-1 text-lg line-height-36 padding-x-16"
                icon={faPlus}
              />
              New Project
            </button>
          </div>
          <FormControl sx={{ m: 1, width: "25%", height: "50px" }}>
            <Select
              id="demo-simple-select-autowidth"
              defaultValue={props.statusProject}
              value={props.statusProject}
              onChange={handleChange}
              autoWidth
              sx={{ height: "100%", fontSize: "14px" }}
            >
              {ArrayStatusProject.map((statusProject, index) => (
                <MenuItem
                  value={statusProject.status}
                  key={index}
                  sx={{ fontSize: "14px" }}
                >
                  {statusProject.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      ) : (
        <div className="w-2/6">
          <button
            type="button"
            className="flex items-center text-sm font-semibold bg-red-500 text-white px-4 py-2 ml-[10px] shadow-md rounded-md transform transition duration-300 hover:bg-red-600"
            onClick={props.handleIsOpen}
          >
            <FontAwesomeIcon
              className="space-y-2 mr-1 text-lg line-height-36 padding-x-16"
              icon={faPlus}
            />
            New Task
          </button>
        </div>
      )}
      <div
        className={`${
          !props.isShowControlProject ? "w-4/6 px-[15px] " : "w-1/2 h-[50px]"
        }`}
      >
        <TextField
          className="w-[450px] h-[100%]"
          label={
            <span style={{ letterSpacing: "1px" }}>Search by task name</span>
          }
          variant="outlined"
          InputProps={{
            startAdornment: (
              <SearchIcon position="start">
                <Visibility></Visibility>
              </SearchIcon>
            )
          }}
          InputLabelProps={{
            shrink: isOnFocus || !!props.searchValue,
            style: { marginLeft: 30 }
          }}
          value={props.searchValue}
          onChange={(e) => props.setSearchValue(e.target.value)}
          onFocus={handleOnFocus}
          onBlur={handleOnFocus}
          onKeyDown={(e) => {
            if (e.keyCode == 13) {
              props.setIsOnKeyDown(!props.isOnKeyDown);
            }
          }}
        />
      </div>
    </div>
  );
};
