import { OperationWorkType } from "@/contexts/operation"

export const OPERATION_TYPE_MAPPING = {
  1: "交換",
  2: "取外",
  3: "入室不要工法",
  4: "保安閉栓",
  5: "閉栓返却",
}

export const getOperationType = (operationType: OperationWorkType) => {
  return OPERATION_TYPE_MAPPING[operationType]
}
