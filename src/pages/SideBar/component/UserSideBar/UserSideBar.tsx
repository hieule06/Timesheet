import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserSideBar() {
  return (
    <div className="flex items-center">
      <img
        className="h-[86px] w-full"
        src="https://training-timesheet.nccsoft.vn/user-img-background.7f354e93c30f9d51fc3a.jpg"
        alt=""
      />
      <div className="absolute flex items-center justify-between px-[15px] w-full">
        <div className=" flex items-center cursor-pointer">
          <img
            className="h-[60px] w-[60px] rounded-full mr-3"
            src="https://training-api-timesheet.nccsoft.vn/avatars/host/20231230145539_94b45da9-f885-47d2-afe3-626ea2104d27.jpg"
            alt=""
          />
          <div>
            <a href="" className="block text-sm text-white font-medium">
              <span className="block">thai bui</span>
              <span>thai.buiminh@gmail.com</span>
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 right-2 cursor-pointer">
          <FontAwesomeIcon className="text-white" icon={faChevronDown} />
        </div>
      </div>
    </div>
  );
}
