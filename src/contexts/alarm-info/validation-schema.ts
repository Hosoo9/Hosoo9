import { z } from "zod"

const common = {
  price: z.number().nullable(),
  alarmType: z.number().int().default(1),
  systemCategoryCode: z.string().max(5),
  systemCategoryName: z.string().max(50),
  standard: z.string().max(50),
}

export const updateAlarmInfoSchema = z.object(common)
export const createAlarmInfoSchema = z.object({ ...common, modelNumber: z.string() })
