import { OperationState } from "@/contexts/operation";

export const getListNameFromStatus = (status: OperationState, isExpired: boolean) => {
  if (status === 6) {
    return "完了リスト"
  } else if (isExpired && status === 1) {
    return "期満交換リスト"
  } else if (status === 3 || status === 5) {
    return "作業予定リスト"
  } else if (status === 2) {
    return "承認待ちリスト"
  } else {
    return "日程調整リスト"
  }
}
