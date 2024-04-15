export interface TypeDataUser {
  name: string;
  emailAddress: string;
  isActive: boolean;
  type: number;
  jobTitle: string;
  level: string | null;
  userCode: string | null;
  avatarPath: string;
  avatarFullPath: string;
  branch: number;
  branchColor: string | null;
  branchDisplayName: string | null;
  branchId: number;
  positionId: number;
  positionName: string;
  id: number;
}
