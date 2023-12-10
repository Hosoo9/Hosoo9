import { protectPage } from "@/lib/session";
import MeterSizeManagement from "@/components/meter_size/MeterSizeManagement";

export default async function Page() {
  await protectPage()

  return (
    <MeterSizeManagement />
  )
}
