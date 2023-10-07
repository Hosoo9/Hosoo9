import prisma from "@/utils/prisma"
import { Prisma } from "@prisma/client"
import { Chance } from "chance"

const chance = new Chance()

export const inviteFactory = {
  build: (attrs: Partial<Prisma.CompanyCreateInput> = {}) => {
    return {
      email: chance.email(),
      role: 1,
      code: chance.ssn(),
      ...attrs,
    }
  },
  create: async (attrs: Partial<Prisma.CompanyCreateInput> = {}) => {
    const invite = inviteFactory.build(attrs)

    return await prisma.invite.create({
      data: { ...invite },
    })
  },
}
