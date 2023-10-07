import { unauthorized } from "@/app/api/helpers"
import { changeState, findOperation } from "@/contexts/operation"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"

export async function POST(
  request: NextRequest,
  { params }: { params: { code: string } },
) {
  try {
    const user = await getCurrentUser()

    if (user === undefined) {
      return unauthorized()
    }

    const operation = await findOperation(params.code)

    if (operation?.status !== 1) {
      return NextResponse.json(
        { error: "Operation is not in draft state" },
        { status: 400 },
      )
    }

    // requested for approval state
    const updated = await changeState(params.code, 2)

    return NextResponse.json(updated, { status: 200 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
