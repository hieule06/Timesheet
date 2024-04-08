import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox
} from "@mui/material";
import "./ModalTaskPrj.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";

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

export const ModalTaskPrj = () => {
  const [data, setData] = React.useState(rows);
  const [selectAll, setSelectAll] = React.useState(false);

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const updatedData = [...data];
    updatedData[index].checked = checked;
    setData(updatedData);
  };

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    const updatedData = data.map((row) => ({ ...row, checked }));
    setData(updatedData);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ marginBottom: "20px", marginTop: "1px !important" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableCell>Task</TableCell>
              <TableCell
                sx={{
                  padding: 0
                }}
              >
                Billable
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  sx={{
                    display: "block",
                    "&:hover": {
                      width: "fit-content"
                    },
                    padding: 0
                  }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.name}
                className={
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                }
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#f5f5f5" }
                }}
              >
                <TableCell sx={{ width: "50%" }} component="th" scope="row">
                  <ClearIcon
                    sx={{
                      marginRight: 2,
                      cursor: "pointer"
                    }}
                  />
                  {row.name}
                </TableCell>
                <TableCell sx={{ padding: 0 }}>
                  <Checkbox
                    checked={row.checked}
                    onChange={(event) =>
                      handleCheckboxChange(index, event.target.checked)
                    }
                    color="primary"
                    sx={{
                      padding: 0
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Accordion defaultExpanded className="mb-[30px]">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          className="text-[15px]"
        >
          Select task
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer
            component={Paper}
            sx={{ marginBottom: "20px", marginTop: "1px !important" }}
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
                      <AddCircleOutlineIcon
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
    </>
  );
};
