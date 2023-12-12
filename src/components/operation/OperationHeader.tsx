"use client"

import { Button, Divider, Title } from "@mantine/core"
import { useTranslations } from "next-intl"
import Link from "next/link"

export const OperationHeader = ({
  code,
  className,
  showBack,
  branchNumber,
}: {
  code: string
  className?: string
  showBack?: boolean
  branchNumber?: string
}) => {
  const t = useTranslations("OperationForm")

  return (
    <div className={className}>
      <div className="flex justify-between py-5 mt-3">
        <Title order={3} size="h2" className="pb-3">
          {code}{ branchNumber ? ` • ${branchNumber}` : ""}
        </Title>

        <div>
          {showBack === true ? (
            <Button component={Link} href={`/operation/${code}`} variant="outline">
              { t("back") }
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                href={`/operation/${code}/contacts`}
                variant="outline"
              >
                { t("contacts") }
              </Button>
            </>
          )}
        </div>
      </div>
      <Divider size="md" className="py-5" />
    </div>
  )
}
