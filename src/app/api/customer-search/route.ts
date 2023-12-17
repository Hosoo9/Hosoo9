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

  const number = operationCode ? (await findOperation(operationCode as string))?.customerNumber : customerNumber

  const result = await searchCustomer({ customerNumber: number })

  return NextResponse.json(result, { status: 200 })
}
