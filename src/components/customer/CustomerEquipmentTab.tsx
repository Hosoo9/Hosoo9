import { DataTable } from "mantine-datatable"
import { useTranslations } from "next-intl"

export default function CustomerEquipmentTab({}: {}) {
  const t = useTranslations("OperationForm")

  const columns = [
    { accessor: "kaykuNo", title: t("customerNumber") },
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
