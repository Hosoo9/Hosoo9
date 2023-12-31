import prisma from "@/utils/prisma"
import { PaginationParams } from "@/utils/types"

export const getCustomerEquipments = async (customerNumber: string, { page, limit }: PaginationParams) => {
  const customerEquipments = await prisma.customerEquipment.findMany({
    where: {
      kyakuNo: customerNumber,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  })

  return customerEquipments
}

export const getCustomerEquipmentCount = async (customerNumber: string) => {
  const count = await prisma.customerEquipment.count({
    where: {
      kyakuNo: customerNumber,
    },
  })

  return count
}
