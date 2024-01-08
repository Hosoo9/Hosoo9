"use client"

import { Title } from "@mantine/core"
import { useTranslations } from "next-intl"

type MeterSize = {
  id: string
  code: string
}

export default function CostCalculatorPage({}: {}) {
  // const { isLoading, error, data, refetch } = useQuery<MeterSize[]>({
  //   queryKey: [],
  //   queryFn: async () => {
  //     const response = await fetch(`/api/meter_sizes`)
  //     return response.json()
  //   },
  // })

  const t = useTranslations("OperationForm")

  // const columns = [
  //   {
  //     accessor: "id",
  //     title: t("id"),
  //   },
  // ]


  return (
    <div>
      <Title>労務費算出</Title>

      {/* <DataTable */}
      {/*   withTableBorder={false} */}
      {/*   striped */}
      {/*   borderRadius="sm" */}
      {/*   highlightOnHover */}
      {/*   records={data || []} */}
      {/*   columns={columns} */}
      {/*   idAccessor="id" */}
      {/* /> */}
    </div>
  )
}
