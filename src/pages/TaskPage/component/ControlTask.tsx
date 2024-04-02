import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import { useState } from "react";

interface ControlTaskProps {
  searchValue: string;
  isOnKeyDown: boolean;
  handleIsOpen: () => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setIsOnKeyDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ControlTask: React.FC<ControlTaskProps> = (props) => {
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);
  const handleOnFocus = () => {
    setIsOnFocus(!isOnFocus);
  };
  return (
    <div className="flex w-full">
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
      <div className="mb-5 px-[15px] w-4/6">
        <TextField
          className="w-[450px]"
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
