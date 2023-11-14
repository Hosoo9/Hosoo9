import { findById } from "@/contexts/user";
import { getCurrentUser } from "@/lib/session";
import { getEnforcer } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { unauthorized } from "../helpers";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return unauthorized()
  }

  const result = await findById(user.id)

  const enforcer = await getEnforcer()

  // const asdf = await enforcer.enforce(user.id, "operation", "write")
  const permissions = await enforcer.getImplicitPermissionsForUser(user.id)

  return NextResponse.json({ ...result, permissions }, { status: 200 })
}
