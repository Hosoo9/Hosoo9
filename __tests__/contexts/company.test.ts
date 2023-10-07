import { afterEach, beforeEach, expect, test, vi } from "vitest"
import { disconnect, reset } from "../setup-helpers"
import {
  GET as getCompany,
  PUT as createCompany,
} from "@/app/api/admin/company/route"
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

test("getCompany", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getBureauUserMock)

  await factories.companyFactory.create()

  const result = await getCompany(mockedRequest as any)

  const body = await result.json()

  expect(result.status).toBe(200)
  expect(body.length).toBe(1)
})

test("createCompany", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getBureauUserMock)

  mockedRequest.json.mockReturnValue({
    code: "1",
    name: "Company 1",
  })

  const result = await createCompany(mockedRequest as any)

  const body = await result.json()

  expect(result.status).toBe(200)
  expect(body.code).toBe("1")
})

