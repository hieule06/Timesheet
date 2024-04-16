import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox } from "@mui/material";
import "./ModalTaskPrj.scss";
import ClearIcon from "@mui/icons-material/Clear";
import { DataItemTaskProp } from "../../../type/DataItemTaskProp";
import { TypeDataModalProject } from "../../../type/TypeDataModalProject";
import { SelectTaskInPrj } from "./SelectTaskInPrj/SelectTaskInPrj";

interface ModalTaskPrjProps {
  dataListTask: DataItemTaskProp[] | undefined;
  dataItemProjectProp: Partial<TypeDataModalProject> | undefined;
  handleGetDataModalProject: (
    item: Partial<TypeDataModalProject> | undefined
  ) => void;
}

export const ModalTaskPrj: React.FC<ModalTaskPrjProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arrTask: any[] | (() => any[]) = [];
  props.dataListTask &&
    props.dataListTask.map(
      (item) =>
        item.type === 0 && arrTask.push({ taskId: item.id, billable: true })
    );
  const [taskSelected, setTaskSelected] = React.useState<
    | {
        taskId: number;
        billable: boolean;
        id?: number | undefined;
      }[]
    | undefined
  >(
    props.dataItemProjectProp?.tasks
      ? props.dataItemProjectProp?.tasks
      : arrTask
  );
  const [selectAll, setSelectAll] = React.useState<boolean>(
    props.dataItemProjectProp?.tasks
      ? !!props.dataItemProjectProp?.tasks?.every(
          (item) => item && item.billable
        )
      : true
  );

  const handleCheckboxChange = (taskId: number, checked: boolean) => {
    const updatedTasks =
      taskSelected &&
      taskSelected.map((task) =>
        task && task.taskId === taskId
          ? {
              ...task,
              billable: checked
            }
          : {
              ...task
            }
      );
    const checkSelectAll =
      updatedTasks && updatedTasks.every((task) => task.billable);
    setSelectAll(!!checkSelectAll);
    setTaskSelected(updatedTasks);
    props.handleGetDataModalProject({
      ...props.dataItemProjectProp,
      tasks: updatedTasks
    });
  };

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    const updatedTasks =
      taskSelected &&
      taskSelected.map((task) => ({
        ...task,
        billable: checked
      }));

    setTaskSelected(updatedTasks);
    props.handleGetDataModalProject({
      ...props.dataItemProjectProp,
      tasks: updatedTasks
    });
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
            {taskSelected &&
              taskSelected.map(
                (row, index) =>
                  row &&
                  row.taskId && (
                    <TableRow
                      key={row && row.taskId}
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
                      <TableCell
                        sx={{ width: "50%" }}
                        component="th"
                        scope="row"
                      >
                        <span
                          onClick={() => {
                            const updatedTasks =
                              taskSelected &&
                              taskSelected.filter(
                                (task) => task && task.taskId !== row.taskId
                              );

                            setTaskSelected(updatedTasks);
                            props.handleGetDataModalProject({
                              ...props.dataItemProjectProp,
                              tasks: updatedTasks
                            });
                          }}
                        >
                          <ClearIcon
                            sx={{
                              marginRight: 2,
                              cursor: "pointer"
                            }}
                          />
                        </span>
                        {props.dataListTask &&
                          props.dataListTask.map(
                            (task) => row && row.taskId === task.id && task.name
                          )}
                      </TableCell>
                      <TableCell sx={{ padding: 0 }}>
                        <Checkbox
                          checked={row && row.billable}
                          defaultChecked={row && row.billable}
                          onChange={(event) =>
                            handleCheckboxChange(
                              row && row.taskId,
                              event.target.checked
                            )
                          }
                          color="primary"
                          sx={{
                            padding: 0
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  )
              )}
          </TableBody>
        </Table>
      </TableContainer>

      <SelectTaskInPrj
        dataListTask={props.dataListTask}
        dataItemProjectProp={props.dataItemProjectProp}
        handleGetDataModalProject={props.handleGetDataModalProject}
        taskSelected={taskSelected}
        handleSetTaskSelected={(data) => setTaskSelected(data)}
      />
    </>
  );
};
