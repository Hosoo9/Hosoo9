import { getCompanies } from "@/contexts/company"
import { getCurrentUser } from "@/lib/session"
import { ROLE_BUREAU } from "@/utils/constants"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { unauthorized } from "../../helpers"

// const schema = z.object({
//   page: z.coerce.number().default(1),
//   limit: z.coerce.number().default(10),
// })

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined || user.role !== ROLE_BUREAU) {
    return unauthorized()
  }

  // const params = schema.parse(Object.fromEntries(request.nextUrl.searchParams))

  const companies = await getCompanies()

  return NextResponse.json(companies, { status: 200 })
}

const createSchema = z.object({
  code: z.string(),
  name: z.string(),
})

export async function PUT(request: Request) {
  const user = await getCurrentUser()

  if (user === undefined || user.role !== ROLE_BUREAU) {
    return unauthorized()
  }

  // check if the request body is valid
  const body = await request.json()
  const params = createSchema.parse(body)
 
  // return NextResponse.json(await upsertCompany(params))
  return NextResponse.json(null)
}
