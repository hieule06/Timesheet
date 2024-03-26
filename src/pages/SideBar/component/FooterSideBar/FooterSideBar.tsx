import React from "react";

export default function FooterSidebBar() {
  return (
    <div className="flex flex-col p-[15px] text-[13px]">
      <span className="block">
        {" "}
        © 2024 <b className="text-[#f44336]">Timesheet</b>
      </span>
      <span>
        <b>Version </b> 4.3.0.0 [20231608]{" "}
      </span>
    </div>
  );
}
