import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import "./ModalTeam.scss";
import { ButtonControl } from "../../Button/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const ModalTeam = () => {
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);
  const [isOnFocusSearchUser, setIsOnFocusSearchUser] =
    useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");

  const handleOnFocus = () => {
    setIsOnFocus(!isOnFocus);
  };

  const handleOnFocusSearchUser = () => {
    setIsOnFocusSearchUser(!isOnFocusSearchUser);
  };

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
  function createData(name: string, calories: number) {
    return { name, calories, checked: false };
  }

  const rows = [
    createData("Frozen yoghurt", 159),
    createData("Ice cream sandwich", 237),
    createData("Eclair", 262),
    createData("Cupcake", 305),
    createData("Gingerbread", 356)
  ];
  const [data] = useState(rows);

  return (
    <div className="flex">
      <Accordion
        defaultExpanded
        sx={{ padding: "0 24px", marginTop: "1px !important", flex: "1" }}
        className="wrapper-modal-team"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{ fontSize: "15px", fontWeight: 700 }}
        >
          Selected member
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex" }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={
                <span className="text-[15px] font-bold">
                  Show deactive member
                </span>
              }
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={
                <span className="text-[15px] font-bold">
                  Show Inactive user
                </span>
              }
            />
          </Box>
          <TextField
            className=""
            label={
              <span style={{ letterSpacing: "1px" }}>Search by task name</span>
            }
            variant="standard"
            InputProps={{
              startAdornment: (
                <SearchIcon position="start">
                  <Visibility></Visibility>
                </SearchIcon>
              )
            }}
            InputLabelProps={{
              shrink: isOnFocus || !!searchValue,
              style: { marginLeft: 30 }
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={handleOnFocus}
            onBlur={handleOnFocus}
          />
        </AccordionDetails>
        <AccordionActions>
          <ButtonControl
            handleClick={() => {}}
            title="Add users"
            dataItem={undefined}
          />
        </AccordionActions>
      </Accordion>
      <Accordion
        defaultExpanded
        sx={{
          padding: "0 24px",
          marginTop: "1px !important",
          marginBottom: "16px !important",
          flex: "1"
        }}
        className="wrapper-modal-team"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{ fontSize: "15px", fontWeight: 700 }}
        >
          Selected member
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ marginBottom: "10px" }}>
            <Select
              MenuProps={{ autoFocus: false }}
              id="search-select"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              onClose={() => setSearchText("")}
              renderValue={() => selectedOption}
              fullWidth
              className="mr-10 mb-3"
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
                <MenuItem
                  key={i}
                  value={option}
                  sx={{ fontSize: "14px !important" }}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
            <Select
              MenuProps={{ autoFocus: false }}
              id="search-select2"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              onClose={() => setSearchText("")}
              renderValue={() => selectedOption}
              fullWidth
              className="mr-10"
            >
              {displayedOptions.map((option, i) => (
                <MenuItem
                  key={i}
                  value={option}
                  sx={{ fontSize: "14px !important" }}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <TextField
            label={
              <span style={{ letterSpacing: "1px" }}>Search by task name</span>
            }
            variant="standard"
            InputProps={{
              startAdornment: (
                <SearchIcon position="start">
                  <Visibility></Visibility>
                </SearchIcon>
              )
            }}
            InputLabelProps={{
              shrink: isOnFocusSearchUser || !!searchValue,
              style: { marginLeft: 30 }
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={handleOnFocusSearchUser}
            onBlur={handleOnFocusSearchUser}
          />
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "20px",
              boxShadow: "none"
            }}
          >
            <Table aria-label="simple table">
              <TableBody>
                {data.map((row, index) => (
                  <TableRow
                    key={row.name}
                    className={
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-900"
                    }
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { backgroundColor: "#f5f5f5" }
                    }}
                  >
                    <TableCell sx={{ width: "50%" }} component="th" scope="row">
                      <ArrowBackIosIcon
                        sx={{
                          marginRight: 2,
                          cursor: "pointer"
                        }}
                      />
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ padding: 0 }}>Other Task</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
