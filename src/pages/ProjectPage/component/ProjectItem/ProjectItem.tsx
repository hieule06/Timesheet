import dayjs from "dayjs";
import { DataItemProp } from "../../../../type/DataItemProp";
import "./ProjectItem.scss";
import { ButtonAction } from "../../../../components/ButtonAction/ButtonAction";
import React from "react";

interface ProjectItemProps {
  dataItemTask: Partial<DataItemProp> | undefined;
  name: string;
  activeMember: number;
  pms: Array<string>;
  timeStart: string;
  timeEnd: string;
  handleIsOpenModal: () => void;
  handleIsCloseModal: () => void;
  isOpenModal: boolean;
}
export const ProjectItem: React.FC<ProjectItemProps> = (props) => {
  return (
    <React.Fragment>
      <tr className="flex justify-between items-center bg-white border-b">
        <th className="mx-[5px] px-[5px] py-[10px] font-medium text-gray-900 whitespace-nowrap ">
          <b className="text-sm text-[#555] font-normal">{props.name}</b>
          <span className="text-xs text-white font-semibold bg-[#2e95ea] ml-[5px] py-[2px] px-[5px] rounded-[10px]">
            {props.pms.map((item: string, index) =>
              index > 0 ? `,${item}` : item
            )}
          </span>
          <span className="text-xs text-white font-semibold bg-[#f44336] ml-[5px] py-[2px] px-[5px] rounded-[10px]">
            {props.activeMember} members
          </span>
          <span className="text-xs text-white font-semibold bg-[#f89c26] ml-[5px] py-[2px] px-[5px] rounded-[10px]">
            T&M
          </span>
          {(props.timeStart || props.timeEnd) && (
            <span className="text-xs text-white font-semibold bg-[#4caf50] ml-[5px] py-[2px] px-[5px] rounded-[10px]">
              {`${
                props.timeStart
                  ? dayjs(props.timeStart).format("DD/MM/YYYY")
                  : undefined
              }`}
              {props.timeStart && props.timeEnd && " - "}
              {props.timeEnd
                ? dayjs(props.timeEnd).format("DD/MM/YYYY")
                : undefined}
            </span>
          )}
        </th>
        <ButtonAction
          handleIsOpenModal={props.handleIsOpenModal}
          handleIsCloseModal={props.handleIsCloseModal}
          isOpenModal={props.isOpenModal}
        />
      </tr>
    </React.Fragment>
  );
};
