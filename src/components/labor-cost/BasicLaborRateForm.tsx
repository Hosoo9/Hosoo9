"use client"

/* Todo list/Memo 
1. Email zasna
2. Select button uudiin data oruulna
3. Cash - Payment method Lease- Signature
4. 
*/

import "dayjs/locale/ja"

import { Button, NumberInput, Select, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { getBlrDistrictTypeFS, getBlrExchangeTypeFS, getBlrMeterSizeTypeFS, getBlrMeterTypeFS, getBlrOperationTypeFS, getBlrWorkingTimeFS } from "@/lib/enum/basic-labor-rate"

const toStringSafe = (value: any) => {
  if (!value) {
    return null
  }

  return value.toString()
}

function BasicLaborRateForm({
  basicLaborRate,
  onSave,
}: {
  code?: string
  basicLaborRate?: any
  onSave?: (data: any) => void
}) {
  const form = useForm({
    initialValues: {
      code: basicLaborRate?.code || null,
      operationType: toStringSafe(basicLaborRate?.operationType) || null,
      meterType: toStringSafe(basicLaborRate?.meterType) || null,
      exchangeType: toStringSafe(basicLaborRate?.exchangeType) || null,
      workingTime: toStringSafe(basicLaborRate?.workingTime) || null,
      meterSizeType: toStringSafe(basicLaborRate?.meterSizeType) || null,
      districtType: toStringSafe(basicLaborRate?.districtType) || null,
      rate: basicLaborRate?.rate || null,
    },
  })

  type FormValues = typeof form.values

  const { isLoading, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: async (formValues: FormValues) => {
      let result: Response

      result = await fetch(`/api/basic-labor-rate/${formValues.code}`, {
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
        message: "BasicLaborRate has not been saved",
        color: "red",
      })
    },
  })

  const t = useTranslations("OperationForm")

  const saveBasicLaborRate = async (values: FormValues) => {
    const result = await mutateAsync(values)

    if (onSave) {
      onSave(result)
    }
  }

  return (
    <form onReset={form.onReset} onSubmit={form.onSubmit(saveBasicLaborRate)}>
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
            label={t("blrOperationType")}
            data-testid="operationType"
            {...form.getInputProps("operationType")}
            data={getBlrOperationTypeFS}
          />
        </div>
        <div>
          <Select
            label={t("blrMeterType")}
            data-testid="meterType"
            {...form.getInputProps("meterType")}
            data={getBlrMeterTypeFS}
          />
        </div>
        <div>
          <Select
            label={t("blrExchangeType")}
            data-testid="exchangeType"
            {...form.getInputProps("exchangeType")}
            data={getBlrExchangeTypeFS}
          />
        </div>
        <div>
          <Select
            label={t("blrWorkingTime")}
            data-testid="workingTime"
            {...form.getInputProps("workingTime")}
            data={getBlrWorkingTimeFS}
          />
        </div>
        <div>
          <Select
            label={t("blrMeterSizeType")}
            data-testid="meterSizeType"
            {...form.getInputProps("meterSizeType")}
            data={getBlrMeterSizeTypeFS}
          />
        </div>
        <div>
          <Select
            label={t("blrDistrictType")}
            data-testid="districtType"
            {...form.getInputProps("districtType")}
            data={getBlrDistrictTypeFS}
          />
        </div>
        <div>
          <NumberInput
            {...form.getInputProps("rate")}
            label={t("blrRate")}
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

export default BasicLaborRateForm
