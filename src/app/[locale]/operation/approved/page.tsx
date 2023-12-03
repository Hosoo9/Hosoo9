import OperationList from "@/components/operation/OperationList"
import { getCurrentUser } from "@/lib/session"
import { Title } from "@mantine/core"
import { getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"

export default async function ApprovedOperationsPage() {
  const user = await getCurrentUser()
  const t = await getTranslations("OperationForm")

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  return (
    <>
      <div className="py-5">
        <Title order={3} size="h4" className="pb-3">
          { `${t("approved")}${t("operations")}` }
        </Title>

        <OperationList statuses={[3, 5]} className="py-5" />
      </div>
    </>
  )
}
