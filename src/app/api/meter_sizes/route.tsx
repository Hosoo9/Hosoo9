import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { createSize, findMeterSizes } from "@/contexts/meter_size"
import { ZodError, z } from "zod"
import { NOT_AUTHORIZED } from "../constants"
import { unauthorized } from "../helpers"

const updateSchema = z.object({
  code: z.string().min(1).max(15),
})

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  const sizes = await findMeterSizes()

  return NextResponse.json(sizes, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (user === undefined) {
      return unauthorized()
    }

    const body = await request.json()
    const params = updateSchema.parse(body)

    const size = await createSize(params)

    return NextResponse.json(size, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
