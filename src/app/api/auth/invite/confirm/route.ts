import { acceptInvite } from "@/contexts/invite"
import { verifyJwt } from "@/utils/jwt"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const confirmSchema = z.object({
  token: z.string(),
  password: z.string()
})

export async function POST(request: NextRequest) {
  const params = confirmSchema.parse(await request.json())

  const decoded: any = verifyJwt(params.token, {})

  const invite = await acceptInvite(decoded.id, params.password)

  return NextResponse.json(invite, { status: 200 })
}
