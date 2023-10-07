import { z } from "zod"

const common = {
  contactType: z.enum(["1", "2"]),
  details: z.string().optional(),
  operationId: z.coerce.number(),
  contactedAt: z.coerce.date(),
}

export const createContactSchema = z.object(common)
export const updateContactSchema = z.object(common)
