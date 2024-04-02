import { SetStateAction, useEffect, useState } from "react";
import "./TaskPage.scss";
import { TaskList } from "./component/TaskList/TaskList";
import Modal from "../../components/Modal/Modal";
import { HeaderContainer } from "../../components/HeaderContainer/HeaderContainer";
import { ControlTask } from "./component/ControlTask";
import { DataItemProp } from "../../type/DataItemProp";
import { createOrUpdateTask } from "../../services/TaskServices/taskServices";
import React from "react";
import { TYPE_TASK } from "../../constants/task/TypeTask";
import { Toast } from "../../constants/toast/Toast";

const TaskPage = () => {
  const [isOnKeyDown, setIsOnKeyDown] = useState(false);
  const [isCreateOrUpdate, setIsCreateOrUpdate] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [dataModal, setDataModal] = useState<Partial<DataItemProp> | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleGetDataModal = (item: Partial<DataItemProp> | undefined) => {
    setDataModal(item);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataModal({
      ...dataModal,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!dataModal?.type) {
      setDataModal({
        ...dataModal,
        ["type"]: TYPE_TASK.COMMON_TYPE
      });
    }
    // Đóng dialog
    handleIsOpen();
    if (dataModal?.id) {
      const result = await createOrUpdateTask(dataModal);
      if (result && result.success) {
        await Toast.fire({
          icon: "success",
          title: `Created Task : ${dataModal.name}`,
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
        ...dataModal,
        isDeleted: true,
        id: 0
      });
      if (result && result.success) {
        await Toast.fire({
          icon: "success",
          title: `Created Task : ${dataModal?.name}`,
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
            <ControlTask
              searchValue={searchValue}
              isOnKeyDown={isOnKeyDown}
              handleIsOpen={handleIsOpen}
              setSearchValue={(prev: SetStateAction<string>) =>
                setSearchValue(prev)
              }
              setIsOnKeyDown={(
                prev: boolean | ((prevState: boolean) => boolean)
              ) => setIsOnKeyDown(prev)}
            />
            <TaskList
              handleIsOpen={handleIsOpen}
              searchValue={searchValue}
              isOnKeyDown={isOnKeyDown}
              isCreateOrUpdate={isCreateOrUpdate}
              handleGetDataModal={(item) => handleGetDataModal(item)}
            />
          </div>
          <Modal
            isOpen={isOpen}
            handleIsOpen={handleIsOpen}
            handleSubmit={handleSubmit}
            handleChange={(e) => handleChange(e)}
            dataItemProp={dataModal}
            handleGetDataModal={(item) => handleGetDataModal(item)}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
