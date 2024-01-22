import { getCustomerEquipmentCount, getCustomerEquipments } from "@/contexts/customer-equipment"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from "zod"
import { NOT_AUTHORIZED } from "../../constants"

const schema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  customerNumber: z.string(),
})

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (user === undefined) {
      return NextResponse.json({ error: NOT_AUTHORIZED })
    }

    const params = schema.parse(Object.fromEntries(request.nextUrl.searchParams))

    const data = await getCustomerEquipments(params.customerNumber, params)
    const total = await getCustomerEquipmentCount(params.customerNumber)

    return NextResponse.json({ total, data }, { status: 200 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
