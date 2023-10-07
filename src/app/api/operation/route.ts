import {
  GasType,
  HousingType,
  OneOrBulkType,
  OperationWorkType,
  PhoneNumberType,
  createOperation,
  findOperations,
} from "@/contexts/operation"
import { createOperationSchema } from "@/contexts/operation/validation-schema"
import { getCurrentUser } from "@/lib/session"
import { getEnforcer } from "@/utils/prisma"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from "zod"
import { unauthorized } from "../helpers"

const schema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  customerNumber: z.string().optional(),
  address: z.string().optional(),
  status: z.coerce.number().optional(),
  customerName: z.string().optional(),
  desiredDate: z.coerce.date().optional(),
  technicianName: z.string().optional(),
})

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return unauthorized()
  }

  const params = schema.parse(Object.fromEntries(request.nextUrl.searchParams))

  const operations = await findOperations(params)

  return NextResponse.json(operations, { status: 200 })
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    const enforcer = await getEnforcer()

    if (
      user === undefined ||
      (await enforcer.enforce(user.id, "operation", "write")) === false
    ) {
      return unauthorized()
    }

    const params = createOperationSchema.parse(await request.json())

    const operation = await createOperation({
      ...params,
      solicitingCompanyId: user.companyCode,
      createdBy: user.id,
      status: 1,
      type: parseInt(params.type) as OperationWorkType,
      gasType: parseInt(params.gasType) as GasType,
      housingType: parseInt(params.housingType) as HousingType,
      phoneNumberType: parseInt(params.phoneNumberType) as PhoneNumberType,
      oneOrBulk: parseInt(params.oneOrBulk) as OneOrBulkType,
    })

    return NextResponse.json(operation, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
