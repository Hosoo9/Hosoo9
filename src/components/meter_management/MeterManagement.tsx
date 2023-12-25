"use client"

import { Tabs } from "@mantine/core"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import MeterManufacturerManagament from "../meter_manufacturer/MeterManufacturerManagement"
import MeterModelManagament from "../meter_model/MeterModelManagement"
import MeterSizeManagement from "../meter_size/MeterSizeManagement"

export default function MeterManagement({}: {}) {
  const t = useTranslations("OperationForm")
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('draft');
  const searchParams = useSearchParams()

  useEffect(() => {
    // Update the activeTab state when router.query is updated
    if (searchParams.has('tab')) {
      setActiveTab(searchParams.get('tab') as string)
    } else {
      setActiveTab('meter_manufacturer')
    }
  }, [searchParams]);

  return (
    <Tabs 
      defaultValue="meter_manufacturer"
      value={activeTab}
      onChange={(value) => router.push(`?tab=${value}`)}
      keepMounted={false}
      className="mt-5"
    >
      <Tabs.List>
        <Tabs.Tab value="meter_manufacturer">{ t("meterManufacturerManagement") }</Tabs.Tab>
        <Tabs.Tab value="meter_model">{ t("meterModelManagement") }</Tabs.Tab>
        <Tabs.Tab value="meter_size">{ t("meterSizeManagement") }</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="meter_manufacturer">
        <MeterManufacturerManagament />
      </Tabs.Panel>

      <Tabs.Panel value="meter_model">
        <MeterModelManagament />
      </Tabs.Panel>
      <Tabs.Panel value="meter_size">
        <MeterSizeManagement />
      </Tabs.Panel>
    </Tabs>
  )
}
