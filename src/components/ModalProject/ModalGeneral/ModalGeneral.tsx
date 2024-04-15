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
import ModalTask from "../../ModalTask/ModalTask";
import { DataItemTaskProp } from "../../../type/DataItemTaskProp";

interface ModalGeneralProps {
  dataItemProjectProp: Partial<TypeDataModalProject> | undefined;
  dataListCustomer: TypeListCustomer[] | undefined;
  handleGetDataModalProject: (
    item: Partial<TypeDataModalProject> | undefined
  ) => void;
}

export const ModalGeneral: React.FC<ModalGeneralProps> = (props) => {
  const [isShowModalClient, setIsShowModalClient] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataModalTask, setDataModalTask] = useState<
    Partial<DataItemTaskProp> | undefined
  >(undefined);
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

  const handleShowModalClient = () => {
    setIsShowModalClient(!isShowModalClient);
  };

  const handleSubmit = async () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (e: unknown) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleGetDataModalTask = () => {};

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
          name="customerId"
          value={selectedOption || props.dataItemProjectProp?.customerId}
          defaultValue={props.dataItemProjectProp?.customerId}
          onChange={(e) => {
            props.handleGetDataModalProject({
              ...props.dataItemProjectProp,
              [e.target.name]: e.target.value
            });
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
          onClick={() => {
            handleShowModalClient();
          }}
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
          name="name"
          id="outlined-basic"
          variant="outlined"
          fullWidth
          value={props.dataItemProjectProp && props.dataItemProjectProp.name}
          onChange={(e) =>
            props.handleGetDataModalProject({
              ...props.dataItemProjectProp,
              [e.target.name]: e.target.value
            })
          }
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={2}>
        <span className="inline-block font-bold text-sm">Project Code*</span>
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="code"
          id="outlined-basic"
          variant="outlined"
          fullWidth
          value={props.dataItemProjectProp && props.dataItemProjectProp.code}
          onChange={(e) =>
            props.handleGetDataModalProject({
              ...props.dataItemProjectProp,
              [e.target.name]: e.target.value
            })
          }
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
              defaultValue={
                props.dataItemProjectProp && props.dataItemProjectProp.timeStart
                  ? dayjs(
                      props.dataItemProjectProp &&
                        props.dataItemProjectProp.timeStart
                    )
                  : undefined
              }
              onChange={(e) =>
                props.handleGetDataModalProject({
                  ...props.dataItemProjectProp,
                  timeStart: dayjs(e).format()
                })
              }
              sx={{ display: "inline-block" }}
            />
            <span className="inline-block ml-5 mr-5">to</span>
            <DatePicker
              defaultValue={dayjs(
                props.dataItemProjectProp && props.dataItemProjectProp.timeEnd
              )}
              onChange={(e) =>
                props.handleGetDataModalProject({
                  ...props.dataItemProjectProp,
                  timeEnd: dayjs(e).format()
                })
              }
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
              name="isAllUserBelongTo"
              defaultChecked={
                props.dataItemProjectProp &&
                props.dataItemProjectProp.isAllUserBelongTo
              }
              onChange={(e) =>
                props.handleGetDataModalProject({
                  ...props.dataItemProjectProp,
                  [e.target.name]: e.target.checked
                })
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
          name="note"
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
          onChange={(e) =>
            props.handleGetDataModalProject({
              ...props.dataItemProjectProp,
              [e.target.name]: e.target.value
            })
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
                    color: props.dataItemProjectProp?.projectType
                      ? projectType.projectType ===
                        props.dataItemProjectProp?.projectType
                        ? "white"
                        : "black"
                      : projectType.projectType === 1
                      ? "white"
                      : "black",
                    backgroundColor: props.dataItemProjectProp?.projectType
                      ? projectType.projectType ===
                        props.dataItemProjectProp?.projectType
                        ? "#F36C00"
                        : undefined
                      : projectType.projectType === 1
                      ? "#F36C00"
                      : undefined,
                    "&:hover": {
                      bgcolor: props.dataItemProjectProp?.projectType
                        ? projectType.projectType ===
                          props.dataItemProjectProp?.projectType
                          ? "#F36C00"
                          : undefined
                        : projectType.projectType === 1
                        ? "#F36C00"
                        : undefined
                    }
                  }}
                  onClick={() =>
                    props.handleGetDataModalProject({
                      ...props.dataItemProjectProp,
                      projectType: projectType.projectType
                    })
                  }
                >
                  {projectType.title}
                </Button>
              </Grid>
            );
          }
        )}
      </Grid>
      <ModalTask
        isOpen={isShowModalClient}
        handleIsOpen={handleShowModalClient}
        handleSubmit={handleSubmit}
        handleChange={(e) => handleChange(e)}
        dataItemTaskProp={dataModalTask}
        handleGetDataModalTask={(item) => handleGetDataModalTask(item)}
      />
    </Grid>
  );
};
