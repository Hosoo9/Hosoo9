import { getRole } from "@/lib/enum/user-role"
import { defaultPassword, hashPassword } from "@/lib/pass"
import prisma from "@/utils/prisma"
import { PaginationParams } from "@/utils/types"
import { Prisma } from "@prisma/client"
import { User } from "@prisma/client"

export const maskUser = (user: User | null) => {
  if (user === null) {
    return null
  }

  return {
    ...user,
    password: undefined,
  }
}

export const resetPassword = async (id: string) => {
  return await prisma.user.update({
    where: { id },
    data: {
      password: await defaultPassword(),
    },
  })
}

export const upsertUser = async (
  id: string,
  input: Prisma.UserCreateInput,
) => {
  return prisma.user.upsert({
    where: { id },
    create: { ...input, password: await defaultPassword() },
    update: input
  })
}

export const findUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  return maskUser(user)
}

export const getAllUsers = async ({ role }: { role?: string }) => {
  const where = role ? { role: getRole(role) } : {}

  const users = await prisma.user.findMany({
    where,
  })

  return users.map((u) => maskUser(u))
}

export const getUsers = async ({ page, limit }: PaginationParams) => {
  const users = await prisma.user.findMany({ 
    skip: (page - 1) * limit,
    take: limit,
    orderBy : {
      createdAt: 'desc'
    }
  })

  return users
}

export const findById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export const findByLoginId = async (loginId: string) => {
  return await prisma.user.findUnique({
    where: {
      loginId,
    },
  })
}

type RegisterUserInput = {
  id: string
  loginId: string
  role: number
}

export const createUser = async (input: RegisterUserInput) => {
  return await prisma.user.create({
    data: {
      id: input.id,
      loginId: input.loginId,
      password: await defaultPassword(),
      role: input.role,
    },
  })
}

export const updatePassword = async (id: string, password: string) => {
  return await prisma.user.update({
    where: { id },
    data: {
      password: await hashPassword(password),
    },
  })
}
