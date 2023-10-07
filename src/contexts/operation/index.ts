import prisma from "@/utils/prisma"
import { ContextOptions, PaginationParams } from "@/utils/types"
import crypto from "crypto"

export type OperationWorkType = 1 | 2 | 3 | 4 | 5
export type GasType = 1 | 2
export type HousingType = 1 | 2
export type PhoneNumberType = 1 | 2 | 3
export type OneOrBulkType = 1 | 2

type CommonOperationInput = {
  type: OperationWorkType
  status: 1 | 2 | 3 | 4 | 5
  applicationDate: Date
  createdBy: string
  solicitingCompanyId?: string
  gasType: GasType
  customerNumber?: string
  postalCode: string
  municipality: string
  address: string
  housingType: 1 | 2
  buildingNameRoomNumber?: string
  name: string
  nameKana?: string
  phoneNumber: string
  phoneNumberType: PhoneNumberType
  mailAddress?: string
  oneOrBulk: OneOrBulkType
  paymentType: number
  desiredDate?: Date
  desiredTimeSlot?: number
  memo?: string
  assignedWorkerId?: string
  scheduledDatetime?: Date
  amountExcludingTax?: number
  amountConsumptionTax?: number
  amountIncludingTax?: number
  taxRate?: number
  contractDate?: Date
  branchType?: number
  supplyType?: number
  buildingType?: number
  facilityType?: number
}

type CreateAlarmInput = {
  modelNumber: string
}

type CreateOperationInput = CommonOperationInput & {
  installationAlarms?: CreateAlarmInput[]
}

type UpdateOperationInput = CommonOperationInput & {}

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

  const [operation, alarmInputs] = await prisma.$transaction(async (tx) => {
    const operation = await tx.operation.create({
      data: { ...input, code: `_${num}`, installationAlarms: undefined },
    })

    const alarmInputs = input.installationAlarms?.map((input) => ({
      operationId: operation.id,
      modelNumber: input.modelNumber,
    }))

    return [operation, alarmInputs]
  })

  await prisma.$transaction(async (tx2) => {
    for (const alarmInput of alarmInputs || []) {
      await tx2.$executeRaw`insert into dbo.InstallationAlarm (operationId, modelNumber, branchNumber) values (${alarmInput.operationId}, ${alarmInput.modelNumber}, ${crypto.randomUUID()})`

      // await tx2.installationAlarm.create({
      //   data: alarmInput,
      // })
    }
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
  input: UpdateOperationInput,
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
      desiredDate: desiredDate,
    },
  })
}
