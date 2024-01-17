import { Prisma, PrismaClient } from "@prisma/client"

export type PaginationParams = {
  page: number
  limit: number
}

export type OptionalPaginationParams = {
  page?: number
  limit?: number
}

export type ContextOptions = {
  transaction?: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">
}
