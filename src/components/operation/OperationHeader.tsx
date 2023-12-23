"use client"

import { Button, Divider, Title } from "@mantine/core"
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

  return (
    <div className={className}>
      <div className="flex justify-between py-5 mt-3">
        <Title order={3} size="h2" className="pb-3">
          {code}{ branchNumber ? ` • ${branchNumber}` : ""}
        </Title>

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
