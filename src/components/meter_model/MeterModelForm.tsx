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

function MeterModelForm({
  meterModel,
  onSave,
}: {
  id?: string
  meterModel?: any
  onSave?: (data: any) => void
}) {
  const form = useForm({
    initialValues: {
      code: meterModel?.code || "",
      name: meterModel?.name || "",
    },
  })

  type FormValues = typeof form.values

  const { isLoading, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: async (formValues: FormValues) => {
      let result: Response

      if (!meterModel) {
        result = await fetch(`/api/meter_models`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        })
      } else {
        result = await fetch(`/api/meter_models/${meterModel.id}`, {
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
        message: "MeterModel has not been saved",
        color: "red",
      })
    },
  })

  const t = useTranslations("OperationForm")

  const saveMeterModel = async (values: FormValues) => {
    const result = await mutateAsync(values)

    if (onSave) {
      onSave(result)
    }
  }

  return (
    <form onReset={form.onReset} onSubmit={form.onSubmit(saveMeterModel)}>
      <div className="flex flex-col gap-3">
        <TextInput
          label={"型式コード"}
          data-testid="code"
          {...form.getInputProps("code")}
          maxLength={2}
          width={100}
        />
        <TextInput
          label={"型式名"}
          data-testid="name"
          {...form.getInputProps("name")}
          maxLength={1000}
          width={100}
        />
        <Button className="mt-5" type="submit" disabled={isLoading}>
          {t("save")}
        </Button>
      </div>
    </form>
  )
}

export default MeterModelForm
