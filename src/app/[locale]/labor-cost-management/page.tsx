"use client"

import { Title } from "@mantine/core"
import { useTranslations } from "next-intl"

export default function CostCalculatorPage({}: {}) {
  const t = useTranslations("OperationForm")

  return (
    <div>
      <Title className="my-5" size="h2">労務費単価管理</Title>
    </div>
  )
}
