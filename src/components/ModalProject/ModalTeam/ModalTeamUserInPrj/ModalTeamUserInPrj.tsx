import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { TypeDataUser } from "../../../../type/TypeDataUser";
import { useState } from "react";
import { TypeDataModalProject } from "../../../../type/TypeDataModalProject";
import { ButtonControl } from "../../../Button/Button";

interface ModalTeamUserInPrjProps {
  dataItemProjectProp: Partial<TypeDataModalProject> | undefined;
  handleGetDataModalProject: (
    item: Partial<TypeDataModalProject> | undefined
  ) => void;
  dataListUserNotPagging: TypeDataUser[] | undefined;
  handleShowAddMember: () => void;
  isShowAddMember: boolean;
}

export const ModalTeamUserInPrj: React.FC<ModalTeamUserInPrjProps> = (
  props
) => {
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [listUserJoinedProject, setListUserJoinedProject] = useState<any>(
    props.dataItemProjectProp?.users
  );

  const handleOnFocus = () => {
    setIsOnFocus(!isOnFocus);
  };

  const checkValueSearch = (text: string, searchText: string) =>
    searchText ? text.toLowerCase().includes(searchText.toLowerCase()) : true;

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

  return (
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
              <span className="text-[15px] font-bold">Show Inactive user</span>
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
          handleClick={props.handleShowAddMember}
          title={!props.isShowAddMember ? "Add users" : "Exit add"}
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
  );
};
