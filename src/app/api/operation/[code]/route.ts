import { findOperation, updateOperation } from "@/contexts/operation"
import { updateOperationSchema } from "@/contexts/operation/validation-schema"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { NOT_AUTHORIZED } from "../../constants"
import { unauthorized } from "../../helpers"
import { presentOperation } from "@/utils/operation/operation-transformer"

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } },
) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  const operation = await findOperation(params.code, { includeUser: true })

  if (operation === null) {
    return NextResponse.json({ error: "Operation not found" }, { status: 404 })
  }

  return NextResponse.json(presentOperation(operation), { status: 200 })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { code: string } },
) {
  const user = await getCurrentUser()

  if (
    user === undefined
    // (await enforce(user.id, "operation", "write")) === false
  ) {
    return unauthorized()
  }

  const input = updateOperationSchema.parse(await request.json())

  console.log(`-------------input---------------`)
  console.log(input)
  console.log(`----------------------------`)

  const operation = await updateOperation(params.code, {
    ...input,
    operationType: input.operationType ? parseInt(input.operationType) : null,
    footprint: input.footprint ? parseInt(input.footprint) : null,
    // solicitingCompanyId: user.companyCode,
    // type: parseInt(input.type) as OperationWorkType,
    // gasType: parseInt(input.gasType) as GasType,
    // housingType: parseInt(input.housingType) as HousingType,
    // phoneNumberType: parseInt(input.phoneNumberType) as PhoneNumberType,
    // oneOrBulk: parseInt(input.oneOrBulk) as OneOrBulkType,
  })

  return NextResponse.json(operation, { status: 200 })
}
