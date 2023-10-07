import config from "@/config"
import { getById } from "@/contexts/user"
import { sendEmail } from "@/lib/mailer"
import { renderTemplate } from "@/lib/template/renderer"
import { signJwt } from "@/utils/jwt"
import logger from "@/utils/logger"
import prisma from "@/utils/prisma"
import crypto from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from "zod"


const JWT_EXPIRE_TIME = 3600 // 1 hour

const schema = z.object({
  email: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const params = schema.parse(await request.json())

    const user = await getById(params.id.toLowerCase())
    const resetCode = crypto.randomBytes(20).toString("hex")

    if (user === null || user.email === null) {
      logger.info({ event: "auth.password.generate_code.user_doesnt_exist" })
      return NextResponse.json({}, { status: 400 })
    }

    const token = signJwt(
      { id: user.id, email: user.email, resetCode },
      {
        subject: "reset"
      }
    )

    const expires = new Date(Date.now() + JWT_EXPIRE_TIME * 1000)

    await prisma.resetCode.upsert({
      where: {
        email: user.email,
      },
      create: {
        email: user.email,
        expires,
        token,
      },
      update: {
        token,
        expires,
      }
    })

    if (user === null || user.password === null) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 })
    }

    await sendEmail({
      from: `${config.emailName} <${config.emailNoReply}>`,
      to: user.email,
      subject: `Password reset of ${config.platformName}`,
      html: renderTemplate("password_reset", {
        token,
        domain: config.appDomain,
        user,
        platformName: config.platformName
      })
    })

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
