import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

interface HeaderContainerProps {
  title: string;
}

export const HeaderContainer: React.FC<HeaderContainerProps> = (props) => {
  return (
    <div className="flex items-center justify-between p-[15px] border-b border-[rgba(204,204,204,.35)] text-[#555] leading-normal">
      <h2 className="text-lg font-medium text-[#111]">{props.title}</h2>
      <button className="w-[24px] h-[24px]">
        <FontAwesomeIcon
          className="text-xl mr-[10px] cursor-pointer"
          icon={faEllipsisVertical}
        />
      </button>
    </div>
  );
};
