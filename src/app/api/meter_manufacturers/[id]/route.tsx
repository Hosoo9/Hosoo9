import { deleteManufacturer, updateManufacturer } from "@/contexts/meter_manufacturer"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from "zod"
import { unauthorized } from "../../helpers"

const updateSchema = z.object({
  code: z.string().min(1).max(1),
  name: z.string().min(1).max(60),
})

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (user === undefined) {
      return unauthorized()
    }

    const body = await request.json()
    const input = updateSchema.parse(body)

    const manufacturer = await updateManufacturer(params.id, input)

    return NextResponse.json(manufacturer, { status: 200 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (user === undefined) {
      return unauthorized()
    }

    await deleteManufacturer(params.id)

    return NextResponse.json({}, { status: 200 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
