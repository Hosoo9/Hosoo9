import { z } from "zod"

const create = {
  customerNumber: z.string(),
  postalCode: z.string().nullable(),
  municipality: z.string().nullable(),
  address: z.string().nullable(),
  housingType: z.enum(["1", "2"]).nullable(),
  buildingNameRoomNumber: z.string().nullable(),
  name: z.string().nullable(),
  nameKana: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  phoneNumberType: z.enum(["1", "2", "3"]).nullable(),
  // mailAddress: z.string().nullable(),
}

const update = {
  ...create,
  // type: z.enum(["1", "2", "3", "4", "5"]).optional(),
  // applicationDate: z.coerce.date().optional(),
  // solicitingCompanyId: z.string().optional(),
  // gasType: z.enum(["1", "2"]),
  // customerNumber: z.string().optional(),
  // postalCode: z.string(),
  // municipality: z.string(),
  // address: z.string(),
  // housingType: z.enum(["1", "2"]),
  // buildingNameRoomNumber: z.string(),
  // name: z.string(),
  // nameKana: z.string().optional(),
  // phoneNumber: z.string(),
  // phoneNumberType: z.enum(["1", "2", "3"]),
  // mailAddress: z.string().optional(),
  // oneOrBulk: z.enum(["1", "2"]),
  // paymentType: z.coerce.number(),
  // desiredDate: z.coerce.date().optional(),
  // desiredTimeSlot: z.coerce.number().optional(),
  // memo: z.string().optional(),
  assignedWorkerId: z.string().nullable(),
  // scheduledDatetime: z.coerce.date().optional(),
  // amountExcludingTax: z.coerce.number().optional(),
  // amountConsumptionTax: z.coerce.number().optional(),
  // amountIncludingTax: z.coerce.number().optional(),
  // taxRate: z.coerce.number().optional(),
  // contractDate: z.coerce.date().optional(),
  // branchType: z.coerce.number().optional(),
  // supplyType: z.coerce.number().optional(),
  // buildingType: z.coerce.number().optional(),
  // facilityType: z.coerce.number().optional(),
  scheduledDate: z.coerce.date().nullable(),
  scheduledTime: z.string().nullable(),
  postcardStartDate: z.coerce.date().nullable(),
  postcardEndDate: z.coerce.date().nullable(),
  footprint: z.enum(["1", "2"]).nullable(),
  // postcardOutputTimestamp: z.coerce.date().nullable(),
  absenceNoticeDeliveryDate: z.coerce.date().nullable(),
  exchangingDate: z.coerce.date().nullable(),
  isSecurityWork: z.boolean().nullable(),
  changedNotificationFlag: z.boolean().nullable(),
  valveOpenFlag: z.boolean().nullable(),
  operationType: z.enum(["1", "2", "3", "4", "5"]).nullable(),
  removingMeterNumber: z.coerce.string().nullable(),
  removingMeterValue: z.coerce.number().nullable(),
  removingMeterInspectionDate: z.coerce.date().nullable(),
  removingMeterManufacturer: z.string().max(2).nullable(),
  removingMeterModel: z.string().max(2).nullable(),
  removingMeterSize: z.string().max(15).nullable(),
  removingMeterMaximumUsage: z.coerce.number().nullable(),
  referenceDate: z.coerce.date().nullable(),
  position: z.string().nullable(),
  beforeWorkInspectionType: z.enum(["1", "2", "3"]).nullable(),
  beforeWorkKpa: z.coerce.number().nullable(),
  beforeWorkResult: z.enum(["1", "2"]).nullable(),
  afterWorkInspectionType: z.enum(["1", "2", "3"]).nullable(),
  afterWorkKpa: z.coerce.number().nullable(),
  afterWorkResult: z.enum(["1", "2"]).nullable(),
  installingMeterNumber: z.coerce.string().nullable(),
  installingMeterValue: z.coerce.number().nullable(),
  installingMeterReferenceDate: z.coerce.date().nullable(),
  installingMeterManufacturer: z.string().max(2).nullable(),
  installingMeterModel: z.string().max(2).nullable(),
  installingMeterSize: z.string().max(15).nullable(),
  installingMeterMaximumUsage: z.coerce.number().nullable(),
  memo: z.string().nullable(),
  // meterImage: z.string().nullable(),
}

export const selectOperationSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  customerNumber: z.string().optional(),
  address: z.string().optional(),
  statuses: z.array(z.coerce.number()).optional(),
  isExpiredExchange: z.boolean().optional(),
  assignedWorkerId: z.string().optional(),
  createdAtFrom: z.coerce.date().optional(),
  createdAtTo: z.coerce.date().optional(),
  operationTypes: z.array(z.enum(["1", "2", "3", "4", "5"])).optional(),
  sort: z.string().optional().default("createdAt-desc"),
})

export const createOperationSchema = z.object(create)
export const updateOperationSchema = z.object(update)
