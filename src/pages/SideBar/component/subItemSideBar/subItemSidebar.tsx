import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface SubItemSideBarProps {
  id: string;
  title: string;
  handleGetIdItemSideBar: () => void;
  idItemSideBar: string;
  href: string | undefined;
}

export const SubItemSideBar: React.FC<SubItemSideBarProps> = (props) => {
  const checkColor = props.idItemSideBar === props.id && "text-[#f44a3d]";
  return (
    <li>
      <a
        href={props.href}
        className={`${checkColor} flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
        onClick={props.handleGetIdItemSideBar}
      >
        <FontAwesomeIcon
          className={`${checkColor} font-bold mr-[6px]`}
          icon={faAngleRight}
        />
        <ImportContactsIcon
          className={`text-[#747474] ${checkColor} mr-[6px] `}
        />
        <span className={`${checkColor}`}>{props.title}</span>
      </a>
    </li>
  );
};
