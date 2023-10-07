import { GET as getInvites, POST as createInvite } from "@/app/api/auth/invite/route"
import * as sessionLib from "@/lib/session"
import { afterEach, beforeEach, expect, test, vi } from "vitest"
import factories from "../factories"
import { disconnect, reset } from "../setup-helpers"
import { acceptInvite } from "@/contexts/invite"

vi.mock("@/lib/session")

const mockedRequest = { json: vi.fn(), nextUrl: { searchParams: new URLSearchParams() } }

const getCurrentUserMock = () =>
  Promise.resolve({ id: "1", role: 3, email: "bureau@garudahashira.com" })


beforeEach(async () => {
  await reset()
})

afterEach(async () => {
  vi.resetAllMocks()
  vi.useRealTimers()
  await disconnect()
})

test("get all invites", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getCurrentUserMock)

  await factories.inviteFactory.create()

  const response = await getInvites(mockedRequest as any)
  const body = await response.json()

  expect(body).toHaveLength(1)
})

test("createInvite", async () => {
  mockedRequest.json.mockReturnValue({
    email: "test@mail.com"
  })

  const result = await createInvite(mockedRequest as any)

  const body = await result.json()

  expect(body?.id).toBeDefined();
  expect(body?.status).toBe(1)
})

test("acceptInvite", async () => {
  const invite = await factories.inviteFactory.create()

  const result = await acceptInvite(invite.id, "some-password")

  expect(result?.id).toBeDefined();
  expect(result?.status).toBe(2)
})
