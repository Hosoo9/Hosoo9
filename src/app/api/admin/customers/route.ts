import { getCurrentUser } from "@/lib/session";
import { ROLE_BUREAU } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";
import { unauthorized } from "../../helpers";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined || user.role !== ROLE_BUREAU) {
    return unauthorized()
  }

  const customers: any[] = []
  // const customers = await prisma.customer.findMany();

  return NextResponse.json(customers, { status: 200 });
}
