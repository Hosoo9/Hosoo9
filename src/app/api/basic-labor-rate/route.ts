import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { NOT_AUTHORIZED } from "../constants"
import { getBasicLaborRateCount, getBasicLaborRates } from "@/contexts/basic-labor-rate"
import { ZodError, z } from "zod"

const schema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
})

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (user === undefined) {
      return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
    }

    const params = schema.parse(Object.fromEntries(request.nextUrl.searchParams))

    const data = await getBasicLaborRates(params)

    const total = await getBasicLaborRateCount()

    return NextResponse.json({ data, total }, { status: 200 });
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
