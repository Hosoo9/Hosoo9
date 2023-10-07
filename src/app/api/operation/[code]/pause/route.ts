import { unauthorized } from "@/app/api/helpers"
import { changeState, findOperation } from "@/contexts/operation"
import { getCurrentUser } from "@/lib/session"
import { enforce } from "@/utils/prisma"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"

export async function POST(
  request: NextRequest,
  { params }: { params: { code: string } },
) {
  try {
    const user = await getCurrentUser()

    if (
      user === undefined ||
      (await enforce(user.id, "operation", "operate")) === false
    ) {
      return unauthorized()
    }

    const operation = await findOperation(params.code)

    if (operation?.status !== 3) {
      return NextResponse.json(
        { error: "Operation is not in approved state" },
        { status: 400 },
      )
    }

    const updated = await changeState(params.code, 5)

    return NextResponse.json(updated, { status: 200 })
  } catch (e) {
    if (e instanceof ZodError) {
      console.log(e.issues)
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
