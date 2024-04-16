import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  FormControl,
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
import { useCallback, useEffect, useMemo, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { TypeDataUser } from "../../../../type/TypeDataUser";
import { TypeDataModalProject } from "../../../../type/TypeDataModalProject";
import { TypeAllBranch } from "../../../../type/TypeAllBranch";
import { ListJobPosition } from "../../../../constants/jobPosition/ListJobPosition";
import { getAllBranch } from "../../../../services/ProjectServices/projectServices";

interface ModalTeamUserNotPrjProps {
  dataItemProjectProp: Partial<TypeDataModalProject> | undefined;
  handleGetDataModalProject: (
    item: Partial<TypeDataModalProject> | undefined
  ) => void;
  dataListUserNotPagging: TypeDataUser[] | undefined;
  isShowAddMember: boolean;
}

export const ModalTeamUserNotPrj: React.FC<ModalTeamUserNotPrjProps> = (
  props
) => {
  const [isOnFocusSearchUser, setIsOnFocusSearchUser] =
    useState<boolean>(false);
  const [searchValueAllUser, setSearchValueAllUser] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [allBranchFilter, setAllBranchFilter] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [listUserJoinedProject, setListUserJoinedProject] = useState<any>(
    props.dataItemProjectProp?.users
  );

  const showComponentAddMember = props.isShowAddMember ? "block" : "none";

  const tableRowStyles = (
    row: TypeDataUser,
    selectedOption: number,
    selectTypePosition: number
  ) => ({
    "&:hover": {
      backgroundColor: "#f5f5f5"
    },
    "&:last-child td, &:last-child th": {
      border: 0
    },
    display: row.branchId
      ? selectedOption === 0 && selectTypePosition === 3
        ? "block"
        : selectedOption === row.branchId && selectTypePosition === 3
        ? "block"
        : selectedOption === 0 && selectTypePosition === row.type
        ? "block"
        : selectedOption === row.branchId && selectTypePosition === row.type
        ? "block"
        : "none"
      : "none"
  });

  const handleOnFocusSearchUser = () => {
    setIsOnFocusSearchUser(!isOnFocusSearchUser);
  };

  const checkValueSearch = (text: string, searchText: string) =>
    searchText ? text.toLowerCase().includes(searchText.toLowerCase()) : true;

  const checkValueSearchAllUser = (text: string, searchText: string) =>
    searchText ? text.toLowerCase().includes(searchText.toLowerCase()) : true;

  // xử lý mảng danh sách người dùng
  const displayedOptions = useMemo(
    () =>
      allBranchFilter.filter((option: TypeAllBranch) =>
        checkValueSearch(option.name, searchText)
      ),
    [searchText, allBranchFilter]
  );

  const [selectTypePosition, setSelectTypePosition] = useState(3);

  // xử lý thêm người dùng vào dự án
  const handleChangeUserIntoPrj = (user: TypeDataUser) => {
    const dataUserAdd = {
      userId: user.id,
      type: 0,
      isTemp: false
    };
    const listUser =
      listUserJoinedProject && listUserJoinedProject.length > 0
        ? [...listUserJoinedProject, dataUserAdd]
        : [dataUserAdd];
    setListUserJoinedProject(listUser);
    props.handleGetDataModalProject({
      ...props.dataItemProjectProp,
      users: listUser.map((item, idx) =>
        idx === 0 ? { ...item, type: 1 } : item
      )
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
    <Accordion
      defaultExpanded
      sx={{
        padding: "0 24px",
        marginTop: "1px !important",
        marginBottom: "16px !important",
        flex: "1",
        overflowX: "hidden",
        display: showComponentAddMember
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
              {displayedOptions.map((option: TypeAllBranch, i) => (
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
              onChange={(e) => setSelectTypePosition(e.target.value as number)}
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
            shrink: isOnFocusSearchUser || !!searchValueAllUser,
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
                    (props.dataItemProjectProp?.users
                      ? props.dataItemProjectProp?.users?.every(
                          (item) => item.userId !== row.id
                        )
                      : true) &&
                    checkValueSearchAllUser(
                      `${row.name} ${row.emailAddress}`,
                      searchValueAllUser
                    ) &&
                    row.isActive && (
                      <TableRow
                        key={row.id}
                        sx={tableRowStyles(
                          row,
                          selectedOption,
                          selectTypePosition
                        )}
                        className={
                          index % 2 === 0
                            ? "bg-gray-50 dark:bg-gray-800"
                            : "bg-white dark:bg-gray-900"
                        }
                      >
                        <TableCell sx={{ width: "50%" }}>
                          <div className="flex">
                            <span onClick={() => handleChangeUserIntoPrj(row)}>
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
  );
};
