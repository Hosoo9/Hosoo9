"use client"

import { useTranslations } from "next-intl"
import OperationList, { Operation } from "../OperationList"
import { Button, Center, Paper } from "@mantine/core"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"

export default function RejectedOperationList({}: {}) {
  const t = useTranslations("OperationForm")
  const [selectedRecords, setSelectedRecords] = useState<Operation[]>([])
  const [count, setCount] = useState<number>(0)

  const { isLoading, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: async (values: any) => {
      let result = await fetch(`/api/operation/batch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      return result.json()
    },
    onSuccess: () => {
      notifications.show({
        // title: 'Save success',
        message: t("saved"),
      })
    },
    onError: () => {
      notifications.show({
        message: "error",
        color: "red",
      })
    },
  })

  const onAction = async () => {
    await mutateAsync({ codes: selectedRecords.map((r) => r.code), newStatus: "2" })
    setCount(count + 1)
  }

  return (
    <>
      <OperationList
        count={count}
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
