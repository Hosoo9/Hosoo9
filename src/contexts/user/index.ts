import { defaultPassword, hashPassword } from "@/lib/pass"
import prisma from "@/utils/prisma"
import { PaginationParams } from "@/utils/types"
import { User } from "@prisma/client"

const maskUser = (user: User | null) => {
  if (user === null) {
    return null
  }

  return {
    ...user,
    password: undefined,
  }
}

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  return maskUser(user)
}

export const getUsers = async ({ page, limit }: PaginationParams) => {
  const users = await prisma.user.findMany({ skip: (page - 1) * limit, take: limit })

  return users
}

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
}

type RegisterUserInput = {
  email: string
  role: number
}

export const createUser = async (input: RegisterUserInput) => {
  return await prisma.user.create({
    data: {
      email: input.email,
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
