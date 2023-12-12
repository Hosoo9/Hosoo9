import UserManagement from "@/components/user/UserManagement";
import { protectPage } from "@/lib/session";

export default async function UserPage() {
  await protectPage()

  return (
    <UserManagement />
  )
}
