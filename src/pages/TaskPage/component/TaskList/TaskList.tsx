import React, { useEffect, useState } from "react";
import "./TaskList.scss";
import { getAllTasks } from "../../../../services/TaskServices/taskServices";
import { TypeTaskHeader } from "../TypeTaskHeader/TypeTaskHeader";
import { ArrayTypeTask } from "../../../../constants/task/ArrayTypeTask";
import { DataItemTaskProp } from "../../../../type/DataItemTaskProp";
import { TaskItem } from "../TaskItem/TaskItem";
import { TYPE_TASK } from "../../../../constants/task/TypeTask";

interface TaskListProps {
  handleIsOpen: () => void;
  searchValue: string;
  isOnKeyDown: boolean;
  isCreateOrUpdate: boolean;
  handleGetDataModalTask: (item: Partial<DataItemTaskProp> | undefined) => void;
}

export const TaskList: React.FC<TaskListProps> = (props) => {
  const [listTaskCommon, setListTaskCommon] = useState<DataItemTaskProp[]>([]);
  const [listTaskOther, setListTaskOther] = useState<DataItemTaskProp[]>([]);
  const [checkSearchValue, setCheckSearchValue] = useState(""); // Giá trị search value chuyển về toLowerCase sau khi được enter

  // có thể dùng sau nếu nhiều type :
  // const uniqueTypes = tasksData.map((item: Task) => !arrTypeTask.includes(item.type) && arrTypeTask.push(item.type) )

  const checkHiddenListTask = (TypeTask: { type: number }) =>
    ((TypeTask.type === TYPE_TASK.COMMON_TYPE &&
      listTaskCommon.filter((taskCommon) =>
        taskCommon.name.toLowerCase().includes(checkSearchValue)
      ).length <= 0) ||
      (TypeTask.type === TYPE_TASK.OTHER_TYPE &&
        listTaskOther.filter((taskCommon) =>
          taskCommon.name.toLowerCase().includes(checkSearchValue)
        ).length <= 0)) &&
    "hidden";

  const filterCommonLength = listTaskCommon.filter((taskCommon) =>
    taskCommon.name.toLowerCase().includes(checkSearchValue)
  ).length;

  const filterOtherLength = listTaskOther.filter((taskOther) =>
    taskOther.name.toLowerCase().includes(checkSearchValue)
  ).length;

  const loadData = async () => {
    try {
      const tasksData = await getAllTasks();
      if (tasksData && tasksData.result) {
        const listDataCommon: React.SetStateAction<DataItemTaskProp[]> = [];
        const listDataOther: React.SetStateAction<DataItemTaskProp[]> = [];

        tasksData.result.map((item: DataItemTaskProp) =>
          item.type === TYPE_TASK.COMMON_TYPE
            ? listDataCommon.push(item)
            : listDataOther.push(item)
        );
        setListTaskCommon(listDataCommon);
        setListTaskOther(listDataOther);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [props.isCreateOrUpdate]);

  useEffect(() => {
    setCheckSearchValue(props.searchValue.toLowerCase());
  }, [props.isOnKeyDown]);

  return (
    <>
      {ArrayTypeTask.map((TypeTask, index) => (
        <React.Fragment key={index}>
          <TypeTaskHeader
            title={TypeTask.titleTask}
            description={TypeTask.description}
            numberElement={
              TypeTask.type === TYPE_TASK.COMMON_TYPE
                ? filterCommonLength
                : filterOtherLength
            }
          />
          <div
            className={`wrapper-task-list grid gap-4 ${checkHiddenListTask(
              TypeTask
            )}`}
          >
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="p-[10px] pl-5 text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr className="border-b dark:border-gray-700">
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {(TypeTask.type === TYPE_TASK.COMMON_TYPE
                  ? listTaskCommon
                  : listTaskOther
                ).map((Task) =>
                  checkSearchValue ? (
                    Task.name.toLowerCase().includes(checkSearchValue) && (
                      <TaskItem
                        key={Task.id}
                        name={Task.name}
                        handleIsOpen={props.handleIsOpen}
                        handleGetDataModalTask={(item) =>
                          props.handleGetDataModalTask(item)
                        }
                        dataItemTask={Task}
                        loadDataTask={loadData}
                      />
                    )
                  ) : (
                    <TaskItem
                      key={Task.id}
                      name={Task.name}
                      handleIsOpen={props.handleIsOpen}
                      handleGetDataModalTask={(item) =>
                        props.handleGetDataModalTask(item)
                      }
                      dataItemTask={Task}
                      loadDataTask={loadData}
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};
