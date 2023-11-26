"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import { Button, Select, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import UserSelect from "../form/UserSelect"
import { notifications } from "@mantine/notifications"

function ContactForm({
  code,
  onContactCreated,
}: {
  code: string
  onContactCreated: () => Promise<void>
}) {
  const form = useForm({
    initialValues: {
      details: "",
      operationCode: code,
      contactType: null,
      contactedBy: null,
      contactedAt: null,
    }
  })

  type FormValues = typeof form.values

  const { isLoading, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: async (newContact: FormValues) => {
      const result = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      })

      return { status: result.status, data: result.json() }
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        notifications.show({
          title: 'Save success',
          message: 'Contact has been saved',
        })
      } else {
        notifications.show({
          title: 'Save failed',
          message: 'Contact has not been saved',
          color: 'red',
        })
      }
    },
    onError: () => {
      notifications.show({
        title: 'Save failed',
        message: 'Contact has not been saved',
        color: 'red',
      })
    }
  })

  const t = useTranslations("OperationForm")

  const saveContact = async (values: FormValues) => {
    await mutateAsync({ ...values, operationCode: code })

    form.reset()

    await onContactCreated()
  }

  return (
    <div>
      <form onReset={form.onReset} onSubmit={form.onSubmit(saveContact)}>
        <div className="grid grid-cols-5 gap-3 py-5">
          <div className="col-span-1">
            <Select
              label={t("contactType")}
              data={[
                { value: "1", label: "電話連絡" },
                { value: "2", label: "不在票投函" },
              ]}
              {...form.getInputProps("contactType")}
            ></Select>
          </div>
          <div className="col-span-1">
            <UserSelect form={form} label={t("contactedBy")} name="contactedBy" />
          </div>
          <div className="col-span-1">
            <DatePickerInput
              label={t("contactedAt")}
              name="contactedAt"
              mx="auto"
              {...form.getInputProps("contactedAt")}
            />
          </div>
          <div className="col-span-1">
            <TextInput
              label={t("details")}
              placeholder={t("details")}
              {...form.getInputProps("details")}
            />
          </div>
          <div className="flex items-end">
            <Button loading={isLoading} type="submit">
              {t("create")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
