import prisma from "@/utils/prisma"

export const findMeter = async (meterModel: string) => {
  return await prisma.meter.findUnique({
    where: {
      meterModel,
    }
  })
}

export const findMeters = async () => {
  return await prisma.meter.findMany()
}
