import { upsertBasicLaborRate, deleteBasicLaborRate } from "@/contexts/basic-labor-rate"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from "zod"
import { unauthorized } from "../../helpers"

const updateSchema = z.object({
  code: z.string(),
  operationType: z.coerce.number(),
  meterType: z.coerce.number().nullable(),
  exchangeType: z.coerce.number().nullable(),
  workingTime: z.coerce.number().nullable(),
  meterSizeType: z.coerce.number().nullable(),
  districtType: z.coerce.number().nullable(),
  rate: z.coerce.number(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: { code: string } },
) {
  try {
    const user = await getCurrentUser()

    if (user === undefined) {
      return unauthorized()
    }

    const body = await request.json()
    const input = updateSchema.parse(body)

    const result = await upsertBasicLaborRate(params.code, input)

    return NextResponse.json(result, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { code: string } }) {
  try {
    const user = await getCurrentUser()

    if (user === undefined) {
      return unauthorized()
    }

    await deleteBasicLaborRate(params.code)

    return NextResponse.json({}, { status: 200 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
