import prisma from "@/utils/prisma"
import { Prisma } from "@prisma/client"

export const findMeterSizes = async () => {
  return await prisma.meterSizeMaster.findMany()
}

export const createSize = async (
  data: Prisma.MeterSizeMasterCreateInput,
) => {
  return await prisma.meterSizeMaster.create({ data })
}

export const updateSize = async (
  id: number,
  data: Prisma.MeterSizeMasterUpdateInput,
) => {
  return await prisma.meterSizeMaster.update({
    where: {
      id
    },
    data,
  })
}

export const deleteSize = async (id: number) => {
  return await prisma.meterSizeMaster.delete({
    where: {
      id
    }
  })
}
