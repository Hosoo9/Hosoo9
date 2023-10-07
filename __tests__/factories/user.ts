import prisma from "../../src/utils/prisma";
import { Prisma } from "@prisma/client";
import { Chance } from "chance"

const chance = new Chance()

export const userFactory = {
  build: (attrs: Partial<Prisma.UserCreateInput> = {}) => {
    return {
      name: chance.name(),
      email: chance.email(),
      role: 1,
      ...attrs
    }
  },
  create: async (attrs: Partial<Prisma.UserCreateInput> = {}) => {
    const user = userFactory.build(attrs)

    return await prisma.user.create({
      data: { ...user, role: 1 }
    })
  }
}
