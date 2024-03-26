import React from "react";
import "./TaskList.scss";
import { ItemTask } from "../ItemTask/ItemTask";

interface TaskListProps {
  handleIsOpen: () => void;
}

export const TaskList: React.FC<TaskListProps> = (props) => {
  return (
    <>
      <div className="p-[10px] border-b border-[rgba(204,204,204,.35)]">
        <h5 className="text-sm font-bold mb-[10px] text-gray-600">
          Common Task (16)
        </h5>
        <p className="text-sm text-[#555] mb-[10px]">
          These tasks are automatically added to all new projects
        </p>
      </div>
      <div className="wrapper-task-list grid gap-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="p-[10px] pl-5 text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr className="border-b dark:border-gray-700">
              <th scope="col" className="px-6 py-3">
                Name
              </th>
            </tr>
          </thead>
          <ItemTask handleIsOpen={props.handleIsOpen} />
        </table>
      </div>
    </>
  );
};
