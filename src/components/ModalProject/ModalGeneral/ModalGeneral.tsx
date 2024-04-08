import { Select, MenuItem, ListSubheader, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid } from "@mui/material";
import {
  TextareaAutosize,
  FormControlLabel,
  Checkbox,
  Button
} from "@mui/material";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import "./ModalGeneral.scss";
import {
  ArrayTypeBtnModalGeneral,
  TypeBtnModalGeneral
} from "../../../constants/project/TypeBtnModalGeneral";
import { TypeListCustomer } from "../../../type/TypeListCustomer";
import { TypeDataModalProject } from "../../../type/TypeDataModalProject";

interface ModalGeneralProps {
  dataItemProjectProp: Partial<TypeDataModalProject> | undefined;
  dataListCustomer: TypeListCustomer[] | undefined;
}

export const ModalGeneral: React.FC<ModalGeneralProps> = (props) => {
  const containsText = (option: TypeListCustomer, searchText: string) =>
    `${option.name} - [${option.code}]`
      .toLowerCase()
      .indexOf(searchText.toLowerCase()) > -1;

  const [selectedOption, setSelectedOption] = useState<number | undefined>();

  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () =>
      props.dataListCustomer &&
      props.dataListCustomer.filter((option) =>
        containsText(option, searchText)
      ),
    [searchText]
  );

  const [dateTimeStart] = useState();

  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      padding="30px"
      className="wrapper-modal-general"
    >
      <Grid item xs={2}>
        <span className="inline-block font-bold text-sm">Client*</span>
      </Grid>
      <Grid item xs={6}>
        <Select
          MenuProps={{ autoFocus: false }}
          id="search-select"
          value={selectedOption || props.dataItemProjectProp?.customerId}
          defaultValue={props.dataItemProjectProp?.customerId}
          onChange={(e) => {
            setSelectedOption(e.target.value as number);
          }}
          onClose={() => setSearchText("")}
          fullWidth
          className="mr-10"
        >
          <ListSubheader>
            <TextField
              size="small"
              autoFocus
              placeholder="Search..."
              fullWidth
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation();
                }
              }}
              sx={{ maxHeight: "300px" }}
            />
          </ListSubheader>
          {displayedOptions &&
            displayedOptions.map((option: TypeListCustomer, i) => (
              <MenuItem key={i} value={option?.id}>
                {`${option?.name} - [${option?.code}]`}
              </MenuItem>
            ))}
        </Select>
      </Grid>
      <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
        <button
          type="button"
          className="flex items-center text-sm font-semibold bg-red-500 text-white px-4 py-2 ml-[10px] shadow-md rounded-md transform transition duration-300 hover:bg-red-600"
          onClick={() => {}}
        >
          <FontAwesomeIcon
            className="space-y-2 mr-1 text-lg line-height-36 padding-x-16"
            icon={faPlus}
          />
          New Task
        </button>
      </Grid>
      <Grid item xs={2}>
        <span className="inline-block font-bold text-sm">Project Name*</span>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          value={props.dataItemProjectProp && props.dataItemProjectProp.name}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={2}>
        <span className="inline-block font-bold text-sm">Project Code*</span>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          value={props.dataItemProjectProp && props.dataItemProjectProp.code}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={2}>
        <span className="inline-block font-bold text-sm">Date</span>
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              defaultValue={dayjs(
                props.dataItemProjectProp && props.dataItemProjectProp.timeStart
              )}
              sx={{ display: "inline-block" }}
            />
            <span className="inline-block ml-5 mr-5">to</span>
            <DatePicker
              value={dateTimeStart}
              defaultValue={dayjs(
                props.dataItemProjectProp && props.dataItemProjectProp.timeEnd
              )}
              // onChange={(newValue) => setDateTimeStart(newValue)}
              sx={{ display: "inline-block" }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={2}>
        <span className="inline-block font-bold text-sm">All User</span>
      </Grid>
      <Grid item xs={10}>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={
                props.dataItemProjectProp &&
                props.dataItemProjectProp.isAllUserBelongTo
              }
            />
          }
          label="Auto add user as a member of this project when creating new user"
        />
      </Grid>
      <Grid item xs={2}>
        <span className="inline-block font-bold text-sm">Note</span>
      </Grid>
      <Grid item xs={10}>
        <TextareaAutosize
          placeholder="Minimum 3 rows"
          minRows={2}
          style={{
            width: "100%",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#c1c1c1",
            borderRadius: "4px",
            padding: "6px 10px"
          }}
          value={
            (props.dataItemProjectProp && props.dataItemProjectProp.note) ||
            undefined
          }
        />
      </Grid>
      <Grid item xs={2}>
        <span className="inline-block font-bold text-sm">Project Type*</span>
      </Grid>
      <Grid item xs={10} sx={{ display: "flex", flexWrap: "wrap" }}>
        {ArrayTypeBtnModalGeneral.map(
          (projectType: TypeBtnModalGeneral, idx) => {
            return (
              <Grid item xs={2} sx={{ marginRight: "20px" }} key={idx}>
                <Button
                  type="button"
                  sx={{
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "#c1c1c1",
                    borderRadius: "5px",
                    padding: "10px",
                    textTransform: "none",
                    width: "100%",
                    marginRight: "20px",
                    marginBottom: "20px",
                    color:
                      projectType.projectType ===
                      props.dataItemProjectProp?.projectType
                        ? "white"
                        : "black",
                    backgroundColor:
                      projectType.projectType ===
                      props.dataItemProjectProp?.projectType
                        ? "#F36C00"
                        : undefined,
                    "&:hover": {
                      bgcolor:
                        projectType.projectType ===
                        props.dataItemProjectProp?.projectType
                          ? "#F36C00"
                          : undefined
                    }
                  }}
                  onClick={() =>
                    console.log("first: ", projectType.projectType)
                  }
                >
                  {projectType.title}
                </Button>
              </Grid>
            );
          }
        )}
      </Grid>
    </Grid>
  );
};
