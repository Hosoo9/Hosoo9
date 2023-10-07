import { getUsers } from "@/contexts/user"
import { afterEach, beforeEach, expect, test } from "vitest"
import factories from "../factories"
import { disconnect, reset } from "../setup-helpers"

beforeEach(async () => {
  await reset()
})

afterEach(async () => {
  await disconnect()
})

test("home", async () => {
  await factories.userFactory.create()

  // const users = await getUsers()

})
