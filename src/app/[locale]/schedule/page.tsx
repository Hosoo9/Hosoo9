import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import Schedulling from "../../../components/test/Schedulling"

export default async function Home() {
  return (
    <main>
      <h1 className="font-bold">Users</h1>
      <Schedulling />
    </main>
  )
}
