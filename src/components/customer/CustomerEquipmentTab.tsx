import { formatDay } from "@/utils/date-helper"
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
    queryKey: ["equipment", customerNumber],
    queryFn: async () => {
      const response = await fetch(
        `/api/customer-search/equipment?customerNumber=${customerNumber}`,
      )
      return response.json()
    },
  })

  const t = useTranslations("OperationForm")

  const columns = [
    { accessor: "kyakuNo", title: t("customerNumber") },
    { accessor: "machinNo", title: "機器番号" },
    { accessor: "modelCd", title: "機種ｺｰﾄﾞ" },
    { accessor: "makerCd", title: "ﾒｰｶｰ" },
    { accessor: "modelNm", title: "器具名(型式)" },
    { accessor: "seizouYm", title: "製造年月" },
    { accessor: "basyoCd", title: "設置場所" },
    { accessor: "kyuhiCd", title: "給排気方式" },
    { accessor: "caloreiSu", title: "消費ｷﾛｶﾛﾘｰ" },
    { accessor: "unfitCd", title: "不適合ｺｰﾄﾞ" },
    { accessor: "badCd", title: "不良ｺｰﾄﾞ" },
    { accessor: "daisu", title: "台数" },
    { accessor: "jointCd", title: "接続具" },
    { accessor: "chousaYmd", title: "調査年月日" },
    { accessor: "chousaTanto", title: "調査担当" },
    { accessor: "meterNo", title: "子ﾒｰﾀ番号" },
    { accessor: "displayFlg", title: "非表示ﾌﾗｸﾞ" },
    { accessor: "mkYmd", title: "作成日" },
    { accessor: "upYmd", title: "更新日" },
  ]

  const mappedData = (data?.data || []).map((item) => ({
    ...item,
    chousaYmd: item.chousaYmd ? formatDay(item.chousaYmd) : "",
    mkYmd: item.mkYmd ? formatDay(item.mkYmd) : "",
    upYmd: item.mkYmd ? formatDay(item.mkYmd) : "",
  }))

  return (
    <div className="pt-5">
      <DataTable
        idAccessor={(record) => `${record.kyakuNo}-${record.machinNo}`}
        totalRecords={data?.total || 0}
        withTableBorder={false}
        striped
        borderRadius="sm"
        page={page}
        recordsPerPage={pageSize}
        highlightOnHover
        records={mappedData}
        onPageChange={setPage}
        columns={columns}
      />
    </div>
  )
}
