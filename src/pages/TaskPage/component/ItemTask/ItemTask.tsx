import React from "react";
import { ButtonControl } from "../../../../components/Button/Button";
import { DataItemProp } from "../../../../type/DataItemProp";

interface ItemTaskProps {
  name: string;
  handleIsOpen: () => void;
  handleGetDataModal: (item: Partial<DataItemProp> | undefined) => void;
  dataItem: DataItemProp | undefined;
}

export const ItemTask: React.FC<ItemTaskProps> = (props) => {
  return (
    <>
      <tr className="flex justify-between items-center odd:bg-gray-50 odd:dark:bg-gray-800 even:bg-white even:dark:bg-gray-900 border-b dark:border-gray-700 hover:bg-[#f5f5f5]">
        <th className="mx-[5px] px-[5px] py-[10px] font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <ButtonControl
            handleCancel={props.handleIsOpen}
            handleSave={() => {}}
            title={"Edit"}
            handleGetDataModal={(item) => props.handleGetDataModal(item)}
            dataItem={props.dataItem}
          />
          <b className="text-sm text-[#555] font-normal">{props.name}</b>
        </th>
        <td className="px-[5px]">
          <ButtonControl
            handleCancel={() => {}}
            handleSave={() => {}}
            title={"Archive"}
            handleGetDataModal={(item) => props.handleGetDataModal(item)}
            dataItem={undefined}
          />
          <ButtonControl
            handleCancel={() => {}}
            handleSave={() => {}}
            title={"Delete"}
            handleGetDataModal={(item) => props.handleGetDataModal(item)}
            dataItem={undefined}
          />
        </td>
      </tr>
    </>
  );
};
