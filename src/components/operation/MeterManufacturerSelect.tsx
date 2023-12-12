import "dayjs/locale/ja"

import { Select } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

export const MeterManufacturerSelect = ({ form, name }: { form: any, name: string }) => {
  const t = useTranslations("OperationForm")

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["meter-manufacturers"],
    queryFn: async () => {
      const result = await fetch(`/api/meter_manufacturers`)
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
        label={t("meterManufacturer")}
        data={selectData}
        {...form.getInputProps(name)}
        // isLoading={isLoading}
      ></Select>
    </>
  )
}
