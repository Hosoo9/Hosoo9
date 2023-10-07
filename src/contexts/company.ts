import prisma from "@/utils/prisma"

export const getCompanies = async () => {
  const companies = await prisma.company.findMany()

  return companies
}

type UpsertCompanyInput = {
  code: string
  name: string
}

export const upsertCompany = async (input: UpsertCompanyInput) => {
  return await prisma.company.upsert({
    where: { code: input.code },
    update: { name: input.name },
    create: input,
  })
}
