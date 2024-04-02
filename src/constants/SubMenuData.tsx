import React from "react";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
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

export interface SubMenuItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  subChildren: boolean;
  iconAddChildren: React.ReactNode;
  iconRemoveChildren: React.ReactNode;
  href: string;
}

interface SubItemSideBarProps {
  id: string;
  title: string;
  href: string;
}

export const ListSubItemSidebar: SubItemSideBarProps[] = [
  {
    id: "2-1",
    title: "Tasks",
    href: "/task#"
  },
  {
    id: "2-2",
    title: "Billing",
    href: ""
  },
  {
    id: "2-3",
    title: "Invoice",
    href: ""
  }
];

export const ListSubMenu: SubMenuItem[] = [
  {
    id: "1",
    icon: <AccountBoxIcon className="text-[#747474]" />,
    title: "My profile",
    subChildren: false,
    iconAddChildren: null,
    iconRemoveChildren: null,
    href: ""
  },
  {
    id: "2",
    icon: <GroupWorkIcon className="text-[#747474]" />,
    title: "Admin",
    subChildren: true,
    iconAddChildren: (
      <FontAwesomeIcon className="py-2 space-y-2" icon={faPlus} />
    ),
    iconRemoveChildren: (
      <FontAwesomeIcon className="py-2 space-y-2" icon={faMinus} />
    ),
    href: "/task#"
  },
  {
    id: "3",
    icon: <AssignmentIcon className="text-[#747474]" />,
    title: "Projects",
    subChildren: false,
    iconAddChildren: null,
    iconRemoveChildren: null,
    href: "/projects#"
  },
  {
    id: "4",
    icon: <AccessAlarmIcon className="text-[#747474]" />,
    title: "My timesheets",
    subChildren: false,
    iconAddChildren: null,
    iconRemoveChildren: null,
    href: ""
  },
  {
    id: "5",
    icon: <EventBusyIcon className="text-[#747474]" />,
    title: "My request off/remote/onsite",
    subChildren: false,
    iconAddChildren: null,
    iconRemoveChildren: null,
    href: ""
  },
  {
    id: "6",
    icon: <TodayIcon className="text-[#747474]" />,
    title: "My working time",
    subChildren: false,
    iconAddChildren: null,
    iconRemoveChildren: null,
    href: ""
  },
  {
    id: "7",
    icon: <DateRangeIcon className="text-[#747474]" />,
    title: "Manage timesheet",
    subChildren: false,
    iconAddChildren: null,
    iconRemoveChildren: null,
    href: ""
  },
  {
    id: "8",
    icon: <RuleIcon className="text-[#747474]" />,
    title: "Manage request off/remote/onsite",
    subChildren: false,
    iconAddChildren: null,
    iconRemoveChildren: null,
    href: ""
  },
  {
    id: "9",
    icon: <AccessTimeIcon className="text-[#747474]" />,
    title: "Manage working times",
    subChildren: false,
    iconAddChildren: null,
    iconRemoveChildren: null,
    href: ""
  },
  {
    id: "10",
    icon: <GroupsIcon className="text-[#747474]" />,
    title: "Team working calendar",
    subChildren: false,
    iconAddChildren: null,
    iconRemoveChildren: null,
    href: ""
  }
];
