import { useQuery } from "@tanstack/react-query"
import { DataTable } from "mantine-datatable"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function CustomerEquipmentTab({
  customerNumber,
}: {
  customerNumber: string
}) {
  const [page, setPage] = useState(1)
  const pageSize = 10

  const { isLoading, error, data, refetch } = useQuery<{ total: number, data: any[] }>({
    queryKey: ["alarm", customerNumber, page],
    queryFn: async () => {
      const params = new URLSearchParams()
      params.set("page", page.toString())
      params.set("customerNumber", customerNumber)

      const response = await fetch(
        `/api/customer-search/alarm?${params.toString()}`,
      )
      return response.json()
    },
  })

  const t = useTranslations("OperationForm")

  const columns = [
    { accessor: "kyakuNo", title: t("customerNumber") },
    { accessor: "regNo", title: "登録番号" },
    { accessor: "systemKbn", title: "システム区分" },
    { accessor: "alarmModel", title: "型式" },
    { accessor: "seizouNo", title: "製造番号" },
    { accessor: "toritsukePos", title: "取付位置" },
    { accessor: "setterNm", title: "設置者" },
    { accessor: "alarmEndYm", title: "期満年月" },
    { accessor: "alarmLeaseCash", title: "リース・現金" },
    { accessor: "indvBatch", title: "個別・一括" },
    { accessor: "toritsukeYmd", title: "取付年月日" },
    { accessor: "alarmContractReason", title: "契約事由" },
    { accessor: "alarmContractYmd", title: "契約年月日" },
    { accessor: "cancelReason", title: "解約事由" },
    { accessor: "cancelYmd", title: "解約年月日" },
    { accessor: "exchangeReason", title: "交換事由" },
    { accessor: "exchangeYmd", title: "交換年月日" },
    { accessor: "alarmRemoveReason", title: "警報器取外事由" },
    { accessor: "alarmRemoveYmd", title: "警報器取外年月日" },
    { accessor: "endNoticeYmd", title: "期満通知年月日" },
    { accessor: "mkYmd", title: "作成日" },
    { accessor: "upYmd", title: "更新日" },
  ]

  return (
    <div className="pt-5">
      <DataTable
        idAccessor={(record) => `${record.kyakuNo}-${record.regNo}`}
        totalRecords={data?.total || 0}
        withTableBorder={false}
        striped
        borderRadius="sm"
        page={page}
        recordsPerPage={pageSize}
        highlightOnHover
        records={data?.data || []}
        onPageChange={setPage}
        columns={columns}
      />
    </div>
  )
}
