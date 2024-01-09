"use client"

import { getListNameFromStatus } from "@/utils/operation/list-helper"
import { Button, Divider, Title } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/navigation"

export const OperationHeader = ({
  code,
  className,
  showContact,
  branchNumber,
}: {
  code: string
  showContact?: boolean
  className?: string
  branchNumber?: string
}) => {
  const t = useTranslations("OperationForm")

  const router = useRouter()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["operation", code],
    queryFn: async () => {
      const result = await fetch(`/api/operation/${code}`)
      return result.json()
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })


  return (
    <div className={className}>
      <div className="flex justify-between py-5 mt-3">
        <div>
          <Title order={3} size="h2">
            {code}
            {branchNumber ? ` • ${branchNumber} ` : ""}
          </Title>
          {data?.status && (
            <div className="text-sm">{getListNameFromStatus(data.status, data.isExpiredExchange)}</div>
          )}
        </div>

        <div className="flex gap-3">
          {showContact && (
            <Button
              component={Link}
              href={`/operation/${code}/contacts`}
              variant="outline"
            >
              { t("contacts") }
            </Button>
          )}

          <Button onClick={() => router.back()} variant="outline">
            { t("back") }
          </Button>
        </div>
      </div>
      <Divider size="md" className="py-5" />
    </div>
  )
}
