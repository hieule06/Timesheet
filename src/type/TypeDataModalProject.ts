export interface TypeDataModalProject {
  name: string;
  code: string;
  status: number;
  timeStart: string;
  timeEnd: string;
  note: null;
  projectType: number;
  customerId: number;
  tasks: [
    {
      taskId: number;
      billable: boolean;
      id: number;
    }
  ];
  users: [
    {
      userId: number;
      type: number;
      isTemp: boolean;
      id: number;
    }
  ];
  projectTargetUsers: string[];
  komuChannelId: string;
  isNotifyToKomu: boolean;
  isNoticeKMSubmitTS: boolean;
  isNoticeKMRequestOffDate: boolean;
  isNoticeKMApproveRequestOffDate: boolean;
  isNoticeKMRequestChangeWorkingTime: boolean;
  isNoticeKMApproveChangeWorkingTime: boolean;
  isAllUserBelongTo: boolean;
  id: number;
}
