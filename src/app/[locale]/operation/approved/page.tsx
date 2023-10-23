import OperationList from "@/components/operation/OperationList"
import { getCurrentUser } from "@/lib/session"
import { Title } from "@mantine/core"
import { redirect } from "next/navigation"

export default async function RequestedOperationsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  return (
    <>
      <div className="py-5">
        <Title order={3} size="h4" className="pb-3">
          Approved operations
        </Title>

        <OperationList statuses={[3, 5]} className="py-5" />
      </div>
    </>
  )
}
