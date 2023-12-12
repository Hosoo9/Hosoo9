import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}

export const protectPage = async () => {

  const user = await getCurrentUser()

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  return user
}
