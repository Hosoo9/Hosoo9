import { afterEach, beforeEach, test, vi, expect, describe } from "vitest"
import { disconnect, reset } from "../setup-helpers"
import { POST as createContact, GET as findContacts } from "@/app/api/contact/route"
import * as sessionLib from "@/lib/session"
import factories from "../factories"

vi.mock("@/lib/session")

const mockedRequest = { json: vi.fn(), nextUrl: { searchParams: new URLSearchParams() } }

const getCurrentUserMock = () =>
  Promise.resolve({ id: "1", role: 1, email: "technician@garudahashira.com" })

beforeEach(async () => {
  await reset()
})

afterEach(async () => {
  vi.resetAllMocks()
  vi.useRealTimers()
  await disconnect()
})

test("createContact", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getCurrentUserMock)

  const user = await factories.userFactory.create()
  const operation = await factories.operationFactory.create({ createdBy: user.id })

  mockedRequest.json.mockReturnValue({
    contactType: "1",
    details: "some details",
    operationId: operation.id,
    contactedAt: new Date().toISOString(),
  })

  const result = await createContact(mockedRequest as any)

  expect(result.status).toBe(201)

  const body = (await result.json())
  expect(body.details).toBe("some details")
  expect(body.createdBy).toBe("1")
})

describe("find contact", async () => {
  test("success", async () => {
    vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getCurrentUserMock)

    const user = await factories.userFactory.create()
    const operation = await factories.operationFactory.create({ createdBy: user.id })

    await factories.contactFactory.create({
      operationId: operation.id,
      createdBy: user.id
    })

    mockedRequest.nextUrl.searchParams.set("operationCode", operation.code.toString())

    const result = await findContacts(mockedRequest as any)

    expect(result.status).toBe(200)

    const body = await result.json()
    expect(body.length).toBe(1)
  })
})
