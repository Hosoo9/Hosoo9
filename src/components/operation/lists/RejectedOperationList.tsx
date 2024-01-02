"use client"

import { useTranslations } from "next-intl"
import OperationList, { Operation } from "../OperationList"
import { Button, Center, Paper } from "@mantine/core"
import { useState } from "react"

export default function RejectedOperationList({}: {}) {
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
        isExpired={false}
        statuses={[4]}
        className="py-5"
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
      />

      <Paper withBorder={true} className="py-3">
        <Center>
          <div className="flex gap-3">
            <Button onClick={onAction} disabled={selectedRecords.length === 0}>
              {t("submitForApproval")}
            </Button>
          </div>
        </Center>
      </Paper>
    </>
  )
}
