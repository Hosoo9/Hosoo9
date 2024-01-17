import prisma from "@/utils/prisma"
import { OptionalPaginationParams } from "@/utils/types"

export const getCustomerEquipments = async (
  customerNumber: string,
  { page, limit }: OptionalPaginationParams,
) => {
  const customerEquipments = await prisma.customerEquipment.findMany({
    where: {
      kyakuNo: customerNumber,
    },
    skip: page && limit ? (page - 1) * limit : undefined,
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
