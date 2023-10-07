import prisma from "../../src/utils/prisma"
import { Prisma } from "@prisma/client"
import { Chance } from "chance"

const chance = new Chance()

export const contactFactory = {
  build: (attrs: Partial<Prisma.ContactUncheckedCreateInput> = {}) => {
    return {
      ...attrs,
    }
  },
  create: async (attrs: Partial<Prisma.ContactUncheckedCreateInput> = {}) => {
    const contact = contactFactory.build(attrs)

    return await prisma.contact.create({
      data: {
        createdBy: "replace this",
        operationId: 111,
        ...contact,
        details: chance.paragraph(),
        contactType: chance.pickone([1, 2]),
        contactedAt: chance.date(),
        ...attrs,
      },
    })
  },
}
