import { getCurrentUser } from "@/lib/session"
import { getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()

  const t = await getTranslations("OperationForm")

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  redirect("/customer-search")

  // return (
  //   <div>
  //     <h2>{ t("operations") }</h2>
  //     {/* <Button component={Link} href="/operation/new"> */}
  //     {/*   {t("new")} */}
  //     {/* </Button> */}

  //     <RootPage />
  //   </div>
  //   // <Welcome users={users} />
  // )
}
