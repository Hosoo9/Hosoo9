import prisma from "@/utils/prisma"
import { Prisma } from "@prisma/client"

export const findMeterModels = async () => {
  return await prisma.meterModelMaster.findMany()
}

export const createModel = async (
  data: Prisma.MeterModelMasterCreateInput,
) => {
  return await prisma.meterModelMaster.create({ data })
}

export const updateModel = async (
  id: number,
  data: Prisma.MeterModelMasterUpdateInput,
) => {
  return await prisma.meterModelMaster.update({
    where: {
      id
    },
    data,
  })
}

export const deleteModel = async (id: number) => {
  return await prisma.meterModelMaster.delete({
    where: {
      id
    }
  })
}
