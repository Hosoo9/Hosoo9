"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import { getAlrDistrictTypeFS, getAlrOperationTypeFS, getAlrWorkerType, getAlrWorkerTypeFS, getAlrWorkingTimeFS } from "@/lib/enum/additional-labor-rate"
import { Button, NumberInput, Select, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

const toStringSafe = (value: any) => {
  if (!value) {
    return null
  }

  return value.toString()
}

function AdditionalLaborRateForm({
  additionalLaborRate,
  onSave,
}: {
  code?: string
  additionalLaborRate?: any
  onSave?: (data: any) => void
}) {
  const form = useForm({
    initialValues: {
      code: additionalLaborRate?.code || null,
      operationType: toStringSafe(additionalLaborRate?.operationType) || null,
      workingTime: toStringSafe(additionalLaborRate?.workingTime) || null,
      workerType: toStringSafe(additionalLaborRate?.workerType) || null,
      districtType: toStringSafe(additionalLaborRate?.districtType) || null,
      rate: additionalLaborRate?.rate || null,
    },
  })

  type FormValues = typeof form.values

  const { isLoading, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: async (formValues: FormValues) => {
      let result: Response

      result = await fetch(`/api/additional-labor-rate/${formValues.code}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
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
        // title: 'Save failed',
        message: "AdditionalLaborRate has not been saved",
        color: "red",
      })
    },
  })

  const t = useTranslations("OperationForm")

  const saveAdditionalLaborRate = async (values: FormValues) => {
    const result = await mutateAsync(values)

    if (onSave) {
      onSave(result)
    }
  }

  return (
    <form onReset={form.onReset} onSubmit={form.onSubmit(saveAdditionalLaborRate)}>
      <div className="flex flex-col gap-3">
        <div>
          <TextInput
            {...form.getInputProps("code")}
            label={"単価コード"}
            data-testid="code"
            maxLength={4}
            width={100}
          />
        </div>
        <div>
          <Select
            label={t("alrOperationType")}
            data-testid="operationType"
            {...form.getInputProps("operationType")}
            data={getAlrOperationTypeFS}
          />
        </div>
        <div>
          <Select
            label={t("alrWorkingTime")}
            data-testid="workingTime"
            {...form.getInputProps("workingTime")}
            data={getAlrWorkingTimeFS}
          />
        </div>
        <div>
          <Select
            label={t("alrWorkerType")}
            data-testid="workerType"
            {...form.getInputProps("workerType")}
            data={getAlrWorkerTypeFS}
          />
        </div>
        <div>
          <Select
            label={t("alrDistrictType")}
            data-testid="districtType"
            {...form.getInputProps("districtType")}
            data={getAlrDistrictTypeFS}
          />
        </div>
        <div>
          <NumberInput
            {...form.getInputProps("rate")}
            label={"単価"}
            data-testid="rate"
            width={100}
          />
        </div>
        <Button className="mt-5" type="submit" disabled={isLoading}>
          {t("save")}
        </Button>
      </div>
    </form>
  )
}

export default AdditionalLaborRateForm
