
import { z } from "zod"

const common = {
  type: z.enum(["1", "2", "3", "4", "5"]),
  applicationDate: z.coerce.date(),
  // createdBy: string
  solicitingCompanyId: z.string().optional(),
  gasType: z.enum(["1", "2"]),
  customerNumber: z.string().optional(),
  postalCode: z.string(),
  municipality: z.string(),
  address: z.string(),
  housingType: z.enum(["1", "2"]),
  buildingNameRoomNumber: z.string(),
  name: z.string(),
  nameKana: z.string().optional(),
  phoneNumber: z.string(),
  phoneNumberType: z.enum(["1", "2", "3"]),
  mailAddress: z.string().optional(),
  oneOrBulk: z.enum(["1", "2"]),
  paymentType: z.coerce.number(),
  desiredDate: z.coerce.date().optional(),
  desiredTimeSlot: z.coerce.number().optional(),
  memo: z.string().optional(),
  assignedWorkerId: z.string().optional(),
  scheduledDatetime: z.coerce.date().optional(),
  amountExcludingTax: z.coerce.number().optional(),
  amountConsumptionTax: z.coerce.number().optional(),
  amountIncludingTax: z.coerce.number().optional(),
  taxRate: z.coerce.number().optional(),
  contractDate: z.coerce.date(),
  branchType: z.coerce.number().optional(),
  supplyType: z.coerce.number().optional(),
  buildingType: z.coerce.number().optional(),
  facilityType: z.coerce.number().optional(),
}

export const createOperationSchema = z.object(common)
export const updateOperationSchema = z.object(common)
