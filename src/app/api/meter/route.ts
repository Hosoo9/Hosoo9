import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { findMeters } from "@/contexts/meter"
import { ZodError } from "zod"
import { NOT_AUTHORIZED } from "../constants"
import { unauthorized } from "../helpers"


export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  const meters = await findMeters()

  return NextResponse.json(meters, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (user === undefined) {
      return unauthorized()
    }

    return NextResponse.json({}, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
