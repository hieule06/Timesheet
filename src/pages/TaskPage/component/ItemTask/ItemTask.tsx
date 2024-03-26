import React from "react";
import { ButtonControl } from "../../../../components/Button/Button";

interface ItemTaskProps {
  handleIsOpen: () => void;
}

export const ItemTask: React.FC<ItemTaskProps> = (props) => {
  return (
    <tbody>
      <tr className="flex justify-between items-center odd:bg-gray-50 odd:dark:bg-gray-800 even:bg-white even:dark:bg-gray-900 border-b dark:border-gray-700">
        <th className="mx-[5px] px-[5px] py-[10px] font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <ButtonControl
            handleCancel={props.handleIsOpen}
            handleSave={() => {}}
            title={"Edit"}
          />
          <b className="text-sm text-[#555] font-normal">Coding</b>
        </th>
        <td className="px-[5px]">
          <ButtonControl
            handleCancel={() => {}}
            handleSave={() => {}}
            title={"Archive"}
          />
          <ButtonControl
            handleCancel={() => {}}
            handleSave={() => {}}
            title={"Delete"}
          />
        </td>
      </tr>
    </tbody>
  );
};
