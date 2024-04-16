import { SetStateAction, useState } from "react";
import "./ProjectPage.scss";
import { HeaderContainer } from "../../components/HeaderContainer/HeaderContainer";
import ModalProject from "../../components/ModalProject/ModalProject";
import { HeaderControlPage } from "../../components/HeaderControlPage/HeaderControlPage";
import { ProjectList } from "./component/ProjectList/ProjectList";
import { DataItemProjectProp } from "../../type/DataItemProjectProp";
import { TypeDataModalProject } from "../../type/TypeDataModalProject";
import { TypeListCustomer } from "../../type/TypeListCustomer";
import { DataItemTaskProp } from "../../type/DataItemTaskProp";
import { TypeDataUser } from "../../type/TypeDataUser";

const ProjectPage = () => {
  const [isOnKeyDown, setIsOnKeyDown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [statusProject, setStatusProject] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  const [dataModalProject, setDataModalProject] = useState<
    Partial<TypeDataModalProject> | undefined
  >(undefined);
  const [listCustomer, setListCustomer] = useState<TypeListCustomer[]>();
  const [listTask, setListTask] = useState<DataItemTaskProp[] | undefined>();
  const [listUserNotPagging, setListUserNotPagging] = useState<
    TypeDataUser[] | undefined
  >();

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleIsOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleIsCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleGetDataModalProject = (
    item: Partial<TypeDataModalProject> | undefined
  ) => {
    setDataModalProject(item);
  };

  const handleGetListCusTomer = (listCustomer: TypeListCustomer[]) => {
    setListCustomer(listCustomer);
  };

  const handleGetListTaskPrj = (listTask: DataItemTaskProp[] | undefined) => {
    setListTask(listTask);
  };

  const handleGetListUserNotPagging = (
    listUserNotPagging: TypeDataUser[] | undefined
  ) => {
    setListUserNotPagging(listUserNotPagging);
  };

  return (
    <div>
      <div className="wrapper-task-page p-[30px] table:ml-[300px] bg-[#e9e9e9] pt-[100px] ">
        <div className="task-page bg-white border-gray-200 border-dashed dark:border-gray-700">
          <HeaderContainer title={"Manage Projects"} />
          <div className="p-5">
            <HeaderControlPage
              searchValue={searchValue}
              statusProject={statusProject}
              isOnKeyDown={isOnKeyDown}
              handleIsOpen={handleIsOpen}
              setSearchValue={(prev: SetStateAction<string>) =>
                setSearchValue(prev)
              }
              setIsOnKeyDown={(
                prev: boolean | ((prevState: boolean) => boolean)
              ) => setIsOnKeyDown(prev)}
              setStatusProject={(prev: SetStateAction<string>) =>
                setStatusProject(prev)
              }
              isShowControlProject={true}
              handleIsOpenModal={handleIsOpenModal}
              handleIsCloseModal={handleIsCloseModal}
              isOpenModal={isOpenModal}
              handleGetDataModalProject={(
                item: Partial<TypeDataModalProject> | undefined
              ) => handleGetDataModalProject(item)}
              handleGetListCusTomer={(listCustomer) =>
                handleGetListCusTomer(listCustomer)
              }
              handleGetListTaskPrj={(listTask) =>
                handleGetListTaskPrj(listTask)
              }
              handleGetListUserNotPagging={(listUserNotPagging) =>
                handleGetListUserNotPagging(listUserNotPagging)
              }
            />
            <ProjectList
              handleIsOpenModal={handleIsOpenModal}
              handleIsCloseModal={handleIsCloseModal}
              isOpenModal={isOpenModal}
              searchValue={searchValue}
              statusProject={statusProject}
              isOnKeyDown={isOnKeyDown}
              setIsOnKeyDown={(
                prev: boolean | ((prevState: boolean) => boolean)
              ) => setIsOnKeyDown(prev)}
              handleGetDataModalProject={(
                item: Partial<DataItemProjectProp> | undefined
              ) => handleGetDataModalProject(item)}
              handleGetListCusTomer={(listCustomer) =>
                handleGetListCusTomer(listCustomer)
              }
              handleGetListTaskPrj={(listTask) =>
                handleGetListTaskPrj(listTask)
              }
              handleGetListUserNotPagging={(listUserNotPagging) =>
                handleGetListUserNotPagging(listUserNotPagging)
              }
            />
          </div>
        </div>
      </div>
      <ModalProject
        handleIsOpenModal={handleIsOpenModal}
        handleIsCloseModal={handleIsCloseModal}
        isOpenModal={isOpenModal}
        dataItemProjectProp={dataModalProject}
        dataListCustomer={listCustomer}
        dataListTask={listTask}
        dataListUserNotPagging={listUserNotPagging}
        handleGetDataModalProject={(
          item: Partial<DataItemProjectProp> | undefined
        ) => handleGetDataModalProject(item)}
        handleIsOnKeyDown={() => setIsOnKeyDown(!isOnKeyDown)}
        handleGetListCusTomer={(listCustomer) =>
          handleGetListCusTomer(listCustomer)
        }
      />
    </div>
  );
};

export default ProjectPage;
