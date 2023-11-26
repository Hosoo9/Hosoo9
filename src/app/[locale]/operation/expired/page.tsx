import OperationList from "@/components/operation/OperationList"
import { getCurrentUser } from "@/lib/session"
import { Title } from "@mantine/core"
import { redirect } from "next/navigation"

export default async function ExpiredOperationsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  return (
    <>
      <div className="py-5">
        <Title order={3} size="h4" className="pb-3">
          Expired operations
        </Title>

        <OperationList statuses={[1]} className="py-5" isExpired={true} />
      </div>
    </>
  )
}
