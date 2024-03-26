import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowUp,
  faFileAlt,
  faCaretDown,
  faEllipsisVertical,
  faBars
} from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  handleToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <nav className="h-[70px] w-full bg-[#f44336] p-[15px] flex items-center justify-between fixed z-50">
      <div className="flex ml-5 items-center">
        <div
          className="lg:hidden mr-[15px] cursor-pointer"
          onClick={props.handleToggleSidebar}
        >
          <FontAwesomeIcon className="text-white" icon={faBars} />
        </div>
        <span className="flex cursor-pointer">
          <img
            className="h-8 w-8"
            src="https://training-timesheet.nccsoft.vn/assets/images/Timesheet.png"
            alt="logo"
          />
          <p className="text-white text-lg font-medium">Timesheet</p>
        </span>
      </div>
      <div className="flex items-center text-white text-xl">
        <FontAwesomeIcon
          className="mr-[10px] cursor-pointer"
          icon={faFileArrowUp}
        />
        <FontAwesomeIcon
          className="mr-[10px] cursor-pointer"
          icon={faFileAlt}
        />
        <span className="text-sm cursor-pointer mr-5">
          English
          <FontAwesomeIcon className="ml-1 text-xs" icon={faCaretDown} />
        </span>
        <FontAwesomeIcon
          className="text-2xl mr-[10px] cursor-pointer"
          icon={faEllipsisVertical}
        />
      </div>
    </nav>
  );
};

export default Header;
