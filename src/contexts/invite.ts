import config from "@/config"
import { sendEmail } from "@/lib/mailer"
import { hashPassword } from "@/lib/pass"
import { renderTemplate } from "@/lib/template/renderer"
import { signJwt } from "@/utils/jwt"
import logger from "@/utils/logger"
import prisma from "@/utils/prisma"
import { Prisma } from "@prisma/client"
import crypto from "crypto"

type CreateInviteInput = {
  email: string
  role: number
  companyCode?: string
}

export const getInvites = async () => {
  return prisma.invite.findMany()
}

export const createInvite = async ({ email, role, companyCode }: CreateInviteInput) => {
  try {
    const code = crypto.randomBytes(20).toString("hex")

    const invitation = await prisma.invite.create({
      data: {
        email,
        code,
        companyCode,
        role,
      },
    })

    const token = signJwt(
      { id: invitation.id, email, code },
      {
        subject: "invitation",
      },
    )

    await sendEmail({
      from: `${config.emailName} <${config.emailNoReply}>`,
      to: email,
      subject: `${config.platformName} invitation`,
      html: renderTemplate("./invitation", {
        token,
        appDomain: config.appDomain,
        platformName: config.platformName,
        role,
      }),
    })

    return invitation
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        logger.warn({ event: "invitation-already-exists", data: { email, role } })
        return null
      }
    }

    throw e
  }
}

export const acceptInvite = async (id: string, password: string) => {
  const invitation = await prisma.invite.findUnique({
    where: {
      id,
    },
  })

  if (invitation === null) {
    return null
  }

  // PENDING
  if (invitation.status !== 1) {
    logger.warn({ event: "invitation-not-pending", data: { id } })
    return null
  }

  const updateInvite = prisma.invite.update({
    where: {
      id,
    },
    data: {
      status: 2, // ACCEPTED
    },
  })

  const registerUser = prisma.user.create({
    data: {
      email: invitation.email,
      password: await hashPassword(password),
      role: invitation.role,
      emailVerified: new Date()
    }
  })

  const [updatedInvitation, user] = await prisma.$transaction([
    updateInvite,
    registerUser,
  ])

  return updatedInvitation
}
