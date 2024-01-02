"use client"

import { useTranslations } from "next-intl"
import OperationList, { Operation } from "../OperationList"
import { Button, Center, Paper } from "@mantine/core"
import { useState } from "react"

export default function RequestedOperationList({}: {}) {
  const t = useTranslations("OperationForm")
  const [selectedRecords, setSelectedRecords] = useState<Operation[]>([])

  const onApprove = async () => {
    console.log(`-------------"batchUpdate"---------------`)
    console.log("batchUpdate")
    console.log(`----------------------------`)
  }

  const onReject = async () => {
    console.log(`-------------"batchUpdate"---------------`)
    console.log("batchUpdate")
    console.log(`----------------------------`)
  }

  return (
    <>
      <OperationList
        statuses={[2]}
        className="py-5"
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
      />
      <Paper withBorder={true} className="py-3">
        <Center>
          <div className="flex gap-3">
            <Button
              onClick={onApprove}
              disabled={selectedRecords.length === 0}
            >
              {t("approve")}
            </Button>
            <Button
              onClick={onReject}
              disabled={selectedRecords.length === 0}
              color="red"
              variant="light"
            >
              {t("reject")}
            </Button>
          </div>
        </Center>
      </Paper>
    </>
  )
}
