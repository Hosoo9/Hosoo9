import MeterModelManagament from "@/components/meter_model/MeterModelManagement";
import { protectPage } from "@/lib/session";

export default async function UserPage() {
  await protectPage()

  return (
    <MeterModelManagament />
  )
}
