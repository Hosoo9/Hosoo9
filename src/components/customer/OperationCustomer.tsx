"use client"

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import CustomerExternal from "./CustomerExternal"

export default function OperationCustomer({ code }: { code: string }) {
  const [customerInfo, setCustomerInfo] = useState<any>(null)

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: [`customer-search`, code],
    queryFn: async () => {
      const result = await fetch(`/api/customer-search?operationCode=${code}`)

      if (result.status !== 200) {
        return null
      }

      return result.json()
    },
    cacheTime: 0,
    onSuccess: (data) => {
      if (data && data.length > 0) {
        setCustomerInfo(data[0])
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  return data ? (
    <CustomerExternal customer={customerInfo} isLoading={isLoading} />
  ) : (
    <div>Customer not found</div>
  )
}
