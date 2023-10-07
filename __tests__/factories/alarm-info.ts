import prisma from "../../src/utils/prisma"
import { Prisma } from "@prisma/client"
import { Chance } from "chance"

const chance = new Chance()

export const alarmInfoFactory = {
  build: (attrs: Partial<Prisma.AlarmInfoCreateInput> = {}) => {
    return {
      ...attrs,
    }
  },
  create: async (attrs: Partial<Prisma.AlarmInfoCreateInput> = {}) => {
    const alarmInfo = alarmInfoFactory.build(attrs)

    return await prisma.alarmInfo.create({
      data: {
        ...alarmInfo,
        modelNumber: chance.ssn(),
        alarmType: chance.pickone([1, 2, 3]),
        price: attrs.price || 100,
        systemCategoryCode: "1",
        systemCategoryName: "Cataa",
        standard: "standard",
        ...attrs,
      },
    })
  },
}
