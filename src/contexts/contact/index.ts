import prisma from "@/utils/prisma"

export type ContactType = 1 | 2

type CommonContactInput = {
  contactType: 1 | 2,
  detail?: string,
  operationId: number,
  contactedAt: Date,
  createdBy: string,
}

type CreateContactInput = CommonContactInput & {}

type FindContactsInput = {
  operationCode: string,
}

export const createContact = async (input: CreateContactInput) => {
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
