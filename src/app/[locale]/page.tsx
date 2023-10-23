import OperationList from "@/components/operation/OperationList"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@mantine/core"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()

  // const users = await prisma.user.findMany()

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  return (
    <div>
      <h2>Operation list</h2>
      <Button component={Link} href="/operation/new">
        New
      </Button>
      <OperationList statuses={[1]} className="py-5" />
    </div>
    // <Welcome users={users} />
  )
}
