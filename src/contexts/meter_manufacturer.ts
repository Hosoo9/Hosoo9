import prisma from "@/utils/prisma"
import { Prisma } from "@prisma/client"

export const findMeterManufacturers = async () => {
  return await prisma.meterManufacturerMaster.findMany()
}

export const createManufacturer = async (
  data: Prisma.MeterManufacturerMasterCreateInput,
) => {
  return await prisma.meterManufacturerMaster.create({ data })
}

export const updateManufacturer = async (
  code: string,
  data: Prisma.MeterManufacturerMasterUpdateInput,
) => {
  return await prisma.meterManufacturerMaster.update({
    where: {
      code
    },
    data,
  })
}

export const deleteManufacturer = async (code: string) => {
  return await prisma.meterManufacturerMaster.delete({
    where: {
      code
    }
  })
}
