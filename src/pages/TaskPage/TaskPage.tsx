import { SetStateAction, useEffect, useState } from "react";
import "./TaskPage.scss";
import { TaskList } from "./component/TaskList/TaskList";
import Modal from "../../components/Modal/Modal";
import { HeaderContainer } from "../../components/HeaderContainer/HeaderContainer";
import { ControlTask } from "./component/ControlTask";
import { DataItemProp } from "../../type/DataItemProp";
import { createOrUpdateTask } from "../../services/TaskServices/taskServices";
import React from "react";

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
    // Xử lý dữ liệu biểu mẫu ở đây, ví dụ: gửi dữ liệu đến server
    if (!dataModal?.type) {
      setDataModal({
        ...dataModal,
        ["type"]: 0
      });
    }
    if (dataModal?.id) {
      await createOrUpdateTask(dataModal);
      setIsCreateOrUpdate(!isCreateOrUpdate);
    } else {
      await createOrUpdateTask({ ...dataModal, isDeleted: true, id: 0 });
      setIsCreateOrUpdate(!isCreateOrUpdate);
    }
    // Đóng dialog
    handleIsOpen();
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
