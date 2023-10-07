import { NextResponse } from "next/server"
import { NOT_AUTHORIZED } from "./constants"

export const unauthorized = () => {
  return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
}
