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

function MeterManufacturerForm({
  meterManufacturer,
  onSave,
}: {
  id?: string
  meterManufacturer?: any
  onSave?: (data: any) => void
}) {
  const form = useForm({
    initialValues: {
      code: meterManufacturer?.code || "",
    },
  })

  type FormValues = typeof form.values

  const { isLoading, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: async (formValues: FormValues) => {
      let result: Response

      if (!meterManufacturer) {
        result = await fetch(`/api/meter_manufacturers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        })
      } else {
        result = await fetch(`/api/meter_manufacturers/${meterManufacturer.id}`, {
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
        message: 'MeterManufacturer has not been saved',
        color: 'red',
      })
    }
  })

  const t = useTranslations("OperationForm")

  const saveMeterManufacturer = async (values: FormValues) => {
    const result = await mutateAsync(values)

    if (onSave) {
      onSave(result)
    }
  }

  return (
    <form onReset={form.onReset} onSubmit={form.onSubmit(saveMeterManufacturer)}>
      <div className="flex flex-col gap-3">
        <div>
          <TextInput label={t("code")} data-testid="code" {...form.getInputProps("code")} maxLength={2} width={100} />
        </div>
        <Button className="mt-5" type="submit" disabled={isLoading}>
          { t("save") }
        </Button>
      </div>
    </form>
  )
}

export default MeterManufacturerForm
