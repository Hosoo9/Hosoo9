import { hashPassword } from "@/lib/pass"
import { getEnforcer } from "@/utils/prisma"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  if (process.env.SUPER_ADMIN_PASS !== undefined && process.env.NODE_ENV !== "test") {
    if ((await prisma.user.count()) === 0) {
      await prisma.user.create({
        data: {
          name: "manager",
          email: "manager@garudahashira.com",
          password: await hashPassword(process.env.SUPER_ADMIN_PASS),
          role: 1,
        },
      })
      await prisma.user.create({
        data: {
          name: "technician",
          email: "technician@garudahashira.com",
          password: await hashPassword(process.env.SUPER_ADMIN_PASS),
          role: 2,
        },
      }),
      await prisma.user.create({
        data: {
          name: "bureau",
          email: "bureau@garudahashira.com",
          password: await hashPassword(process.env.SUPER_ADMIN_PASS),
          role: 3,
        },
      })
    }

    const rules = [
      ["manager", "operation", "write"],
      ["manager", "operation", "read"],
      ["dep_admin", "operation", "manage"],
      ["technician", "operation", "read"],
      ["technician", "operation", "operate"],
      ["dep_admin", "operation", "write"],
      ["dep_admin", "operation", "read"],
      ["dep_admin", "operation", "approve"],
      ["dep_admin", "operation", "operate"],
      ["dep_admin", "operation", "manage"],
    ]

    const enforcer = await getEnforcer()
    enforcer.addPolicies(rules)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
