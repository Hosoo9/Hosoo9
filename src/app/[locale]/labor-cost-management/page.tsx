"use client"

import AdditionalLaborRateTable from "@/components/labor-cost/AdditionalLaborRateTable"
import BasicLaborRateTable from "@/components/labor-cost/BasicLaborRateTable"
import { Tabs, Title } from "@mantine/core"
import { useTranslations } from "next-intl"

export default function CostCalculatorPage({}: {}) {
  const t = useTranslations("OperationForm")

  return (
    <div>
      <Title className="my-5" size="h2">
        労務費単価管理
      </Title>

      <Tabs defaultValue="basic-labor-rate" keepMounted={false}>
        <Tabs.List>
          <Tabs.Tab value="basic-labor-rate">
            基本単価テーブル
          </Tabs.Tab>
          <Tabs.Tab value="additional-labor-rate">
            追加作業単価テーブル
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="basic-labor-rate">
          <BasicLaborRateTable />
        </Tabs.Panel>

        <Tabs.Panel value="additional-labor-rate">
          <AdditionalLaborRateTable />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
