import { Operation } from "@prisma/client"
import { User } from "@prisma/client"

const setDate = (date: Date) => {
  return date === null ? null : new Date(date)
}

export const transformOperation = (data: any) => {
  return {
    ...data,
    // scheduledDatetime: setDate(data.scheduledDatetime),
    // postcardOutputTimestamp: setDate(data.postcardOutputTimestamp),
    absenceNoticeDeliveryDate: setDate(data.absenceNoticeDeliveryDate),
    footprint: data.footprint ? data.footprint.toString() : null,
    operationType: data.operationType ? data.operationType.toString() : null,
    // exchangingDate: setDate(data.scheduledDatetime),
    // scheduledTime: data.scheduledTime ? getTimeFromDate(data.scheduledTime) : null,
  }
}

export const presentOperation = (
  operation: Operation & {
    createdByUser?: User
  },
) => {
  {
    if (operation.createdByUser) {
      return {
        ...transformOperation(operation),
        createdByUser: {
          id: operation.createdByUser.id,
          name: operation.createdByUser.name,
        },
      }
    } else {
      return operation
    }
  }
}
