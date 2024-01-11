import prisma from "@/utils/prisma"
import { PaginationParams } from "@/utils/types"
import { Prisma } from "@prisma/client"

export const getBasicLaborRates = async ({ page, limit }: PaginationParams) => {
  const basicLaborRates = await prisma.basicLaborRate.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  })

  return basicLaborRates
}

export const getBasicLaborRateCount = async () => {
  const count = await prisma.basicLaborRate.count()

  return count
}

export const upsertBasicLaborRate = async (
  code: string,
  input: Prisma.BasicLaborRateCreateInput,
) => {
  return prisma.basicLaborRate.upsert({
    where: { code },
    create: { ...input },
    update: input
  })
}

export const deleteBasicLaborRate = async (code: string) => {
  return prisma.basicLaborRate.delete({
    where: { code },
  })
}
