import React from "react";
import { ListSubItemSidebar } from "../../../../constants/SubMenuData";
import { SubItemSideBar } from "../subItemSideBar/subItemSidebar";
import "./ItemSideBar.scss";

interface ItemSideBarProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  isDropdownOpen: boolean;
  handleToggleDropdown?: () => void; // handleToggleDropdown có thể là optional
  subChildren: React.ReactNode; // Sub children
  iconAddChildren: React.ReactNode; // Icon để thêm children
  iconRemoveChildren: React.ReactNode; // Icon để loại bỏ children
  handleGetIdItemSideBar: (idItem: string) => void;
  idItemSideBar: string;
  href: string;
}

export const ItemSideBar: React.FC<ItemSideBarProps> = (props) => {
  const handleClick = (id: string) => {
    if (props.handleToggleDropdown && props.iconAddChildren) {
      props.handleToggleDropdown();
    }
    props.handleGetIdItemSideBar(id);
  };

  return (
    <>
      <a
        onClick={() => handleClick(props.id)}
        className={`${
          props.idItemSideBar === props.id && "item-sidebar"
        } flex items-center w-full py-[10px] text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer`}
        aria-controls="dropdown-example"
        data-collapse-toggle="dropdown-example"
        aria-expanded={props.isDropdownOpen}
        href={props.href}
      >
        {props.icon}
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          {props.title}
        </span>
        {props.isDropdownOpen
          ? props.iconRemoveChildren
          : props.iconAddChildren}
      </a>
      {props.isDropdownOpen && props.iconRemoveChildren && (
        <ul
          id="dropdown-example"
          className="py-2 space-y-2"
          aria-labelledby="dropdown-trigger"
        >
          {props.subChildren && (
            <ul
              id="dropdown-example"
              className="pl-5 space-y-2 font-normal text-[#747474]"
            >
              {ListSubItemSidebar.map((subItemSidebar) => (
                <SubItemSideBar
                  title={subItemSidebar.title}
                  id={subItemSidebar.id}
                  handleGetIdItemSideBar={() =>
                    props.handleGetIdItemSideBar(subItemSidebar.id)
                  }
                  idItemSideBar={props.idItemSideBar}
                  href={subItemSidebar.href}
                />
              ))}
            </ul>
          )}
        </ul>
      )}
    </>
  );
};
