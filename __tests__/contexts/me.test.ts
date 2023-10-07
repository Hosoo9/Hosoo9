import { GET as getMe } from "@/app/api/me/route"
import * as sessionLib from "@/lib/session"
import { getCasbinAdapter } from "@/utils/prisma"
import casbin from 'casbin'
import { afterEach, beforeEach, expect, test, vi } from "vitest"
import factories from "../factories"
import { disconnect, reset } from "../setup-helpers"

vi.mock("@/lib/session")

const mockedRequest = { json: vi.fn(), nextUrl: { searchParams: new URLSearchParams() } }

const getBureauUserMock = () =>
  Promise.resolve({ id: "2", role: 3, email: "bureau@garudahashira.com" })

let user: any

beforeEach(async () => {
  await reset()
  user = await factories.userFactory.create({
    id: "2",
    role: 3,
    email: "bureau@garudahashira.com",
  })
})

afterEach(async () => {
  await disconnect()
})

test("get me", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getBureauUserMock)

  await factories.companyFactory.create()

  const adapter = await getCasbinAdapter()
  const e = await casbin.newEnforcer('src/rbac_with_deny_model.conf', adapter)
  await e.addPolicy('dep_admin', 'operation', 'write')
  await e.addGroupingPolicy(user.id, 'dep_admin')
  await e.enforce(user.id, 'operation', 'write')

  const result = await getMe(mockedRequest as any)
  const body = await result.json()

  expect(result.status).toBe(200)
  expect(body.name).toBe(user.name)
  expect(body.permissions[0][0]).toBe('dep_admin')
})
