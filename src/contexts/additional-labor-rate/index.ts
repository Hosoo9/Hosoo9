import prisma from "@/utils/prisma"
import { PaginationParams } from "@/utils/types"
import { Prisma } from "@prisma/client"

export const getAdditionalLaborRates = async ({ page, limit }: PaginationParams) => {
  const additionalLaborRates = await prisma.additionalLaborRate.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  })

  return additionalLaborRates
}

export const getAdditionalLaborRateCount = async () => {
  const count = await prisma.additionalLaborRate.count()

  return count
}

export const upsertAdditionalLaborRate = async (
  code: string,
  input: Prisma.AdditionalLaborRateCreateInput,
) => {
  return prisma.additionalLaborRate.upsert({
    where: { code },
    create: { ...input },
    update: input
  })
}

export const deleteAdditionalLaborRate = async (code: string) => {
  return prisma.additionalLaborRate.delete({
    where: { code },
  })
}
