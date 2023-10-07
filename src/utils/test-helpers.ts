import prisma from "./prisma"

export const resetDb = async (
  { resetUsers }: { resetUsers: boolean } = { resetUsers: false },
) => {
  try {
    const statements = [
      prisma.contact.deleteMany(),
      prisma.installationAlarm.deleteMany(),
      prisma.operation.deleteMany(),
      prisma.company.deleteMany(),
      prisma.laborCost.deleteMany(),
      prisma.alarmInfo.deleteMany(),
      prisma.invite.deleteMany(),
      prisma.alarmInfo.deleteMany(),
      prisma.casbinRule.deleteMany()
    ]

    if (resetUsers) {
      statements.push(prisma.user.deleteMany())
    }

    await prisma.$transaction(statements)
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
