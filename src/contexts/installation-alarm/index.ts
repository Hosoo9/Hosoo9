import prisma from "@/utils/prisma"
import { Prisma } from "@prisma/client"

type FindInstallationAlarm = {
  branchNumber: string
  operationId: bigint
}

export const createInstallationAlarm = async (
  input: Prisma.InstallationAlarmCreateInput,
) => {
  const installationAlarm = await prisma.installationAlarm.create({
    data: { ...input },
  })

  return installationAlarm
}

export const findInstallationAlarm = async ({
  operationId,
  branchNumber,
}: FindInstallationAlarm) => {
  return await prisma.installationAlarm.findUnique({
    where: {
      operationId_branchNumber: {
        operationId,
        branchNumber,
      },
    },
  })
}

export const completeInstallationAlarm = async (
  { operationId, branchNumber }: FindInstallationAlarm,
  updateInput: Prisma.InstallationAlarmUpdateInput,
) => {
  const installationAlarm = await findInstallationAlarm({
    operationId,
    branchNumber,
  })

  if (installationAlarm === null) {
    return null
  }

  const updatedInstallationAlarm = await prisma.installationAlarm.update({
    where: {
      operationId_branchNumber: {
        operationId,
        branchNumber,
      },
    },
    data: {
      ...updateInput
    },
  })

  return updatedInstallationAlarm
}
