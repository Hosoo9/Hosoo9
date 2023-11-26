import { z } from "zod"

const common = {
  contactType: z.enum(["1", "2"]),
  operationCode: z.coerce.string(),
  details: z.string().optional(),
  contactedBy: z.string(),
  contactedAt: z.coerce.date(),
}

export const createContactSchema = z.object(common)
export const updateContactSchema = z.object(common)
