"use client"

import ApprovedOperationList from "@/components/operation/lists/ApprovedOperationList"
import DraftOperationList from "@/components/operation/lists/DraftOperationList"
import ExpiredOperationList from "@/components/operation/lists/ExpiredOperationList"
import RequestedOperationList from "@/components/operation/lists/RequestedOperationList"
import { Tabs } from "@mantine/core"
import { useTranslations } from "next-intl"
import OperationList from "./OperationList"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import RejectedOperationList from "./lists/RejectedOperationList"

const DEFAULT_TAB = "expired"

export default function RootPage({}: {}) {
  const t = useTranslations("OperationForm")
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB)
  const searchParams = useSearchParams()

  useEffect(() => {
    // Update the activeTab state when router.query is updated
    if (searchParams.has('tab')) {
      setActiveTab(searchParams.get('tab') as string)
    } else {
      setActiveTab(DEFAULT_TAB)
    }
  }, [searchParams]);

  return (
    <Tabs 
      // value={router.query.activeTab as string}
      // onChange={(value) => router.push(`/tabs/${value}`)}
      defaultValue={DEFAULT_TAB}
      value={activeTab}
      onChange={(value) => router.push(`?tab=${value}`)}
      keepMounted={false}
    >
      <Tabs.List>
        <Tabs.Tab value="expired">{`${t("expired")}${t("list")}`}</Tabs.Tab>
        <Tabs.Tab value="draft">{`${t("workSchedule")}${t("list")}`}</Tabs.Tab>
        <Tabs.Tab value="requested">{`${t("pendingApproval")}${t("list")}`}</Tabs.Tab>
        <Tabs.Tab value="rejected">{`${t("rejected")}${t("list")}`}</Tabs.Tab>
        <Tabs.Tab value="approved">{`${t("approved")}${t("list")}`}</Tabs.Tab>
        <Tabs.Tab value="completed">{`${t("completed")}${t("list")}`}</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="expired">
        <ExpiredOperationList />
      </Tabs.Panel>

      <Tabs.Panel value="draft">
        <DraftOperationList />
      </Tabs.Panel>

      <Tabs.Panel value="requested">
        <RequestedOperationList />
      </Tabs.Panel>

      <Tabs.Panel value="rejected">
        <RejectedOperationList />
      </Tabs.Panel>

      <Tabs.Panel value="approved">
        <ApprovedOperationList />
      </Tabs.Panel>

      <Tabs.Panel value="completed">
        <OperationList statuses={[6]} className="py-5" count={0} />
      </Tabs.Panel>
    </Tabs>
  )
}
