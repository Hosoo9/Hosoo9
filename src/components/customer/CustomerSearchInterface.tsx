"use client"

import { useState } from "react"
import { CustomerSearch } from "./CustomerSearch"
import CustomerExternal from "./CustomerExternal"

export default function CustomerSearchInterface({}: {}) {
  const [customerInfo, setCustomerInfo] = useState<any>(null)

  return (
    <div>
      <CustomerSearch onSuccess={(data) => setCustomerInfo(data)} />

      {customerInfo && <CustomerExternal customer={customerInfo} isLoading={false} />}
    </div>
  )
}
