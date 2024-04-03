import {
  Select,
  MenuItem,
  ListSubheader,
  TextField,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";

export const ModalTaskPrj = () => {
  const containsText = (text: string, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const allOptions = [
    "Option One",
    "Option Two",
    "Option Three",
    "Option Four"
  ];

  const [selectedOption, setSelectedOption] = useState(allOptions[0]);

  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () => allOptions.filter((option) => containsText(option, searchText)),
    [searchText]
  );

  const [valueDate, setValueDate] = useState<Dayjs | null>(dayjs("2022-04-17"));

  return (
    <Grid container spacing={3} alignItems="center" padding="30px">
      <Grid item xs={2}>
        <span className="inline-block font-bold text-sm">Client*</span>
      </Grid>
      <Grid item xs={6}>
        <Select
          MenuProps={{ autoFocus: false }}
          id="search-select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          onClose={() => setSearchText("")}
          renderValue={() => selectedOption}
          fullWidth
          className="mr-10"
        >
          <ListSubheader>
            <TextField
              size="small"
              autoFocus
              placeholder="Type to search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {displayedOptions.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
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
        <TextField id="outlined-basic" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={2}>
        <span className="inline-block font-bold text-sm">Project Name*</span>
      </Grid>
      <Grid item xs={6}>
        <TextField id="outlined-basic" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={2}>
        <span className="inline-block font-bold text-sm">Date</span>
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              defaultValue={dayjs("2022-04-17")}
              sx={{ display: "inline-block" }}
            />
            <span className="inline-block ml-5 mr-5">to</span>
            <DatePicker
              value={valueDate}
              onChange={(newValue) => setValueDate(newValue)}
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
          control={<Checkbox defaultChecked />}
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
        />
      </Grid>
      <Grid item xs={2}>
        <span className="inline-block font-bold text-sm">Project Type*</span>
      </Grid>
      <Grid item xs={10}>
        <Button
          style={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#c1c1c1",
            borderRadius: "5px",
            padding: "10px",
            textTransform: "none",
            marginRight: "20px"
          }}
        >
          Button
        </Button>
        <Button
          style={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#c1c1c1",
            borderRadius: "5px",
            padding: "10px",
            textTransform: "none",
            marginRight: "20px"
          }}
        >
          Button
        </Button>
        <Button
          style={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#c1c1c1",
            borderRadius: "5px",
            padding: "10px",
            textTransform: "none",
            marginRight: "20px"
          }}
        >
          Button
        </Button>
        <Button
          style={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#c1c1c1",
            borderRadius: "5px",
            padding: "10px",
            textTransform: "none",
            marginRight: "20px"
          }}
        >
          Button
        </Button>
      </Grid>
    </Grid>
  );
};
