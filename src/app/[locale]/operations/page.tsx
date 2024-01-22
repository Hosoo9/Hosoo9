import RootPage from "@/components/operation/RootPage"
import { getCurrentUser } from "@/lib/session"
import { Button, Title } from "@mantine/core"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function OperationsPage() {
  const user = await getCurrentUser()

  const t = await getTranslations("OperationForm")

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  return (
    <div>
      <div className="flex justify-between items-center py-5 mb-3">
        <Title size="h2">{ t("operations") }</Title>

        <Button color="blue" component={Link} href="/operation/new">
          {t("new")}
        </Button>
      </div>
      {/* <Button component={Link} href="/operation/new"> */}
      {/*   {t("new")} */}
      {/* </Button> */}

      <RootPage />
    </div>
    // <Welcome users={users} />
  )
}
