import { useState } from "react";
import "./SideBar.scss";
import { ItemSideBar } from "./component/ItemSideBar/ItemSideBar";
import FooterSideBar from "./component/FooterSideBar/FooterSideBar";
import UserSideBar from "./component/UserSideBar/UserSideBar";
import { ListSubMenu } from "../../constants/SubMenuData";

interface SideBarProps {
  isOpenSidebar: boolean;
}

export const SideBar: React.FC<SideBarProps> = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <aside
        id="sidebar-multi-level-sidebar"
        className={`wrapper-sidebar fixed top-0 left-0 z-40 w-[300px] mt-[70px] transition-transform table:translate-x-0 ${
          props.isOpenSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <UserSideBar></UserSideBar>
        <div className="sidebar static h-full px-3 py-4 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-800 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 text-sm">
          <ul className="space-y-2 font-medium">
            {ListSubMenu.map((item, index) => {
              return (
                <li key={index}>
                  <ItemSideBar
                    icon={item.icon}
                    title={item.title}
                    subChildren={item.subChildren}
                    isDropdownOpen={isDropdownOpen}
                    handleToggleDropdown={handleToggleDropdown}
                    iconAddChildren={item.iconAddChildren}
                    iconRemoveChildren={item.iconRemoveChildren}
                  ></ItemSideBar>
                </li>
              );
            })}
          </ul>
        </div>
        <FooterSideBar></FooterSideBar>
      </aside>
    </>
  );
};

export default SideBar;
