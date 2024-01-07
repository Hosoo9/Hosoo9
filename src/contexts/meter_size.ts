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
  size: string,
  data: Prisma.MeterSizeMasterUpdateInput,
) => {
  return await prisma.meterSizeMaster.update({
    where: {
      size
    },
    data,
  })
}

export const deleteSize = async (size: string) => {
  return await prisma.meterSizeMaster.delete({
    where: {
      size
    }
  })
}
