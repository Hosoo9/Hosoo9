import OperationList from "@/components/operation/OperationList"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()

  // const users = await prisma.user.findMany()

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  return (
    <OperationList />
    // <Welcome users={users} />
  )
}
