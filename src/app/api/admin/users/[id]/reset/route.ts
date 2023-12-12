import { unauthorized } from "@/app/api/helpers"
import { resetPassword } from "@/contexts/user"
import { getCurrentUser } from "@/lib/session"
import { ROLE_BUREAU } from "@/utils/constants"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await getCurrentUser()

  if (user === undefined && user !== ROLE_BUREAU) {
    return unauthorized()
  }

  const result = await resetPassword(params.id)

  return NextResponse.json(result, { status: 200 })
}
