import { DataTable } from "mantine-datatable"
import { useTranslations } from "next-intl"

export default function CustomerEquipmentTab({}: {}) {
  const t = useTranslations("OperationForm")

  const columns = [
    { accessor: "kaykuNo", title: t("customerNumber") },
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
        withTableBorder={false}
        striped
        borderRadius="sm"
        highlightOnHover
        records={[]}
        columns={columns}
      />
    </div>
  )
}
