import { searchCustomer } from "@/contexts/customer"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { unauthorized } from "../helpers"
import { findOperation } from "@/contexts/operation"


export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return unauthorized()
  }

  const customerNumber = request.nextUrl.searchParams.get("customerNumber")
  const operationCode = request.nextUrl.searchParams.get("operationCode")
  const meterNumber = request.nextUrl.searchParams.get("meterNumber")
  const phoneNumber = request.nextUrl.searchParams.get("phoneNumber")
  const code = request.nextUrl.searchParams.get("code")

  const number = operationCode
    ? (await findOperation(operationCode as string))?.customerNumber
    : customerNumber

  const result = await searchCustomer({ customerNumber: number, meterNumber, phoneNumber, code })

  return NextResponse.json(result, { status: 200 })
}
