import React from "react";
import { DataItemProp } from "../../type/DataItemProp";

interface ButtonProps {
  handleCancel: () => void;
  handleSave: () => void;
  title: string;
  handleGetDataModal: (item: Partial<DataItemProp> | undefined) => void;
  dataItem: DataItemProp | undefined;
}

export const ButtonControl: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={`btn mx-[5px] px-4 text-sm font-normal ${
        props.title === "Save" || props.title === "Delete"
          ? "bg-[#f24b50] text-[#b3383b]"
          : props.title === "Cancel" || props.title === "Archive"
          ? "bg-[#fff] text-[#000000DE]"
          : "bg-[#1f91f3] text-white"
      } border-none rounded leading-9`}
      onClick={() => {
        if (!(props.title === "Archive") && !(props.title === "Delete")) {
          props.handleSave();
          props.handleCancel();

          // Nếu btn khác cancel or save thì sẽ cho lấy dataitem để fill vào modal
          if (
            !props.title.toLocaleLowerCase().includes("cancel") ||
            !props.title.toLocaleLowerCase().includes("save")
          ) {
            props.handleGetDataModal(props.dataItem);
          } else {
            props.handleGetDataModal(undefined);
          }
        } else {
          ///
        }
      }}
      disabled={props.title === "Save" && !props.dataItem?.name}
    >
      {props.title}
    </button>
  );
};
