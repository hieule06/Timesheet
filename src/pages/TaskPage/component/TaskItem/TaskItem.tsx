import React from "react";
import { ButtonControl } from "../../../../components/Button/Button";
import { DataItemTaskProp } from "../../../../type/DataItemTaskProp";
import { TITLE_BUTTON } from "../../../../constants/button/ButtonConstants";
import { Toast } from "../../../../components/toast/Toast";
import "./TaskItem.scss";
import {
  deleteArchive,
  deleteTask,
  handleDeArchive
} from "../../../../services/TaskServices/taskServices";
import { TYPE_TASK } from "../../../../constants/task/TypeTask";
import { ModalConfirm } from "../../../../components/ModalConfirm/ModalConfirm";

interface TaskItemProps {
  name: string;
  handleIsOpen: () => void;
  loadDataTask: () => void;
  handleGetDataModalTask: (
    taskItem: Partial<DataItemTaskProp> | undefined
  ) => void;
  dataItemTask: DataItemTaskProp | undefined;
}

export const TaskItem: React.FC<TaskItemProps> = (props) => {
  const titleBtnArchive =
    props.dataItemTask &&
    (props.dataItemTask.isDeleted
      ? "Unarchive"
      : !props.dataItemTask.isDeleted
      ? "Archive"
      : "");

  const handleArchiveOrUnArchive = (
    taskItem: Partial<DataItemTaskProp> | undefined
  ) => {
    ModalConfirm(`${titleBtnArchive} task`, props.dataItemTask?.name).then(
      async (result) => {
        if (result.isConfirmed) {
          if (titleBtnArchive === TITLE_BUTTON.ARCHIVE) {
            const resultDelete = await deleteArchive(taskItem?.id);
            if (resultDelete && resultDelete.success) {
              const toast = await Toast.fire({
                icon: "success",
                title: `Archive Task : ${taskItem?.name}`,
                background: "#51a351"
              });
              if (toast) props.loadDataTask();
            } else {
              await Toast.fire({
                icon: "error",
                title: `${resultDelete.response.data.error.message}`,
                background: "#bd362f"
              });
            }
          } else {
            const resultDeArchive = await handleDeArchive(taskItem?.id);
            if (resultDeArchive && resultDeArchive.success) {
              const toast = await Toast.fire({
                icon: "success",
                title: `Unarchive Task : ${taskItem?.name}`,
                background: "#51a351"
              });
              if (toast) props.loadDataTask();
            } else {
              await Toast.fire({
                icon: "error",
                title: `${resultDeArchive.response.data.error.message}`,
                background: "#bd362f"
              });
            }
          }
        }
      }
    );
  };

  const handleDeleteTask = (
    taskItem: Partial<DataItemTaskProp> | undefined
  ) => {
    ModalConfirm("Delete project", props.dataItemTask?.name).then(
      async (result) => {
        if (result.isConfirmed) {
          const resultDelete = await deleteTask(taskItem?.id);
          if (resultDelete && resultDelete.success) {
            const toast = await Toast.fire({
              icon: "success",
              title: "Delete Task Successfully",
              background: "#51a351"
            });
            if (toast) props.loadDataTask();
          } else {
            await Toast.fire({
              icon: "error",
              title: `${resultDelete.response.data.error.message}`,
              background: "#bd362f"
            });
          }
        }
      }
    );
  };

  return (
    <>
      <tr className="flex justify-between items-center odd:bg-gray-50 odd:dark:bg-gray-800 even:bg-white even:dark:bg-gray-900 border-b dark:border-gray-700 hover:bg-[#f5f5f5]">
        <th className="flex flex-wrap mx-[5px] px-[5px] py-[10px] font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <ButtonControl
            handleClick={(taskItem) => {
              props.handleIsOpen(), props.handleGetDataModalTask(taskItem);
            }}
            title={TITLE_BUTTON.EDIT}
            dataItem={props.dataItemTask}
          />
          <b className="text-sm text-[#555] font-normal">{props.name}</b>
        </th>
        <td className="px-[5px]">
          {props.dataItemTask?.type === TYPE_TASK.COMMON_TYPE && (
            <ButtonControl
              handleClick={(taskItem) => handleArchiveOrUnArchive(taskItem)}
              title={titleBtnArchive}
              dataItem={props.dataItemTask}
            />
          )}
          <ButtonControl
            handleClick={(taskItem) => {
              handleDeleteTask(taskItem);
            }}
            title={TITLE_BUTTON.DELETE}
            dataItem={props.dataItemTask}
          />
        </td>
      </tr>
    </>
  );
};
