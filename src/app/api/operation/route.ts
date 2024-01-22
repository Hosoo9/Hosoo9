import {
  FindOperationsInput,
  HousingType,
  OperationWorkType,
  PhoneNumberType,
  countOperations,
  createOperation,
  findOperations,
} from "@/contexts/operation"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from "zod"
import { unauthorized } from "../helpers"
import {
  createOperationSchema,
  selectOperationSchema,
} from "@/contexts/operation/validation-schema"
import { stringToNumberEnum } from "@/utils/converters"

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return unauthorized()
  }

  const params = selectOperationSchema.parse({
    ...Object.fromEntries(request.nextUrl.searchParams),
    statuses: request.nextUrl.searchParams.getAll("statuses"),
    isExpiredExchange:
      request.nextUrl.searchParams.get("isExpiredExchange") === undefined
        ? undefined
        : request.nextUrl.searchParams.get("isExpiredExchange") === "true",
    operationTypes: request.nextUrl.searchParams.has("operationType")
      ? request.nextUrl.searchParams.getAll("operationType")
      : undefined,
  })

  const options: FindOperationsInput = {
    ...params,
    operationTypes: (params.operationTypes || []).map(
      (type) => parseInt(type) as OperationWorkType,
    ),
  }

  const operations = await findOperations(options, {
    includeUser: true,
    includeCompany: true,
  })

  const total = await countOperations(options)

  return NextResponse.json({ data: operations, total }, { status: 200 })
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    // const enforcer = await getEnforcer()

    if (
      user === undefined
      // (await enforcer.enforce(user.id, "operation", "write")) === false
    ) {
      return unauthorized()
    }

    const params = createOperationSchema.parse(await request.json())

    const operation = await createOperation({
      ...params,
      housingType: stringToNumberEnum<HousingType>(params.housingType),
      phoneNumberType: stringToNumberEnum<PhoneNumberType>(params.phoneNumberType),
      createdBy: user.id,
      customerNumber: params.customerNumber,
      // operationType: parseInt(params.operationType) as OperationWorkType,
      // gasType: parseInt(params.gasType) as GasType,
      // housingType: parseInt(params.housingType) as HousingType,
      // phoneNumberType: parseInt(params.phoneNumberType) as PhoneNumberType,
      // oneOrBulk: parseInt(params.oneOrBulk) as OneOrBulkType,
    })

    // const operation = await createOperation({
    //   ...params,
    //   createdBy: user.id,
    //   operationType: parseInt(params.operationType) as OperationType,
    // })

    return NextResponse.json(operation, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
