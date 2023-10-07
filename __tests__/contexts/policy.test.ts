import * as sessionLib from "@/lib/session"
import casbin from 'casbin'
import { PrismaAdapter } from "casbin-prisma-adapter"
import { afterEach, beforeEach, expect, test, vi } from "vitest"
import { disconnect, reset } from "../setup-helpers"

vi.mock("@/lib/session")

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

test("addPolicy", async () => {
  vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getCurrentUserMock)

  const adapter = await PrismaAdapter.newAdapter()
  const e = await casbin.newEnforcer('src/rbac_with_deny_model.conf', adapter)

  await e.addPolicy('dep_admin', 'operation', 'write')
  await e.addPolicy('dep_member', 'operation', 'read')
  await e.addGroupingPolicy('alice', 'dep_admin')
  await e.addGroupingPolicy('bob', 'dep_member')

  expect(await e.enforce('alice', 'operation', 'write')).toBe(true)

  await e.addPolicy('alice', 'operation', 'write', 'deny')
  expect(await e.enforce('alice', 'operation', 'write')).toBe(false)

  console.log(`-------------e.getGroupingPolicy()---------------`)
  // console.log(await e.getAllObjects())
  // console.log(await e.getGroupingPolicy())
  console.log(await e.getPolicy())
  console.log(`----------------------------`)
})
