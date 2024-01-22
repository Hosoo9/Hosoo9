import { z } from "zod"

const common = {
  id: z.string().max(20),
  loginId: z.string().max(30),
  name: z.string().max(50),
  nameKana: z.string().max(50),
  role: z.enum(["1", "2", "3"]),
  technicianType: z.enum(["1", "2"]).nullable(),
  companyId: z.string().max(10).nullable(),
  phoneNumber: z.string().max(30).nullable(),
}

export const upsertUserSchema = z.object({ ...common })
