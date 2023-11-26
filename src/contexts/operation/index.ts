import prisma from "@/utils/prisma"
import { ContextOptions, PaginationParams } from "@/utils/types"
import { Prisma } from "@prisma/client"
import crypto from "crypto"

export type OperationState = 1 | 2 | 3 | 4 | 5 | 6
export type OperationType = 1 | 2 | 3 | 4 | 5
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
  operationType: OperationType
}

type FindOperationsInput = PaginationParams & {
  page: number
  limit: number
  customerNumber?: string
  address?: string
  statuses?: number[]
  customerName?: string
  desiredDate?: Date
  technicianName?: string
  isExpiredExchange?: boolean
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
    data: { ...input },
  })

  return operation
}

export const findOperation = async (
  code: string,
  { includeUser } = { includeUser: false },
) => {
  return await prisma.operation.findUnique({
    where: { code },
    include: { createdByUser: includeUser },
  })
}

export const findOperations = async ({
  page,
  limit,
  address,
  statuses,
  customerNumber,
  desiredDate,
  customerName,
  technicianName,
  isExpiredExchange,
}: FindOperationsInput, { includeUser } = { includeUser: true }) => {
  return await prisma.operation.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      status: {
        in: statuses,
      },
      address: {
        startsWith: address,
      },
      customerNumber: {
        startsWith: customerNumber,
      },
      isExpiredExchange
    },
    include: {
      createdByUser: includeUser,
    }
  })
}
