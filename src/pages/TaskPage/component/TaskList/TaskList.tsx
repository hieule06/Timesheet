import React, { useEffect, useState } from "react";
import "./TaskList.scss";
import { ItemTask } from "../ItemTask/ItemTask";
import { getAllTasks } from "../../../../services/TaskServices/taskServices";
import { TypeTask } from "../TypeTask/TypeTask";
import { ArrayTypeTask } from "../../../../constants/ArrayTypeTask";
import { DataItemProp } from "../../../../type/DataItemProp";

interface TaskListProps {
  handleIsOpen: () => void;
  currentValue: string;
  isOnKeyDown: boolean;
  handleGetDataModal: (item: Partial<DataItemProp> | undefined) => void;
}

export const TaskList: React.FC<TaskListProps> = (props) => {
  const [listTaskCommon, setListTaskCommon] = useState<DataItemProp[]>([]);
  const [listTaskOther, setListTaskOther] = useState<DataItemProp[]>([]);

  // có thể dùng sau nếu nhiều type :
  // const uniqueTypes = tasksData.map((item: Task) => !arrTypeTask.includes(item.type) && arrTypeTask.push(item.type) )

  const loadData = async (valueFilter: string | undefined) => {
    try {
      const tasksData = await getAllTasks();
      if (tasksData && tasksData.result) {
        const listDataCommon: React.SetStateAction<DataItemProp[]> = [];
        const listDataOther: React.SetStateAction<DataItemProp[]> = [];
        if (valueFilter) {
          const lowerCaseSearch = valueFilter.toLowerCase();
          tasksData.result.map((item: DataItemProp) =>
            item.name.toLowerCase().includes(lowerCaseSearch) && item.type === 0
              ? listDataCommon.push(item)
              : item.name.toLowerCase().includes(lowerCaseSearch) &&
                item.type === 1
              ? listDataOther.push(item)
              : undefined
          );
          setListTaskCommon(listDataCommon);
          setListTaskOther(listDataOther);
        } else {
          tasksData.result.map((item: DataItemProp) =>
            item.type === 0
              ? listDataCommon.push(item)
              : listDataOther.push(item)
          );
          setListTaskCommon(listDataCommon);
          setListTaskOther(listDataOther);
        }
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (props.currentValue) {
      loadData(props.currentValue);
    } else {
      loadData(undefined);
    }
  }, [props.isOnKeyDown]);
  return (
    <>
      {ArrayTypeTask.map((item, index) => (
        <React.Fragment key={index}>
          <TypeTask
            title={item.titleTask}
            description={item.description}
            numberElement={
              item.type === 0 ? listTaskCommon.length : listTaskOther.length
            }
          />
          <div
            className={`wrapper-task-list grid gap-4 ${
              ((item.type === 0 && listTaskCommon.length === 0) ||
                (item.type === 1 && listTaskOther.length === 0)) &&
              "hidden"
            }`}
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
                {(item.type === 0 ? listTaskCommon : listTaskOther).map(
                  (itemTask) => (
                    <ItemTask
                      key={itemTask.id}
                      name={itemTask.name}
                      handleIsOpen={props.handleIsOpen}
                      handleGetDataModal={(item) =>
                        props.handleGetDataModal(item)
                      }
                      dataItem={itemTask}
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
