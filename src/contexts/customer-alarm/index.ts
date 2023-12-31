import prisma from "@/utils/prisma"
import { PaginationParams } from "@/utils/types"

export const getCustomerAlarms = async (customerNumber: string, { page, limit }: PaginationParams) => {
  const customerAlarms = await prisma.customerAlarm.findMany({
    where: {
      kyakuNo: customerNumber,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  })

  return customerAlarms
}

export const getCustomerAlarmCount = async (customerNumber: string) => {
  const count = await prisma.customerAlarm.count({
    where: {
      kyakuNo: customerNumber,
    },
  })

  return count
}
