import prisma from "../../src/utils/prisma";
import { Prisma } from "@prisma/client";
import { Chance } from "chance"

const chance = new Chance()

export const companyFactory = {
  build: (attrs: Partial<Prisma.CompanyCreateInput> = {}) => {
    return {
      name: chance.company(),
      code: chance.ssn(),
      ...attrs
    }
  },
  create: async (attrs: Partial<Prisma.CompanyCreateInput> = {}) => {
    const company = companyFactory.build(attrs)

    return await prisma.company.create({
      data: { ...company }
    })
  }
}
