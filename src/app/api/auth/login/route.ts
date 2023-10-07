import { getUserByEmail } from "@/contexts/user"
import { hashPassword } from "@/lib/pass"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcrypt"


const schema = z.object({
  email: z.string(),
  password: z.string()
})

export async function POST(request: NextRequest) {
  const params = schema.parse(await request.json())

  const user = await getUserByEmail(params.email.toLowerCase())

  if (user === null || user.password === null) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 })
  }

  if (await bcrypt.compare(params.password, user.password)) {
    return NextResponse.json(user, { status: 200 })
  } else {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 })
  }
}
