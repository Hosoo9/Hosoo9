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

  if (customerNumber === null && operationCode === null) {
    return NextResponse.json({ errors: "customerNumber or operationCode is required" }, { status: 400 })
  }

  const number = customerNumber ? customerNumber : (await findOperation(operationCode as string))?.customerNumber

  if (!number) {
    return NextResponse.json({ errors: "customer not found" }, { status: 422 })
  }

  const result = await searchCustomer(number)

  return NextResponse.json(result, { status: 200 })
}
