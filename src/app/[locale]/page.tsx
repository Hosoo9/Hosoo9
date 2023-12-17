import DraftOperationList from "@/components/operation/lists/DraftOperationList"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@mantine/core"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()

  const t = await getTranslations("OperationForm")

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  return (
    <div>
      <h2>{ t("operations") }</h2>
      <Button component={Link} href="/operation/new">
        {t("new")}
      </Button>

      <DraftOperationList />
    </div>
    // <Welcome users={users} />
  )
}
