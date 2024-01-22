import "dayjs/locale/ja"

import { Select } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

export const MeterModelSelect = ({ form, name }: { form: any, name: string }) => {
  const t = useTranslations("OperationForm")

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["meter-models"],
    queryFn: async () => {
      const result = await fetch(`/api/meter_models`)
      return result.json()
    },
    onSettled: (data: any) => {
    },
  })

  const selectData = data?.map((item: any) => {
    return { value: item.id.toString(), label: item.name }
  })

  return (
    <>
      <Select
        label={t("meterModel")}
        data={selectData}
        {...form.getInputProps(name)}
        // isLoading={isLoading}
      ></Select>
    </>
  )
}
