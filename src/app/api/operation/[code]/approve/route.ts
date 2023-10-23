import { unauthorized } from "@/app/api/helpers"
import { changeState, findOperation } from "@/contexts/operation"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from "zod"

const completeOperationSchema = z.object({})

export async function POST(
  request: NextRequest,
  { params }: { params: { code: string } },
) {
  try {
    const user = await getCurrentUser()

    if (
      user === undefined
      // (await enforce(user.id, "operation", "approve")) === false
    ) {
      return unauthorized()
    }

    const body = completeOperationSchema.parse(await request.json())

    const operation = await findOperation(params.code)

    if (operation?.status !== 2) {
      return NextResponse.json(
        { error: "Operation is not in pending approval state" },
        { status: 400 },
      )
    }

    const updated = await changeState(params.code, 3)

    return NextResponse.json(updated, { status: 200 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
