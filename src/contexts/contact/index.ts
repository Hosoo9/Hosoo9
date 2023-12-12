import prisma from "@/utils/prisma"
import { Prisma } from "@prisma/client"

export type ContactType = 1 | 2

type FindContactsInput = {
  operationCode: string,
}

export const createContact = async (input: Prisma.ContactUncheckedCreateInput) => {
  const contact = await prisma.contact.create({
    data: { ...input },
  })

  return contact
}

// export const updateContact = async (code: string, input: UpdateContactInput) => {
//   const contact = await prisma.contact.update({ where: { code }, data: input })

//   return contact
// }

export const findContacts = async ({
  operationCode
}: FindContactsInput) => {
  return await prisma.contact.findMany({
    where: {
      operation: {
        code: operationCode
      }
    },
    include: {
      operation: true
    },
  })
}
