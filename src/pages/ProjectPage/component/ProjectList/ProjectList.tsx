import React, { useEffect, useState } from "react";
import "./ProjectList.scss";
import { getAllProjects } from "../../../../services/ProjectServices/projectServices";
import { ProjectItem } from "../ProjectItem/ProjectItem";

interface ProjectListProps {
  handleIsOpenModal: () => void;
  handleIsCloseModal: () => void;
  isOpenModal: boolean;
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
      const projectsData = await getAllProjects({ status: 0, search: "" });
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
  }, []);

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
                (item: ProjectItem, index) =>
                  item.customerName === itemCustomerName && (
                    <ProjectItem
                      name={item.name}
                      pms={item.pms}
                      activeMember={item.activeMember}
                      timeStart={item.timeStart}
                      timeEnd={item.timeEnd}
                      dataItemTask={undefined}
                      handleIsOpenModal={props.handleIsOpenModal}
                      handleIsCloseModal={props.handleIsCloseModal}
                      isOpenModal={props.isOpenModal}
                      key={index}
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
