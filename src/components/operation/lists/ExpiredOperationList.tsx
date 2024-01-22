"use client"

import { Button, Center, Modal, Paper } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"
import OperationList, { Operation } from "../OperationList"
import CompanySelect from "@/components/form/CompanySelect"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"

export default function ExpiredOperationList({}: {}) {
  const t = useTranslations("OperationForm")
  const [selectedRecords, setSelectedRecords] = useState<Operation[]>([])
  const [count, setCount] = useState(0)
  const [opened, { open, close }] = useDisclosure(false)

  const form = useForm({
    initialValues: {
      companyId: null,
    },
  })

  const { mutateAsync: batchAssignCompany, isLoading: batchAssignLoading } = useMutation({
    mutationFn: async (values: any) => {
      let result = await fetch(`/api/operation/batch/company-assign`, {
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

  const formSubmit = async (values: any) => {
    await batchAssignCompany({ 
      codes: selectedRecords.map(r => r.code),
      companyId: values.companyId,
    })

    close()
    reset()
    setCount(count + 1)
  }

  const reset = () => {
    form.reset()
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
            <Button
              onClick={() => open()}
              disabled={selectedRecords.length === 0}
            >
              会社割当
            </Button>
            <Button disabled={selectedRecords.length === 0}>帳票出力</Button>
          </div>
        </Center>
      </Paper>

      <Modal opened={opened} onClose={close}>
        <form onReset={form.onReset} onSubmit={form.onSubmit(formSubmit)}>
          <div className="flex flex-col gap-3">
            <CompanySelect
              form={form}
              label={t("company")}
              name={"companyId"}
            />
            <Button className="mt-2" type="submit" loading={batchAssignLoading}>
              { t("saved") }
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
