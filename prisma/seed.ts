import { hashPassword } from "@/lib/pass"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  if (process.env.SUPER_ADMIN_PASS !== undefined) {
    if ((await prisma.user.count()) === 0) {
      await prisma.user.create({
        data: {
          id: "manager",
          name: "manager",
          password: await hashPassword(process.env.SUPER_ADMIN_PASS),
          role: 1,
        },
      })
      await prisma.user.create({
        data: {
          id: "technician",
          name: "technician",
          password: await hashPassword(process.env.SUPER_ADMIN_PASS),
          role: 2,
        },
      }),
      await prisma.user.create({
        data: {
          id: "bureau",
          name: "bureau",
          password: await hashPassword(process.env.SUPER_ADMIN_PASS),
          role: 3,
        },
      })
    }
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
