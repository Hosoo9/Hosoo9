"use client"

import { useTranslations } from "next-intl"
import OperationList, { Operation } from "../OperationList"
import { Button, Center, Paper } from "@mantine/core"
import { useState } from "react"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"

export default function ApprovedOperationList({}: {}) {
  const t = useTranslations("OperationForm")
  const [count, setCount] = useState<number>(0)
  const [selectedRecords, setSelectedRecords] = useState<Operation[]>([])

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


  const onComplete = async () => {
    await mutateAsync({ codes: selectedRecords.map((r) => r.code), newStatus: "3" })
    setCount(count + 1)
  }

  return (
    <>
      <OperationList
        count={count}
        statuses={[3, 5]}
        className="py-5"
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
      />
      <Paper withBorder={true} className="py-3">
        <Center>
          <div className="flex gap-3">
            <Button
              onClick={onComplete}
              disabled={selectedRecords.length === 0}
            >
              {t("completeOperation")}
            </Button>
          </div>
        </Center>
      </Paper>
    </>
  )
}
