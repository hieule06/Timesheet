import { TypeDataModalProject } from "../../../type/TypeDataModalProject";
import { TypeDataUser } from "../../../type/TypeDataUser";
import { ModalTeamUserNotPrj } from "./ModalTeamUserNotPrj/ModalTeamUserNotPrj";
import { ModalTeamUserInPrj } from "./ModalTeamUserInPrj/ModalTeamUserInPrj";
import "./ModalTeam.scss";
import { useState } from "react";

interface ModalTeamProps {
  dataItemProjectProp: Partial<TypeDataModalProject> | undefined;
  handleGetDataModalProject: (
    item: Partial<TypeDataModalProject> | undefined
  ) => void;
  dataListUserNotPagging: TypeDataUser[] | undefined;
}

export const ModalTeam: React.FC<ModalTeamProps> = (props) => {
  const [isShowAddMember, setIsShowAddMember] = useState<boolean>(false);

  const handleShowAddMember = () => {
    setIsShowAddMember(!isShowAddMember);
  };

  return (
    <div className="flex">
      <ModalTeamUserInPrj
        dataItemProjectProp={props.dataItemProjectProp}
        handleGetDataModalProject={props.handleGetDataModalProject}
        dataListUserNotPagging={props.dataListUserNotPagging}
        handleShowAddMember={handleShowAddMember}
        isShowAddMember={isShowAddMember}
      />
      <ModalTeamUserNotPrj
        dataItemProjectProp={props.dataItemProjectProp}
        handleGetDataModalProject={props.handleGetDataModalProject}
        dataListUserNotPagging={props.dataListUserNotPagging}
        isShowAddMember={isShowAddMember}
      />
    </div>
  );
};
