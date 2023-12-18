import CustomerSearchInterface from "@/components/customer/CustomerSearchInterface";
import { protectPage } from "@/lib/session";

export default async function CustomerSearchPage() {
  await protectPage()

  return (
    <div>
      <CustomerSearchInterface />
    </div>
  )
}
