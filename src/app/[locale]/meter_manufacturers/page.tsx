import MeterManufacturerManagament from "@/components/meter_manufacturer/MeterManufacturerManagement";
import { protectPage } from "@/lib/session";

export default async function UserPage() {
  await protectPage()

  return (
    <MeterManufacturerManagament />
  )
}
