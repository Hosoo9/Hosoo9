import { getCurrentUser } from "@/lib/session"
import prisma from "@/utils/prisma"
import { redirect } from "next/navigation"
import Welcome from "../../components/Welcome"

export default async function Home() {
  const user = await getCurrentUser()

  const users = await prisma.user.findMany()

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  return (
    <>
      <Welcome users={users} />
    </>
  )
}
