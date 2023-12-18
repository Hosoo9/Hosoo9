import { getOperationStateName } from "@/lib/enum/operation-state"
import { formatDate } from "@/utils/date-helper"
import { useTranslations } from "next-intl"

export const MetaInformation = ({ form, operation }: { form: any, operation: any }) => {
  const t = useTranslations("OperationForm")

  return (
    <>
      <div className="grid grid-cols-5 gap-3 py-5">
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-700">{t("workDetails")}</div>
            <div className="mt-1 text-gray-600">-</div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-700">{t("status")}</div>
            <div className="mt-1 text-gray-600">{operation?.status ? t(getOperationStateName(operation.status).toLowerCase()) : "-"}</div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-700">{t("author")}</div>
            <div className="mt-1 text-gray-600">{form.values.createdByUser?.name ? form.values.createdByUser?.name : ""}</div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-700">{t("createdAt")}</div>
            <div className="mt-1 text-gray-600">{form.values.createdAt ? formatDate(form.values.createdAt) : ""}</div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-700">{t("completedAt")}</div>
            <div className="mt-1 text-gray-600">{form.values.completedAt ? form.values.completedAt : "-"}</div>
          </div>
        </div>
      </div>
    </>
  )
}
