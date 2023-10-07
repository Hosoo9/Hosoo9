import { afterEach, beforeEach, test, vi, expect, describe } from "vitest"
import { disconnect, reset } from "../setup-helpers"
import { POST as createOperation, GET as findOperations } from "@/app/api/operation/route"
import {
  PUT as updateOperation,
  GET as findOperation,
} from "@/app/api/operation/[code]/route"
import { POST as requestOperation } from "@/app/api/operation/[code]/request/route"
import { POST as approveOperation } from "@/app/api/operation/[code]/approve/route"
import { POST as rejectOperation } from "@/app/api/operation/[code]/reject/route"
import { POST as completeOperation } from "@/app/api/operation/[code]/complete/route"
import * as sessionLib from "@/lib/session"
import factories from "../factories"
import prisma from "@/utils/prisma"

vi.mock("@/lib/session")

const mockedRequest = {
  json: vi.fn(),
  formData: vi.fn(),
  nextUrl: { searchParams: new URLSearchParams() },
}

const getCurrentUserMock = () =>
  Promise.resolve({ id: "1", role: 1, email: "technician@garudahashira.com" })

const getBureauUserMock = () =>
  Promise.resolve({ id: "2", role: 3, email: "bureau@garudahashira.com" })

beforeEach(async () => {
  await reset()
})

afterEach(async () => {
  vi.resetAllMocks()
  vi.useRealTimers()
  await disconnect()
})

test("createOperation", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getCurrentUserMock)

  const alarmInfo = await factories.alarmInfoFactory.create()
  const alarmInfo2 = await factories.alarmInfoFactory.create()

  mockedRequest.json.mockReturnValue({
    type: "1",
    applicationDate: new Date().toISOString(),
    gasType: "1",
    postalCode: "1234567",
    municipality: "Tokyo city",
    address: "Tokyo street",
    housingType: "1",
    buildingNameRoomNumber: "Tokyo building",
    name: "Tokyo name",
    phoneNumber: "123456789",
    phoneNumberType: "1",
    oneOrBulk: "1",
    paymentType: "1",
    contractDate: new Date().toISOString(),
    installationAlarms: [
      {
        modelNumber: alarmInfo.modelNumber,
      },
      {
        modelNumber: alarmInfo.modelNumber,
      },
    ],
  })

  const result = await createOperation(mockedRequest as any)

  const alarmCount = await prisma.installationAlarm.count()

  const installations = await prisma.installationAlarm.findMany()

  expect(result.status).toBe(201)
  expect(alarmCount).toBe(2)
  expect(installations[0].branchNumber).toBe("001")
  expect(installations[1].branchNumber).toBe("002")
})

test("updateOperation", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getCurrentUserMock)

  const user = await factories.userFactory.create()
  const operation = await factories.operationFactory.create({ createdBy: user.id })

  mockedRequest.json.mockReturnValue({
    type: "1",
    applicationDate: new Date().toISOString(),
    // createdBy: string
    gasType: "1",
    postalCode: "1234567",
    municipality: "Tokyo city",
    address: "Tokyo street",
    housingType: "1",
    buildingNameRoomNumber: "Tokyo building",
    name: "Tokyo name",
    phoneNumber: "99",
    phoneNumberType: "1",
    oneOrBulk: "1",
    paymentType: "1",
    contractDate: new Date().toISOString(),
  })

  const result = await updateOperation(mockedRequest as any, {
    params: { code: operation.code },
  })

  expect(result.status).toBe(200)
  expect((await result.json()).phoneNumber).toBe("99")
})

test("requestOperation", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getCurrentUserMock)

  const user = await factories.userFactory.create()
  const operation = await factories.operationFactory.create({ createdBy: user.id })

  mockedRequest.json.mockReturnValue({
    code: operation.code,
  })

  const result = await requestOperation(mockedRequest as any, {
    params: { code: operation.code },
  })

  expect(result.status).toBe(200)
  expect((await result.json()).status).toBe(2)
})

test("approveOperation", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getBureauUserMock)

  const user = await factories.userFactory.create()
  const operation = await factories.operationFactory.create({
    createdBy: user.id,
    status: 2,
  })

  mockedRequest.json.mockReturnValue({
    code: operation.code,
  })

  const result = await approveOperation(mockedRequest as any, {
    params: { code: operation.code },
  })

  expect(result.status).toBe(200)
  expect((await result.json()).status).toBe(3)
})

test("rejectOperation", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getBureauUserMock)

  const user = await factories.userFactory.create()
  const operation = await factories.operationFactory.create({
    createdBy: user.id,
    status: 2,
  })

  mockedRequest.json.mockReturnValue({
    code: operation.code,
  })

  const result = await rejectOperation(mockedRequest as any, {
    params: { code: operation.code },
  })

  expect(result.status).toBe(200)
  expect((await result.json()).status).toBe(4)
})

test("completeOperation", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getBureauUserMock)

  const user = await factories.userFactory.create()
  const operation = await factories.operationFactory.create({
    createdBy: user.id,
    status: 5,
  })

  const formData = new FormData()
  const signature = new Blob([""], { type: "image/png" })

  formData.set("contractDate", new Date().toISOString())
  formData.set("branchType", "1")
  formData.set("supplyType", "1")
  formData.set("buildingType", "1")
  formData.set("facilityType", "1")
  formData.set("signature", signature)

  mockedRequest.formData.mockReturnValue(Promise.resolve(formData))

  const result = await completeOperation(mockedRequest as any, {
    params: { code: operation.code },
  })

  expect(result.status).toBe(200)
  expect((await result.json()).status).toBe(6)
})

test("find single operation", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getCurrentUserMock)

  const user = await factories.userFactory.create()
  const operation = await factories.operationFactory.create({
    createdBy: user.id,
    address: "my address",
  })

  const result = await findOperation(mockedRequest as any, {
    params: { code: operation.code },
  })

  expect(result.status).toBe(200)
  expect((await result.json()).address).toBe("my address")
})

describe("find operation", async () => {
  beforeEach(async () => {
    vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getCurrentUserMock)

    const user = await factories.userFactory.create()
    const operation = await factories.operationFactory.create({
      createdBy: user.id,
      address: "some address",
      desiredDate: new Date("2023-05-02"),
    })
  })

  test("find operations", async () => {
    mockedRequest.nextUrl.searchParams.set("page", "1")
    mockedRequest.nextUrl.searchParams.set("limit", "10")

    const result = await findOperations(mockedRequest as any)

    expect(result.status).toBe(200)
    const body = await result.json()

    expect(body.length).toBe(1)
  })

  test("address filter", async () => {
    mockedRequest.nextUrl.searchParams.set("address", "some")

    const result = await findOperations(mockedRequest as any)

    expect(result.status).toBe(200)
    const body = await result.json()

    expect(body.length).toBe(1)
  })

  test("status filter", async () => {
    mockedRequest.nextUrl.searchParams.set("status", "1")

    const result = await findOperations(mockedRequest as any)

    expect(result.status).toBe(200)
    const body = await result.json()

    expect(body.length).toBe(1)
  })

  test("desiredDate filter", async () => {
    mockedRequest.nextUrl.searchParams.set("desiredDate", "2023-05-02")

    const result = await findOperations(mockedRequest as any)

    expect(result.status).toBe(200)
    const body = await result.json()

    expect(body.length).toBe(1)
  })
})
