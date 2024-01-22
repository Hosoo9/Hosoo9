import { searchCustomer } from "@/contexts/customer"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { unauthorized } from "../helpers"
import { findOperation } from "@/contexts/operation"
import { z } from "zod"


export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return unauthorized()
  }

  const customerNumber = request.nextUrl.searchParams.get("customerNumber")
  const operationCode = request.nextUrl.searchParams.get("operationCode")

  const number = operationCode
    ? (await findOperation(operationCode as string))?.customerNumber
    : customerNumber

  const result = await searchCustomer({
    customerNumber: number,
  })

  return NextResponse.json(result, { status: 200 })
}

const searchSchema = z.object({
  customerNumber: z.string().optional(),
  operationCode: z.string().optional(),
  meterNumber: z.string().optional(),
  phoneNumber: z.string().optional(),
  userKataNm: z.string().optional(),
  userKataKNm: z.string().optional(),
  address: z.string().optional(),
  municipality: z.string().optional(),
  streetNo: z.string().optional(),
  houseNo: z.string().optional(),
  userSpecialNo: z.string().optional(),
  disaReblkCd: z.string().optional(),
})

export async function POST(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return unauthorized()
  }

  const body = await request.json()

  const { 
    customerNumber,
    operationCode,
    meterNumber,
    phoneNumber,
    userKataNm,
    userKataKNm,
    address,
    municipality,
    streetNo,
    houseNo,
    userSpecialNo,
    disaReblkCd,
  } = searchSchema.parse(body)

  const number = operationCode
    ? (await findOperation(operationCode as string))?.customerNumber
    : customerNumber

  const result = await searchCustomer({
    customerNumber: number,
    meterNumber,
    phoneNumber,
    userKataNm,
    userKataKNm,
    address,
    municipality,
    streetNo,
    houseNo,
    userSpecialNo,
    disaReblkCd
  })

  return NextResponse.json(result, { status: 200 })
}
