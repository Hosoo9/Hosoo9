import { getCompanies } from "@/contexts/company"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { unauthorized } from "../helpers"

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return unauthorized()
  }

  const companies = await getCompanies()

  return NextResponse.json(companies, { status: 200 })
}
