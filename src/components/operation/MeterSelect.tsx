import "dayjs/locale/ja"

import { Input, Select } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

export const MeterSelect = ({ form, name }: { form: any, name: string }) => {
  const t = useTranslations("OperationForm")

  const router = useRouter()
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["meters"],
    queryFn: async () => {
      const result = await fetch(`/api/meter`)
      return result.json()
    },
    onSettled: (data: any) => {
    },
  })

  const selectData = data?.map((meter: any) => {
    return { value: meter.meterModel, label: meter.meterModel }
  })

  const currentMeter = data?.find((meter: any) => meter.meterModel === form.values[name])

  return (
    <>
      <div className="grid grid-cols-5 gap-3 py-5">
        <div>
          <Select
            label={t("meterModel")}
            data={selectData}
            {...form.getInputProps(name)}
          ></Select>
        </div>
        <div>
          <div className="flex">
            <Input.Wrapper label={t("serialNumber")} className="pr-3">
              <Input
                data-testid="serialNumber"
                disabled
                value={currentMeter?.serialNumber || ""}
              />{" "}
            </Input.Wrapper>
            <Input.Wrapper label={t("meterType")}>
              <Input
                data-testid="meterType"
                disabled
                value={currentMeter?.meterType || ""}
              />{" "}
            </Input.Wrapper>
          </div>
        </div>
        <div>
          <Input.Wrapper label={t("meterMaximumUsage")}>
            <Input
              data-testid="meterMaximumUsage"
              disabled
              value={currentMeter?.meterMaximumUsage || ""}
            />{" "}
          </Input.Wrapper>
        </div>
      </div>
    </>
  )
}
