import { recordNotFound, unauthorized } from "@/app/api/helpers"
import { findOperation } from "@/contexts/operation"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } },
) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return unauthorized()
  }

  const operation = await findOperation(params.code)

  if (operation === null) {
    return recordNotFound()
  }

  return NextResponse.json({
    customerNumber: operation.customerNumber,
    // housingType: operation.housingType,
    postalCode: operation.postalCode,
    municipality: operation.municipality,
    address: operation.address,
    buildingNameRoomNumber: operation.buildingNameRoomNumber,
    name: operation.name,
    nameKana: operation.nameKana,
    phoneNumber: operation.phoneNumber,
    // phoneNumberType: operation.phoneNumberType,
    // mailAddress: operation.mailAddress,
  }, { status: 200 })
}

