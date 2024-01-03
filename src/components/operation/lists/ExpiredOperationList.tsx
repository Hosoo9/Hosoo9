"use client"

import { useTranslations } from "next-intl"
import OperationList, { Operation } from "../OperationList"
import { Button, Center, Paper, TextInput } from "@mantine/core"
import { useState } from "react"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"
import { useDisclosure } from "@mantine/hooks"
import { Modal } from "@mantine/core"
import UserSelect from "@/components/form/UserSelect"
import { useForm } from "@mantine/form"
import { DatePickerInput, TimeInput } from "@mantine/dates"

export default function ExpiredOperationList({}: {}) {
  const t = useTranslations("OperationForm")
  const [selectedRecords, setSelectedRecords] = useState<Operation[]>([])
  const [count, setCount] = useState(0)
  const [opened, { open, close }] = useDisclosure(false)

  const form = useForm({
    initialValues: {
      assignedWorkerId: null,
      scheduledDatetime: null,
      scheduledDate: null,
    },
  })

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

  const batchAssign = async () => {
    console.log(`-------------"assign"---------------`)
    console.log("assign")
    console.log(`----------------------------`)
  }

  return (
    <>
      <OperationList
        count={count}
        isExpired={true}
        statuses={[1]}
        className="py-5"
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
      />

      <Paper withBorder={true} className="py-3">
        <Center>
          <div className="flex gap-3">
            <Button onClick={onAction} disabled={selectedRecords.length === 0}>{ t("submitForApproval") }</Button>
            <Button disabled={selectedRecords.length === 0}>会社割当</Button>
            <Button onClick={() => open()} disabled={selectedRecords.length === 0}>帳票出力</Button>
          </div>
        </Center>
      </Paper>

      <Modal opened={opened} onClose={close}>
        <form onReset={form.onReset} onSubmit={form.onSubmit(batchAssign)}>
          <div className="flex flex-col gap-3">
            <UserSelect
              form={form}
              label={t("assignedWorker")}
              name={"assignedWorkerId"}
            />
            <DatePickerInput
              data-testid="scheduledDate"
              label={t("scheduledDate")}
              name="scheduledDate"
              {...form.getInputProps("scheduledDate")}
            />
            <TimeInput
              data-testid="scheduledTime"
              label={t("scheduledTime")}
              name="scheduledTime"
              {...form.getInputProps("scheduledTime")}
            />

            <Button className="mt-2" type="submit">{ t("save") }</Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
