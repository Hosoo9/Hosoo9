import "dayjs/locale/ja"

import { Select } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

export const MeterSizeSelect = ({ form, name }: { form: any, name: string }) => {
  const t = useTranslations("OperationForm")

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["meters-sizes"],
    queryFn: async () => {
      const result = await fetch(`/api/meter_sizes`)
      return result.json()
    },
    onSettled: (data: any) => {
    },
  })

  const selectData = data?.map((item: any) => {
    return { value: item.id.toString(), label: item.code }
  })

  return (
    <>
      <Select
        label={t("meterSize")}
        data={selectData}
        {...form.getInputProps(name)}
        // isLoading={isLoading}
      ></Select>
    </>
  )
}
