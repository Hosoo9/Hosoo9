import prisma from "@/utils/prisma"
import { ContextOptions, PaginationParams } from "@/utils/types"
import { Prisma } from "@prisma/client"
import crypto from "crypto"

export type OperationWorkType = 1 | 2 | 3 | 4 | 5
export type GasType = 1 | 2
export type HousingType = 1 | 2
export type PhoneNumberType = 1 | 2 | 3
export type OneOrBulkType = 1 | 2

type CreateAlarmInput = {
  modelNumber: string
}

type CreateOperationInput = {
  createdBy: string
  isSecurityWork: boolean
  changedNotificationFlag: boolean
  valveOpenFlag: boolean
}

type FindOperationsInput = PaginationParams & {
  page: number
  limit: number
  customerNumber?: string
  address?: string
  status?: number
  customerName?: string
  desiredDate?: Date
  technicianName?: string
}

type CompleteOperationInput = {
  contractDate: Date
  branchType: number
  supplyType: number
  buildingType: number
  facilityType: number
}

export const createOperation = async (input: CreateOperationInput) => {
  const num = crypto.randomUUID().split("-")[0]

  const [operation] = await prisma.$transaction(async (tx) => {
    const operation = await tx.operation.create({
      data: { ...input, code: `_${num}` },
    })

    return [operation]
  })

  return operation
}

export const changeState = async (
  operationCode: string,
  newState: number,
  options: ContextOptions = {},
) => {
  const operation = await (options.transaction || prisma).operation.update({
    where: { code: operationCode },
    data: { status: newState },
  })

  return operation
}

export const completeOperation = async (
  operationCode: string,
  input: CompleteOperationInput,
  options: ContextOptions = {},
) => {
  const operation = await (options.transaction || prisma).operation.update({
    where: { code: operationCode },
    data: { status: 6, ...input },
  })

  return operation
}

export const updateOperation = async (
  code: string,
  input: Prisma.OperationUpdateInput,
  options: ContextOptions = {},
) => {
  const operation = await (options.transaction || prisma).operation.update({
    where: { code },
    data: input,
  })

  return operation
}

export const findOperation = async (code: string) => {
  return await prisma.operation.findUnique({ where: { code } })
}

export const findOperations = async ({
  page,
  limit,
  address,
  status,
  customerNumber,
  desiredDate,
  customerName,
  technicianName,
}: FindOperationsInput) => {
  return await prisma.operation.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      status,
      address: {
        startsWith: address,
      },
      customerNumber: {
        startsWith: customerNumber,
      },
    },
  })
}
