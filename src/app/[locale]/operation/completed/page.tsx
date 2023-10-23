import OperationList from "@/components/operation/OperationList"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function RequestedOperationsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  return (
    <>
      <OperationList statuses={[6]} className="py-5" />
    </>
  )
}
