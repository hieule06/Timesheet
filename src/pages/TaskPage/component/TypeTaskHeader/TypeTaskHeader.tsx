import React from "react";

interface TypeTaskHeaderProps {
  title: string;
  description: string;
  numberElement: number;
}

export const TypeTaskHeader: React.FC<TypeTaskHeaderProps> = (props) => {
  return (
    <>
      {props.numberElement > 0 && (
        <div className="p-[10px] border-b border-[rgba(204,204,204,.35)]">
          <h5 className="text-sm font-bold mb-[10px] text-gray-600">
            {`${props.title} (${props.numberElement})`}
          </h5>
          <p className="text-sm text-[#555] mb-[10px]">{props.description}</p>
        </div>
      )}
    </>
  );
};
