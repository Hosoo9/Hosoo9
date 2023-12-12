import { z } from "zod"

const common = {
  id: z.string().max(20),
  name: z.string().max(50),
  nameKana: z.string().max(50),
  role: z.enum(["1", "2", "3"])
}

export const upsertUserSchema = z.object({ ...common })
