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
  id: number,
  data: Prisma.MeterManufacturerMasterUpdateInput,
) => {
  return await prisma.meterManufacturerMaster.update({
    where: {
      id
    },
    data,
  })
}

export const deleteManufacturer = async (id: number) => {
  return await prisma.meterManufacturerMaster.delete({
    where: {
      id
    }
  })
}
