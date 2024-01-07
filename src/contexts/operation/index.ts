import prisma from "@/utils/prisma"
import { sortExtractor } from "@/utils/sort"
import { ContextOptions, PaginationParams } from "@/utils/types"
import { Prisma } from "@prisma/client"
import crypto from "crypto"
import { OperationStateMachine } from "./state-machine"

export type OperationWorkType = 1 | 2 | 3 | 4 | 5
export type OperationState = 1 | 2 | 3 | 4 | 5 | 6
export type OperationType = 1 | 2 | 3 | 4 | 5
export type GasType = 1 | 2
export type HousingType = 1 | 2
export type PhoneNumberType = 1 | 2 | 3
export type OneOrBulkType = 1 | 2

type CreateAlarmInput = {
  modelNumber: string
}

class StateTransitionError extends Error {}

type CreateOperationInput = {
  customerNumber: string
  postalCode: string | null
  municipality: string | null
  address: string | null
  housingType: HousingType | null
  buildingNameRoomNumber: string | null
  name: string | null
  nameKana: string | null
  phoneNumber: string | null
  phoneNumberType: PhoneNumberType | null
  // mailAddress: string | null
  createdBy: string
}

export type FindOperationsInput = PaginationParams & {
  page: number
  limit: number
  sort: string
  customerNumber?: string
  address?: string
  statuses?: number[]
  customerName?: string
  desiredDate?: Date
  technicianName?: string
  isExpiredExchange?: boolean
  assignedWorkerId?: string
  createdAtFrom?: Date
  createdAtTo?: Date
  operationTypes?: OperationWorkType[]
  companyId?: string
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

// export const findOperations = async ({
//   page,
//   limit,
//   address,
//   statuses,
//   customerNumber,
//   desiredDate,
//   customerName,
//   technicianName,
//   isExpiredExchange,
//   assignedWorkerId
// }: FindOperationsInput, { includeUser } = { includeUser: true }) => {
//   return await prisma.operation.findMany({
//     skip: (page - 1) * limit,
//     take: limit,
//     where: {
//       status: {
//         in: statuses,
//       },
//       address: {
//         startsWith: address,
//       },
//       customerNumber: {
//         startsWith: customerNumber,
//       },
//       isExpiredExchange,
//       assignedWorkerId: {
//         startsWith: assignedWorkerId
//       }
//     },
//     include: {
//       createdByUser: includeUser,
//     },
//     orderBy: {
//       createdBy: "desc"
//     }
//   })
// }

const constructWhere = ({
  address,
  statuses,
  customerNumber,
  desiredDate,
  customerName,
  technicianName,
  assignedWorkerId,
  createdAtFrom,
  createdAtTo,
  operationTypes,
  isExpiredExchange,
  companyId
}: FindOperationsInput): Prisma.OperationWhereInput => {
  const conditionalOptions: Prisma.OperationWhereInput = {}

  if (assignedWorkerId) {
    conditionalOptions.assignedWorkerId = {
      startsWith: assignedWorkerId,
    }
  }

  if (createdAtFrom) {
    conditionalOptions.createdAt = {
      gte: createdAtFrom,
      lte: createdAtTo,
    }
  }

  if (operationTypes && operationTypes.length > 0) {
    conditionalOptions.operationType = {
      in: operationTypes,
    }
  }

  if (isExpiredExchange) {
    conditionalOptions.isExpiredExchange = isExpiredExchange
  }

  if (companyId) {
    conditionalOptions.companyId = companyId
  }

  return {
    status: {
      in: statuses,
    },
    address: {
      startsWith: address,
    },
    customerNumber: {
      startsWith: customerNumber,
    },
    ...conditionalOptions,
  }
}

export const batchAssignWorkers = async ({
  codes,
  assignedWorkerId,
  scheduledDate,
}: {
  codes: string[]
  assignedWorkerId: string
  scheduledDate: Date
}) => {
  await prisma.operation.updateMany({
    where: {
      code: {
        in: codes,
      },
    },
    data: {
      assignedWorkerId,
      scheduledDate,
    },
  })
}

export const batchAssignCompany = async ({
  codes,
  companyId
}: {
  codes: string[]
  companyId: string
}) => {
  await prisma.operation.updateMany({
    where: {
      code: {
        in: codes,
      }
    },
    data: {
      companyId
    },
  })
}

export const updateOperationStatusByCodes = async ({
  codes,
  newStatus,
}: {
  codes: string[]
  newStatus: OperationState
}) => {
  const operations = await prisma.operation.findMany({
    where: {
      code: {
        in: codes,
      },
    },
  })

  const results = operations.map((operation) => {
    const machine = new OperationStateMachine(
      operation.code,
      operation.status as OperationState,
    )

    return machine.isValidTransition(newStatus)
      ? { status: "ok", machine }
      : { status: "error", machine }
  })

  // collect errors
  const errors = results.filter((result) => result.status === "error")

  if (errors.length > 0) {
    throw new StateTransitionError(
      `Invalid transition for operation ${errors
        .map((error) => error.machine.code)
        .join(", ")}`,
    )
  } else {
    await prisma.operation.updateMany({
      where: {
        code: {
          in: codes,
        },
      },
      data: {
        status: newStatus,
      },
    })
  }
}

export const findOperations = async (
  findOptions: FindOperationsInput,
  { includeUser, includeCompany } = { includeUser: true, includeCompany: true },
) => {
  const { page, limit, sort } = findOptions
  const { field, order } = sortExtractor(sort)
  const where = constructWhere(findOptions)

  return await prisma.operation.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where,
    include: {
      createdByUser: includeUser,
      company: includeCompany,
    },
    orderBy: {
      [field]: order,
    },
  })
}

export const countOperations = async (findOptions: FindOperationsInput) => {
  return await prisma.operation.count({
    where: constructWhere(findOptions),
  })
}
