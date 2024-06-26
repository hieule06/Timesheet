import { SetStateAction, useEffect, useState } from "react";
import "./TaskPage.scss";
import { TaskList } from "./component/TaskList/TaskList";
import ModalTask from "../../components/ModalTask/ModalCreateNew";
import { HeaderContainer } from "../../components/HeaderContainer/HeaderContainer";
import { HeaderControlPage } from "../../components/HeaderControlPage/HeaderControlPage";
import { DataItemTaskProp } from "../../type/DataItemTaskProp";
import { createOrUpdateTask } from "../../services/TaskServices/taskServices";
import React from "react";
import { TYPE_TASK } from "../../constants/task/TypeTask";
import { Toast } from "../../components/toast/Toast";

const TaskPage = () => {
  const [isOnKeyDown, setIsOnKeyDown] = useState(false);
  const [isCreateOrUpdate, setIsCreateOrUpdate] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [dataModalTask, setDataModalTask] = useState<
    Partial<DataItemTaskProp> | undefined
  >(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleGetDataModalTask = (
    item: Partial<DataItemTaskProp> | undefined
  ) => {
    setDataModalTask(item);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataModalTask({
      ...dataModalTask,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!dataModalTask?.type) {
      setDataModalTask({
        ...dataModalTask,
        ["type"]: TYPE_TASK.COMMON_TYPE
      });
    }
    // Đóng dialog
    handleIsOpen();
    if (dataModalTask?.id) {
      const result = await createOrUpdateTask(dataModalTask);
      if (result && result.success) {
        await Toast.fire({
          icon: "success",
          title: `Created Task : ${dataModalTask.name}`,
          background: "#51a351"
        });
      } else {
        await Toast.fire({
          icon: "error",
          title: `${result.response.data.error.message}`,
          background: "#51a351"
        });
      }
      setIsCreateOrUpdate(!isCreateOrUpdate);
    } else {
      const result = await createOrUpdateTask({
        ...dataModalTask,
        isDeleted: true,
        id: 0
      });
      if (result && result.success) {
        await Toast.fire({
          icon: "success",
          title: `Created Task : ${dataModalTask?.name}`,
          background: "#51a351"
        });
      } else {
        await Toast.fire({
          icon: "error",
          title: `${result.response.data.error.message}`,
          background: "#51a351"
        });
      }
      setIsCreateOrUpdate(!isCreateOrUpdate);
    }
  };

  useEffect(() => {});

  return (
    <div>
      <div className="wrapper-task-page p-[30px] table:ml-[300px] bg-[#e9e9e9] pt-[100px] ">
        <div className="task-page bg-white border-gray-200 border-dashed dark:border-gray-700">
          <HeaderContainer title={"Manage Tasks"} />
          <div className="p-5">
            <HeaderControlPage
              searchValue={searchValue}
              isOnKeyDown={isOnKeyDown}
              handleIsOpen={handleIsOpen}
              setSearchValue={(prev: SetStateAction<string>) =>
                setSearchValue(prev)
              }
              setIsOnKeyDown={(
                prev: boolean | ((prevState: boolean) => boolean)
              ) => setIsOnKeyDown(prev)}
              isShowControlProject={false}
            />
            <TaskList
              handleIsOpen={handleIsOpen}
              searchValue={searchValue}
              isOnKeyDown={isOnKeyDown}
              isCreateOrUpdate={isCreateOrUpdate}
              handleGetDataModalTask={(item) => handleGetDataModalTask(item)}
            />
          </div>
          <ModalTask
            isOpen={isOpen}
            handleIsOpen={handleIsOpen}
            handleSubmit={handleSubmit}
            handleChange={(e) => handleChange(e)}
            dataItemTaskProp={dataModalTask}
            handleGetDataModalTask={(item) => handleGetDataModalTask(item)}
            disable={dataModalTask?.name ? false : true}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
