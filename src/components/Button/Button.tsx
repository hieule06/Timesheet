import React from "react";
import { DataItemTaskProp } from "../../type/DataItemTaskProp";
import { TITLE_BUTTON } from "../../constants/button/ButtonConstants";
import { TYPE_TASK } from "../../constants/task/TypeTask";

interface ButtonProps {
  handleClick: (item: Partial<DataItemTaskProp> | undefined) => void;
  title: string | undefined;
  dataItem?: Partial<DataItemTaskProp> | undefined;
  disabled?: boolean;
  isClient?: boolean;
}

export const ButtonControl: React.FC<ButtonProps> = (props) => {
  const configStyleBtn = `btn mx-[5px] px-4 text-sm font-normal ${
    props.title === TITLE_BUTTON.SAVE ||
    props.title === TITLE_BUTTON.DELETE ||
    (!props.disabled && props.title === TITLE_BUTTON.SAVE)
      ? "bg-[#f24b50] text-[#b3383b]"
      : props.title === TITLE_BUTTON.CANCEL ||
        props.title === TITLE_BUTTON.ARCHIVE ||
        props.title === TITLE_BUTTON.UNARCHIVE
      ? "bg-[#fff] text-[#000000DE]"
      : "bg-[#1f91f3] text-white"
  } ${
    ((props.title === TITLE_BUTTON.DELETE && props.dataItem?.isDeleted) ||
      props.dataItem?.type === TYPE_TASK.OTHER_TYPE ||
      (props.title === TITLE_BUTTON.SAVE && !props.disabled) ||
      (props.title === TITLE_BUTTON.SAVE &&
        props.dataItem?.name &&
        !props.disabled)) &&
    "text-white font-semibold"
  } border-none rounded leading-9`;

  return (
    <button
      className={configStyleBtn}
      onClick={() => {
        props.handleClick(props.dataItem);
      }}
      disabled={
        !props.disabled // nếu disabled = false => action
          ? false
          : props.isClient
          ? true
          : (props.title === TITLE_BUTTON.SAVE && !props.dataItem?.name) ||
            (props.dataItem?.type !== TYPE_TASK.OTHER_TYPE &&
              props.title === TITLE_BUTTON.DELETE &&
              !props.dataItem?.isDeleted)
      }
    >
      {props.title}
    </button>
  );
};
