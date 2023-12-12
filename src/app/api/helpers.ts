import { NextResponse } from "next/server"
import { NOT_AUTHORIZED, RECORD_NOT_FOUND } from "./constants"

export const unauthorized = () => {
  return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
}

export const recordNotFound = () => {
  return NextResponse.json({ error: RECORD_NOT_FOUND }, { status: 422 })
}
