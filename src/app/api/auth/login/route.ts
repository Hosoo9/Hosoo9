import { findByLoginId, maskUser } from "@/contexts/user"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const schema = z.object({
  loginId: z.string(),
  password: z.string()
})

export async function POST(request: NextRequest) {
  const params = schema.parse(await request.json())

  const user = await findByLoginId(params.loginId)

  if (user === null) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 })
  }

  if (await bcrypt.compare(params.password, user.password)) {
    return NextResponse.json(maskUser(user), { status: 200 })
  } else {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 })
  }
}
