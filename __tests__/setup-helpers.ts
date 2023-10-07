import prisma from "@/utils/prisma"
import { resetDb } from "@/utils/test-helpers"

// export default async () => {
//   await prisma.$transaction([
//     prisma.tag.deleteMany(),
//     prisma.quote.deleteMany(),
//     prisma.user.deleteMany()
//   ])
// }

export const reset = async () => {
  try {
    await resetDb({ resetUsers: true })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  } finally {
    await prisma.$disconnect()
  }
}

export const disconnect = async () => {
  await prisma.$disconnect()
}
