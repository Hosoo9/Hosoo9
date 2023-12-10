"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

function MeterSizeForm({
  meterSize,
  onSave,
}: {
  id?: string
  meterSize?: any
  onSave?: (data: any) => void
}) {
  const form = useForm({
    initialValues: {
      code: meterSize?.code || "",
    },
  })

  type FormValues = typeof form.values

  const { isLoading, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: async (formValues: FormValues) => {
      let result: Response

      if (!meterSize) {
        result = await fetch(`/api/meter_sizes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        })
      } else {
        result = await fetch(`/api/meter_sizes/${meterSize.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        })
      }

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
        // title: 'Save failed',
        message: 'MeterSize has not been saved',
        color: 'red',
      })
    }
  })

  const t = useTranslations("OperationForm")

  const saveMeterSize = async (values: FormValues) => {
    const result = await mutateAsync(values)

    if (onSave) {
      onSave(result)
    }
  }

  return (
    <form onReset={form.onReset} onSubmit={form.onSubmit(saveMeterSize)}>
      <div className="flex flex-col gap-3">
        <div>
          <TextInput label={t("code")} data-testid="code" {...form.getInputProps("code")} maxLength={15} width={100} />
        </div>
        <Button className="mt-5" type="submit" disabled={isLoading}>
          { t("save") }
        </Button>
      </div>
    </form>
  )
}

export default MeterSizeForm
