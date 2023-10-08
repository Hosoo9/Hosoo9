import {
    Checkbox
} from "@mantine/core"
import { useTranslations } from "next-intl"

export const Flags = () => {
  const t = useTranslations("OperationForm")

  return (
    <>
      <div className="grid grid-cols-5 gap-3 pb-5">
        <div className="col-span-1">
          <Checkbox label={t("isSecurityWork")} />
        </div>
        <div className="col-span-1">
          <Checkbox label={t("changedNotificationFlag")} />
        </div>
        <div className="col-span-1">
          <Checkbox label={t("inspectionFlag")} />
        </div>
      </div>
    </>
  )
}
