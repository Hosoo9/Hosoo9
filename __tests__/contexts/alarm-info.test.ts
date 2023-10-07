import { afterEach, beforeEach, expect, test, vi } from "vitest"
import { disconnect, reset } from "../setup-helpers"
import {
  GET as getAlarmInfo,
  POST as createAlarmInfo,
} from "@/app/api/admin/alarm-info/route"
import { PUT as updateAlarmInfo } from "@/app/api/admin/alarm-info/[modelNumber]/route"
import * as sessionLib from "@/lib/session"
import factories from "../factories"

vi.mock("@/lib/session")

const mockedRequest = { json: vi.fn(), nextUrl: { searchParams: new URLSearchParams() } }

const getBureauUserMock = () =>
  Promise.resolve({ id: "2", role: 3, email: "bureau@garudahashira.com" })

beforeEach(async () => {
  await reset()
})

afterEach(async () => {
  await disconnect()
})

test("getAlarmInfo", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getBureauUserMock)

  await factories.alarmInfoFactory.create()

  const result = await getAlarmInfo(mockedRequest as any)

  const body = await result.json()

  expect(result.status).toBe(200)
  expect(body.length).toBe(1)
})

test("createAlarmInfo", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getBureauUserMock)

  mockedRequest.json.mockReturnValue({
    modelNumber: "mn1",
    price: 1234,
    alarmType: 2,
    systemCategoryCode: "scc1",
    systemCategoryName: "scn1",
    standard: "s1",
  })

  const result = await createAlarmInfo(mockedRequest as any)

  const body = await result.json()

  expect(result.status).toBe(200)
  expect(body.alarmType).toBe(2)
})

test("updateAlarmInfo", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getBureauUserMock)

  mockedRequest.json.mockReturnValue({
    price: 1234,
    alarmType: 2,
    systemCategoryCode: "scc1",
    systemCategoryName: "scn1",
    standard: "s1",
  })

  const alarmInfo = await factories.alarmInfoFactory.create()

  const result = await updateAlarmInfo(mockedRequest as any, {
    params: { modelNumber: alarmInfo.modelNumber },
  })

  const body = await result.json()

  expect(result.status).toBe(200)
  expect(body.standard).toBe("s1")
})
