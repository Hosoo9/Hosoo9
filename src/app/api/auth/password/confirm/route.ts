import { updatePassword } from "@/contexts/user"
import { verifyJwt } from "@/utils/jwt"
import logger from "@/utils/logger"
import prisma from "@/utils/prisma"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from "zod"


const JWT_EXPIRE_TIME = 3600 // 1 hour

const schema = z.object({
  token: z.string(),
  newPassword: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const params = schema.parse(await request.json())

    // if (checkPassStrength(req.body.newPassword) === false) {
    //   return res
    //     .status(400)
    //     .json({ errors: ["auth.sign_up.local.password_not_strong_enough"] })
    // }

    let decoded: any

    try {
      decoded = verifyJwt(params.token, { subject: "reset" })
    } catch (e) {
      if (e instanceof Error) {
        logger.warn(e.message)
        
        return NextResponse.json(null, { status: 401 })
      }
    }

    const resetCode = await prisma.resetCode.findFirst({ 
      where: { email: decoded.email },
    })

    if (resetCode === null) {
      logger.info({ event: "auth.password.reset_code.not_found" })
      return NextResponse.json(null, { status: 401 })
    }

    if (resetCode.token !== params.token) {
      logger.info({ event: "auth.password.reset_code.token_mismatch" })
      return NextResponse.json(null, { status: 401 })
    }

    if (resetCode.expires < new Date()) {
      logger.info({ event: "auth.password.reset_code.expired" })
      return NextResponse.json(null, { status: 401 })
    }

    await updatePassword(decoded.id, params.newPassword)

    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof ZodError) {
      console.log(e.issues)
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
