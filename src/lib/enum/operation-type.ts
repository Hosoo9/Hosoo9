import { OperationState } from "@/contexts/operation"

const STATE_MAPPING = {
  1: "DRAFT",
  2: "REQUESTED",
  3: "APPROVED",
  4: "REJECTED",
  5: "ONGOING",
  6: "COMPLETED",
}

export const getOperationStateName = (state: OperationState): string => {
  return STATE_MAPPING[state]
}
