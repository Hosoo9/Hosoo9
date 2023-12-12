import "./bigint"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter as CasbinPrismaAdapter } from "casbin-prisma-adapter"
import * as casbin from "casbin"

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma || prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


let adapter: CasbinPrismaAdapter | null = null
let enforcer: casbin.Enforcer | null = null

export const getCasbinAdapter = async () => {
  if (adapter === null) {
    return await CasbinPrismaAdapter.newAdapter()
  } else {
    return adapter
  }
}

export const getEnforcer = async () => {
  const adapter = await getCasbinAdapter()

  if (enforcer === null) {
    return await casbin.newEnforcer(`${process.env.ROOT}/casbin-policy.conf`, adapter)
  } else {
    return enforcer
  }
}

export const enforce = async (userId: string, operation: string, action: string) => {
  const enforcer = await getEnforcer()

  return enforcer.enforce(userId, operation, action)
}
