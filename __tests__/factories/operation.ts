import prisma from "../../src/utils/prisma"
import { Prisma } from "@prisma/client"
import { Chance } from "chance"

const chance = new Chance()

export const operationFactory = {
  build: (attrs: Partial<Prisma.OperationCreateInput> = {}) => {
    return {
      ...attrs,
    }
  },
  create: async (attrs: Partial<Prisma.OperationCreateInput> = {}) => {
    const operation = operationFactory.build(attrs)

    return await prisma.operation.create({
      data: {
        ...operation,
        address: chance.address(),
        name: chance.name(),
        municipality: chance.city(),
        postalCode: chance.postcode(),
        phoneNumber: chance.phone(),
        housingType: 1,
        phoneNumberType: 2,
        status: 1,
        type: 2,
        code: "default",
        contractDate: new Date(),
        createdBy: attrs.createdBy || "supplyCreatedBy",
        ...attrs,
      },
    })
  },
}
