import dayjs from "dayjs";
import "./ProjectItem.scss";
import { ButtonAction } from "../../../../components/ButtonAction/ButtonAction";
import React from "react";
import { DataItemProjectProp } from "../../../../type/DataItemProjectProp";
import { TypeDataModalProject } from "../../../../type/TypeDataModalProject";

interface ProjectItemProps {
  dataItemProject: DataItemProjectProp;
  handleIsOpenModal: () => void;
  handleIsCloseModal: () => void;
  setIsOnKeyDown: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModal: boolean;
  isOnKeyDown: boolean;
  handleGetDataModalProject: (
    item: Partial<TypeDataModalProject> | undefined
  ) => void;
  handleGetListCusTomer: (listCustomer: string[]) => void;
}
export const ProjectItem: React.FC<ProjectItemProps> = (props) => {
  return (
    <React.Fragment>
      <tr className="flex justify-between items-center bg-white border-b">
        <th className="mx-[5px] px-[5px] py-[10px] font-medium text-gray-900 whitespace-nowrap ">
          <b className="text-sm text-[#555] font-normal">
            {props.dataItemProject.name}
          </b>
          <span className="text-xs text-white font-semibold bg-[#2e95ea] ml-[5px] py-[2px] px-[5px] rounded-[10px]">
            {props.dataItemProject.pms.map((item: string, index) =>
              index > 0 ? `,${item}` : item
            )}
          </span>
          <span className="text-xs text-white font-semibold bg-[#f44336] ml-[5px] py-[2px] px-[5px] rounded-[10px]">
            {props.dataItemProject.activeMember} members
          </span>
          <span className="text-xs text-white font-semibold bg-[#f89c26] ml-[5px] py-[2px] px-[5px] rounded-[10px]">
            T&M
          </span>
          {(props.dataItemProject.timeStart ||
            props.dataItemProject.timeEnd) && (
            <span className="text-xs text-white font-semibold bg-[#4caf50] ml-[5px] py-[2px] px-[5px] rounded-[10px]">
              {`${
                props.dataItemProject.timeStart
                  ? dayjs(props.dataItemProject.timeStart).format("DD/MM/YYYY")
                  : undefined
              }`}
              {props.dataItemProject.timeStart &&
                props.dataItemProject.timeEnd &&
                " - "}
              {props.dataItemProject.timeEnd
                ? dayjs(props.dataItemProject.timeEnd).format("DD/MM/YYYY")
                : undefined}
            </span>
          )}
        </th>
        <ButtonAction
          handleIsOpenModal={props.handleIsOpenModal}
          handleIsCloseModal={props.handleIsCloseModal}
          isOpenModal={props.isOpenModal}
          dataItemProject={props.dataItemProject}
          setIsOnKeyDown={props.setIsOnKeyDown}
          isOnKeyDown={props.isOnKeyDown}
          handleGetDataModalProject={(
            item: Partial<TypeDataModalProject> | undefined
          ) => props.handleGetDataModalProject(item)}
          handleGetListCusTomer={(listCustomer) =>
            props.handleGetListCusTomer(listCustomer)
          }
        />
      </tr>
    </React.Fragment>
  );
};
