import React from "react";
import {
  faPlus,
  faMinus,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import RuleIcon from "@mui/icons-material/Rule";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

export interface SubMenuItem {
  icon: React.ReactNode;
  title: string;
  subChildren: React.ReactNode;
  iconAddChildren: React.ReactNode;
  iconRemoveChildren: React.ReactNode;
}

export const ListSubMenu: SubMenuItem[] = [
  {
    icon: <AccountBoxIcon className="text-[#747474]" />,
    title: "My profile",
    subChildren: null,
    iconAddChildren: null,
    iconRemoveChildren: null
  },
  {
    icon: <GroupWorkIcon className="text-[#747474]" />,
    title: "Admin",
    subChildren: (
      <ul
        id="dropdown-example"
        className="pl-5 space-y-2 font-normal text-[#747474]"
      >
        <li>
          <a
            href="#"
            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon
              className="text-[#f44a3d] font-bold mr-[6px]"
              icon={faAngleRight}
            />
            <ImportContactsIcon className="mr-[6px] text-[#f44a3d]" />
            Tasks
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            Billing
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            Invoice
          </a>
        </li>
      </ul>
    ),
    iconAddChildren: (
      <FontAwesomeIcon className="py-2 space-y-2" icon={faPlus} />
    ),
    iconRemoveChildren: (
      <FontAwesomeIcon className="py-2 space-y-2" icon={faMinus} />
    )
  },
  {
    icon: <AssignmentIcon className="text-[#747474]" />,
    title: "Projects",
    subChildren: null,
    iconAddChildren: null,
    iconRemoveChildren: null
  },
  {
    icon: <AccessAlarmIcon className="text-[#747474]" />,
    title: "My timesheets",
    subChildren: null,
    iconAddChildren: null,
    iconRemoveChildren: null
  },
  {
    icon: <EventBusyIcon className="text-[#747474]" />,
    title: "My request off/remote/onsite",
    subChildren: null,
    iconAddChildren: null,
    iconRemoveChildren: null
  },
  {
    icon: <TodayIcon className="text-[#747474]" />,
    title: "My working time",
    subChildren: null,
    iconAddChildren: null,
    iconRemoveChildren: null
  },
  {
    icon: <DateRangeIcon className="text-[#747474]" />,
    title: "Manage timesheet",
    subChildren: null,
    iconAddChildren: null,
    iconRemoveChildren: null
  },
  {
    icon: <RuleIcon className="text-[#747474]" />,
    title: "Manage request off/remote/onsite",
    subChildren: null,
    iconAddChildren: null,
    iconRemoveChildren: null
  },
  {
    icon: <AccessTimeIcon className="text-[#747474]" />,
    title: "Manage working times",
    subChildren: null,
    iconAddChildren: null,
    iconRemoveChildren: null
  },
  {
    icon: <GroupsIcon className="text-[#747474]" />,
    title: "Team working calendar",
    subChildren: null,
    iconAddChildren: null,
    iconRemoveChildren: null
  }
];
