import { Checkbox } from "@mantine/core"
import { useTranslations } from "next-intl"

export const Flags = ({ form }: { form: any }) => {
  const t = useTranslations("OperationForm")

  return (
    <>
      <div className="grid grid-cols-5 gap-3 pb-5">
        <div className="col-span-1">
          <Checkbox
            label={t("isSecurityWork")}
            {...form.getInputProps("isSecurityWork", { type: "checkbox" })}
          />
        </div>
        {/* <div className="col-span-1"> */}
        {/*   <Checkbox */}
        {/*     label={t("changedNotificationFlag")} */}
        {/*     {...form.getInputProps("changedNotificationFlag", { type: "checkbox" })} */}
        {/*   /> */}
        {/* </div> */}
        {/* <div className="col-span-1"> */}
        {/*   <Checkbox */}
        {/*     label={t("inspectionFlag")} */}
        {/*     {...form.getInputProps("valveOpenFlag", { type: "checkbox" })} */}
        {/*   /> */}
        {/* </div> */}
      </div>
    </>
  )
}
