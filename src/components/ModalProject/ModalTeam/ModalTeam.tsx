import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./ModalTeam.scss";
import { ButtonControl } from "../../Button/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { TypeDataModalProject } from "../../../type/TypeDataModalProject";
import { TypeDataUser } from "../../../type/TypeDataUser";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getAllBranch } from "../../../services/ProjectServices/projectServices";
import { ListJobPosition } from "../../../constants/jobPosition/ListJobPosition";

interface ModalTeamProps {
  dataItemProjectProp: Partial<TypeDataModalProject> | undefined;
  handleGetDataModalProject: (
    item: Partial<TypeDataModalProject> | undefined
  ) => void;
  dataListUserNotPagging: TypeDataUser[] | undefined;
}

export const ModalTeam: React.FC<ModalTeamProps> = (props) => {
  const [isShowAddMember, setIsShowAddMember] = useState<boolean>(false);
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);
  const [isOnFocusSearchUser, setIsOnFocusSearchUser] =
    useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchValueAllUser, setSearchValueAllUser] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [listUserJoinedProject, setListUserJoinedProject] = useState<any>(
    props.dataItemProjectProp?.users
  );
  const [allBranchFilter, setAllBranchFilter] = useState([]);
  // const [searchUserProjected, setSearchUserProjected] = useState("");
  // const [searchUserNotProjected, setSearchUserNotProjected] = useState("");

  const handleOnFocus = () => {
    setIsOnFocus(!isOnFocus);
  };

  const handleOnFocusSearchUser = () => {
    setIsOnFocusSearchUser(!isOnFocusSearchUser);
  };

  const checkValueSearch = (text: string, searchText: string) =>
    searchText
      ? text.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      : true;

  const checkValueSearchAllUser = (text: string, searchText: string) =>
    searchText
      ? text.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      : true;

  /* const filterUserProjected = useMemo(() => {
    if (!props.dataItemProjectProp?.users) return [];
    return props.dataItemProjectProp?.users.filter((row) =>
      props.dataListUserNotPagging?.filter((item) => {
        (row.userId === item.id &&
          checkValueSearch(item.name, searchUserProjected)) ||
          checkValueSearch(item.emailAddress, searchUserProjected);
      })
    );
  }, [props.dataListUserNotPagging, searchUserProjected]);
  console.log("first: ", filterUserProjected);
  const filterUserNotProjected = useMemo(() => {}, [searchUserNotProjected]); */

  const [selectedOption, setSelectedOption] = useState(0);

  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () =>
      allBranchFilter.filter((option) =>
        checkValueSearch(option.name, searchText)
      ),
    [searchText, allBranchFilter]
  );

  const [selectTypePosition, setSelectTypePosition] = useState(3);

  const handleDeleteUser = (user: TypeDataUser) => {
    const listUser = listUserJoinedProject?.filter(
      (itemUser: { userId: number }) => itemUser.userId !== user.id
    );
    setListUserJoinedProject(listUser);
    props.handleGetDataModalProject({
      ...props.dataItemProjectProp,
      users: listUser
    });
  };

  const handleChangeUserIntoPrj = (user: TypeDataUser) => {
    const dataUserAdd = {
      userId: user.id,
      type: 0,
      isTemp: false
    };
    const listUser = [...listUserJoinedProject, dataUserAdd];
    setListUserJoinedProject(listUser);
    props.handleGetDataModalProject({
      ...props.dataItemProjectProp,
      users: listUser
    });
  };

  const loadBranch = useCallback(async () => {
    const listAllBranch = await getAllBranch();
    if (listAllBranch && listAllBranch.result) {
      setAllBranchFilter(listAllBranch.result);
    }
  }, []);

  useEffect(() => {
    loadBranch();
  }, [loadBranch]);

  return (
    <div className="flex">
      <Accordion
        defaultExpanded
        sx={{
          padding: "0 24px",
          marginTop: "1px !important",
          flex: "1",
          overflowX: "hidden"
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
          <Box sx={{ display: "flex" }}>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <span className="text-[15px] font-bold">
                  Show deactive member
                </span>
              }
            />
            <FormControlLabel
              control={<Checkbox />}
              label={
                <span className="text-[15px] font-bold">
                  Show Inactive user
                </span>
              }
            />
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
              shrink: !!searchValue,
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
            handleClick={() => {
              setIsShowAddMember(!isShowAddMember);
            }}
            title={!isShowAddMember ? "Add users" : "Exit add"}
            dataItem={undefined}
          />
        </AccordionActions>
        <AccordionActions>
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "20px",
              boxShadow: "none",
              maxHeight: "45vh"
            }}
          >
            <Table aria-label="simple table">
              <TableBody>
                {props.dataItemProjectProp?.users?.map((row, index) =>
                  props.dataListUserNotPagging?.map(
                    (item) =>
                      row.userId === item.id &&
                      checkValueSearch(
                        `${item.name} ${item.emailAddress}`,
                        searchValue
                      ) && (
                        <TableRow
                          key={row.id}
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
                          <TableCell sx={{ width: "50%" }}>
                            <div className="flex">
                              <span onClick={() => handleDeleteUser(item)}>
                                <ClearIcon
                                  sx={{
                                    marginRight: 2,
                                    cursor: "pointer"
                                  }}
                                />
                              </span>
                              <div className="flex flex-col">
                                <p className="text-sx font-bold">{item.name}</p>
                                <p className="text-sx">{item.emailAddress}</p>
                              </div>
                              <div className="w-[100%]">
                                <span onClick={() => handleDeleteUser(item)}>
                                  <ArrowForwardIosIcon
                                    sx={{
                                      cursor: "pointer",
                                      float: "right"
                                    }}
                                  />
                                </span>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionActions>
      </Accordion>
      <Accordion
        defaultExpanded
        sx={{
          padding: "0 24px",
          marginTop: "1px !important",
          marginBottom: "16px !important",
          flex: "1",
          overflowX: "hidden",
          display: `${isShowAddMember ? "block" : "none"}`
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
            <FormControl variant="standard" sx={{ m: 1 }} fullWidth>
              <Select
                MenuProps={{ autoFocus: false }}
                id="search-select"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value as number)}
                onClose={() => setSearchText("")}
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
                    value={option?.id}
                    sx={{ fontSize: "14px !important" }}
                  >
                    {option?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1 }} fullWidth>
              <Select
                id="search-select2"
                value={selectTypePosition}
                onChange={(e) =>
                  setSelectTypePosition(e.target.value as number)
                }
                fullWidth
              >
                {ListJobPosition.map((option, i) => (
                  <MenuItem
                    key={i}
                    value={option.type}
                    sx={{ fontSize: "14px !important" }}
                  >
                    {option.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            value={searchValueAllUser}
            onChange={(e) => setSearchValueAllUser(e.target.value)}
            onFocus={handleOnFocusSearchUser}
            onBlur={handleOnFocusSearchUser}
          />
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "20px",
              boxShadow: "none",
              maxHeight: "45vh"
            }}
          >
            <Table aria-label="simple table">
              <TableBody>
                {props.dataListUserNotPagging &&
                  props.dataListUserNotPagging.map(
                    (row, index) =>
                      props.dataItemProjectProp?.users?.every(
                        (item) => item.userId !== row.id
                      ) &&
                      checkValueSearchAllUser(
                        `${row.name} ${row.emailAddress}`,
                        searchValueAllUser
                      ) &&
                      row.isActive && (
                        <TableRow
                          key={row.id}
                          className={
                            index % 2 === 0
                              ? "bg-gray-50 dark:bg-gray-800"
                              : "bg-white dark:bg-gray-900"
                          }
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            "&:hover": { backgroundColor: "#f5f5f5" },
                            display: row.branchId
                              ? selectedOption === 0 && selectTypePosition === 3
                                ? "block"
                                : selectedOption === row.branchId &&
                                  selectTypePosition === 3
                                ? "block"
                                : selectedOption === 0 &&
                                  selectTypePosition === row.type
                                ? "block"
                                : selectedOption === row.branchId &&
                                  selectTypePosition === row.type
                                ? "block"
                                : "none"
                              : "none"
                          }}
                        >
                          <TableCell sx={{ width: "50%" }}>
                            <div className="flex">
                              <span
                                onClick={() => handleChangeUserIntoPrj(row)}
                              >
                                <ArrowBackIosIcon
                                  sx={{
                                    marginRight: 2,
                                    cursor: "pointer"
                                  }}
                                />
                              </span>
                              <div className="flex flex-col">
                                <p className="text-sx font-bold">
                                  {row.name}
                                  <span></span>
                                </p>
                                <p className="text-sx">{row.emailAddress}</p>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
