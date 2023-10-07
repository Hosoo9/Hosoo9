import prisma from "@/utils/prisma";
import { Prisma } from "@prisma/client";

export const findAlarmInfo = (modelNumber: string) => {
  return prisma.alarmInfo.findUnique({
    where: { modelNumber }
  })
}

export const getAlarmInfos = async () => {
  const alarmInfos = await prisma.alarmInfo.findMany()

  return alarmInfos
}


export const createAlarmInfo = (input: Prisma.AlarmInfoCreateInput) => {
  return prisma.alarmInfo.create({
    data: input
  })
}

export const updateAlarmInfo = (modelNumber: string, input: Prisma.AlarmInfoUpdateInput) => {
  return prisma.alarmInfo.update({
    where: { modelNumber },
    data: input
  })
}
