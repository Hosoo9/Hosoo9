import MeterManagement from "@/components/meter_management/MeterManagement";
import { protectPage } from "@/lib/session";

export default async function UserPage() {
  await protectPage()

  return (
    <MeterManagement />
  )
}
