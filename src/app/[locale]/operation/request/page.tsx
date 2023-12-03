import OperationList from "@/components/operation/OperationList"
import { getCurrentUser } from "@/lib/session"
import { Title } from "@mantine/core"
import { getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"

export default async function RequestedOperationsPage() {
  const user = await getCurrentUser()
  const t = await getTranslations("OperationForm")

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  return (
    <>
      <div className="py-5">
        <Title order={3} size="h4" className="pb-3">
          { `${t("requested")}${t("operations")}` }
        </Title>
        <OperationList statuses={[2]} className="py-5" />
      </div>

      <div className="py-5 mt-5">
        <Title order={3} size="h4" className="pb-3">
          { `${t("rejected")}${t("operations")}` }
        </Title>
        <OperationList statuses={[4]} className="py-5" />
      </div>
    </>
  )
}
