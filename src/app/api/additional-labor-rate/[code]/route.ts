import { upsertAdditionalLaborRate, deleteAdditionalLaborRate } from "@/contexts/additional-labor-rate"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from "zod"
import { unauthorized } from "../../helpers"

const updateSchema = z.object({
  code: z.string(),
  operationType: z.coerce.number(),
  workingTime: z.coerce.number().nullable(),
  workerType: z.coerce.number().nullable(),
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

    const result = await upsertAdditionalLaborRate(params.code, input)

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

    await deleteAdditionalLaborRate(params.code)

    return NextResponse.json({}, { status: 200 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
