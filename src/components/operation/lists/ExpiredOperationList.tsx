"use client"

import { useTranslations } from "next-intl"
import OperationList, { Operation } from "../OperationList"
import { Button, Center, Paper } from "@mantine/core"
import { useState } from "react"

export default function ExpiredOperationList({}: {}) {
  const t = useTranslations("OperationForm")
  const [selectedRecords, setSelectedRecords] = useState<Operation[]>([])

  const onAction = async () => {
    console.log(`-------------"batchUpdate"---------------`)
    console.log("batchUpdate")
    console.log(`----------------------------`)
  }

  return (
    <>
      <OperationList
        isExpired={true}
        statuses={[1]}
        className="py-5"
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
      />

      <Paper withBorder={true} className="py-3">
        <Center>
          <div className="flex gap-3">
            <Button disabled={selectedRecords.length === 0}>{ t("submitForApproval") }</Button>
          </div>
        </Center>
      </Paper>
    </>
  )
}
