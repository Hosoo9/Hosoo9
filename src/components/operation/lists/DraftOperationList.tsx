"use client"

import { useTranslations } from "next-intl"
import OperationList, { Operation } from "../OperationList"
import { Button, Center, Paper, Select } from "@mantine/core"
import { useState } from "react"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"
import { Modal } from "@mantine/core"
import UserSelect from "@/components/form/UserSelect"
import { DatePickerInput, TimeInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { adjustDateToTimezone } from "@/utils/date-helper"

export default function DraftOperationList({}: {}) {
  const t = useTranslations("OperationForm")
  const [selectedRecords, setSelectedRecords] = useState<Operation[]>([])
  const [count, setCount] = useState<number>(0)
  const [opened, { open, close }] = useDisclosure(false)

  const form = useForm({
    initialValues: {
      assignedWorkerId: null,
      scheduledDatetime: null,
      scheduledDate: null,
      scheduledTime: null,
      footprint: null,
      postcardStartDate: null,
      postcardEndDate: null,
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
    }
  })

  const { mutateAsync: batchAssignAsync } = useMutation({
    mutationFn: async (values: any) => {
      let result = await fetch(`/api/operation/batch/assign`, {
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

  const batchAssign = async (formValues: any) => {
    await batchAssignAsync({
      codes: selectedRecords.map((r) => r.code),
      assignedWorkerId: formValues.assignedWorkerId,
      scheduledDate: adjustDateToTimezone(formValues.scheduledDate),
    })

    close()
    setCount(count + 1)
  }

  return (
    <>
      <OperationList
        count={count}
        statuses={[1, 4]}
        className="py-5"
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
      />
      <Paper withBorder={true} className="py-3">
        <Center>
          <div className="flex gap-3">
            <Button onClick={() => open()} disabled={selectedRecords.length === 0}>一括日程調整</Button>
            <Button onClick={onAction} disabled={selectedRecords.length === 0}>{ t("submitForApproval") }</Button>
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
            <Select
              label={t("footprint")}
              data-testid="footprint"
              data={[
                { value: "1", label: t("footprint1") },
                { value: "2", label: t("footprint2") },
              ]}
              {...form.getInputProps("footprint")}
            ></Select>
            <div className="flex gap-2">
              <DatePickerInput
                // {...form.getInputProps("postcardStartDate")}
                data-testid="postcardStartDate"
                label={t("postcardStartDate")}
                name="postcardStartDate"
                {...form.getInputProps("postcardStartDate")}
              />
              <DatePickerInput
                // {...form.getInputProps("postcardEndDate")}
                data-testid="postcardEndDate"
                label={t("postcardEndDate")}
                name="postcardEndDate"
                {...form.getInputProps("postcardEndDate")}
              />
            </div>

            <Button className="mt-2" type="submit">{ t("save") }</Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
