import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { TypeDataModalProject } from "../../../../type/TypeDataModalProject";
import { DataItemTaskProp } from "../../../../type/DataItemTaskProp";
import { ArrayTypeTask } from "../../../../constants/task/ArrayTypeTask";

interface SelectTaskInPrjProps {
  dataListTask: DataItemTaskProp[] | undefined;
  dataItemProjectProp: Partial<TypeDataModalProject> | undefined;
  handleGetDataModalProject: (
    item: Partial<TypeDataModalProject> | undefined
  ) => void;
  taskSelected:
    | {
        taskId: number;
        billable: boolean;
        id?: number | undefined;
      }[]
    | undefined;
  handleSetTaskSelected: (
    data: React.SetStateAction<
      | {
          taskId: number;
          billable: boolean;
          id?: number | undefined;
        }[]
      | undefined
    >
  ) => void;
}

export const SelectTaskInPrj: React.FC<SelectTaskInPrjProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arrTask: any[] | (() => any[]) = [];
  props.dataListTask &&
    props.dataListTask.map(
      (item) =>
        item.type === 0 && arrTask.push({ taskId: item.id, billable: true })
    );

  const handleSelectTaskInPrj = (row: DataItemTaskProp) => {
    const taskSelectedNew = {
      taskId: row.id,
      billable: true
    };
    props.taskSelected &&
      props.handleSetTaskSelected([...props.taskSelected, taskSelectedNew]);

    props.taskSelected &&
      props.handleGetDataModalProject({
        ...props.dataItemProjectProp,
        tasks: [...props.taskSelected, taskSelectedNew]
      });
  };

  return (
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
              {props.dataListTask &&
                props.dataListTask.map(
                  (row, index) =>
                    !row.isDeleted &&
                    !props.taskSelected?.some(
                      (item) => item && row.id === item.taskId
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
                        <TableCell
                          sx={{ width: "50%" }}
                          component="th"
                          scope="row"
                          onClick={() => handleSelectTaskInPrj(row)}
                        >
                          <AddCircleOutlineIcon
                            sx={{
                              marginRight: 2,
                              cursor: "pointer"
                            }}
                          />
                          {row.name}
                        </TableCell>
                        <TableCell sx={{ padding: 0 }}>
                          {row.type === ArrayTypeTask[0].type
                            ? ArrayTypeTask[0].titleTask
                            : ArrayTypeTask[1].titleTask}
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
