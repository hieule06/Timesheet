import React, { useEffect, useState } from "react";
import "./ProjectList.scss";
import { getAllProjects } from "../../../../services/ProjectServices/projectServices";
import { ProjectItem } from "../ProjectItem/ProjectItem";
import { TypeDataModalProject } from "../../../../type/TypeDataModalProject";

interface ProjectListProps {
  handleIsOpenModal: () => void;
  handleIsCloseModal: () => void;
  setIsOnKeyDown: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModal: boolean;
  searchValue: string;
  statusProject: string;
  isOnKeyDown: boolean;
  handleGetDataModalProject: (
    item: Partial<TypeDataModalProject> | undefined
  ) => void;
  handleGetListCusTomer: (listCustomer: string[]) => void;
}

interface ProjectItem {
  customerName: string;
  name: string;
  code: string;
  status: number;
  pms: Array<string>;
  activeMember: number;
  projectType: number;
  timeStart: string;
  timeEnd: string;
  id: 0;
}

export const ProjectList: React.FC<ProjectListProps> = (props) => {
  const [listProjects, setListProjects] = useState([]);
  const [listCustomerNames, setListCustomerNames] = useState<Array<string>>([]);

  const loadData = async () => {
    try {
      let projectsData;
      if (props.statusProject === "3") {
        projectsData = await getAllProjects({
          search: props.searchValue,
          status: null
        });
      } else if (props.searchValue || props.statusProject) {
        projectsData = await getAllProjects({
          status: Number(props.statusProject),
          search: props.searchValue
        });
      } else {
        projectsData = await getAllProjects({ status: 0, search: "" });
      }
      if (projectsData && projectsData.result) {
        const customerNames: React.SetStateAction<string[]> = [];
        projectsData.result.map(
          (obj: { customerName: string }) =>
            !customerNames.includes(obj.customerName) &&
            customerNames.push(obj.customerName)
        );
        setListCustomerNames(customerNames);
        setListProjects(projectsData.result);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [props.statusProject, props.isOnKeyDown]);

  return (
    <>
      {listCustomerNames.map((itemCustomerName, idx) => (
        <div className="wrapper-task-list grid gap-4 pb-5" key={idx}>
          <table className="w-full text-sm text-left bg-[#D3D3D3] rounded-[5px]">
            <thead className="p-[10px] pl-5 text-lg font-bold text-[#555555]">
              <tr className="border-b dark:border-gray-700">
                <th scope="col" className="px-6 py-3">
                  {itemCustomerName}
                </th>
              </tr>
            </thead>
            <tbody>
              {listProjects.map(
                (dataItemProject: ProjectItem, index) =>
                  dataItemProject.customerName === itemCustomerName && (
                    <ProjectItem
                      dataItemProject={dataItemProject}
                      handleIsOpenModal={props.handleIsOpenModal}
                      handleIsCloseModal={props.handleIsCloseModal}
                      isOpenModal={props.isOpenModal}
                      key={index}
                      setIsOnKeyDown={props.setIsOnKeyDown}
                      isOnKeyDown={props.isOnKeyDown}
                      handleGetDataModalProject={(
                        item: Partial<TypeDataModalProject> | undefined
                      ) => props.handleGetDataModalProject(item)}
                      handleGetListCusTomer={(listCustomer) =>
                        props.handleGetListCusTomer(listCustomer)
                      }
                    />
                  )
              )}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
};
