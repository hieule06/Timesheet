import React from "react";

interface ButtonProps {
  handleCancel: () => void;
  handleSave: () => void;
  title: string;
}

export const ButtonControl: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className="btn mx-[5px] px-4 text-white text-sm font-normal bg-[#1f91f3] border-none rounded leading-9"
      onClick={() => {
        props.handleCancel(), props.handleSave();
      }}
    >
      {props.title}
    </button>
  );
};
