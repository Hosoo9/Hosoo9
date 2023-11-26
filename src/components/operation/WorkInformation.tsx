import { Select } from "@mantine/core"
import { useTranslations } from "next-intl"

export const WorkInformation = ({ form, className }: { form: any, className?: string }) => {
  const t = useTranslations("OperationForm")

  return (
    <div className={className}>
      {/* <Title order={2} size="h3"> */}
      {/*   {t("workInformation")} */}
      {/* </Title> */}

      <div className="grid grid-cols-5 gap-3 py-5">
        {/* <div> */}
        {/*   <DatePickerInput */}
        {/*     label={t("exchangingDate")} */}
        {/*     {...form.getInputProps("exchangingDate")} */}
        {/*   /> */}
        {/* </div> */}
        <div>
          <Select
            label={t("operationType")}
            data={[
              { value: "1", label: t("operationType1") },
              { value: "2", label: t("operationType2") },
              { value: "3", label: t("operationType3") },
              { value: "4", label: t("operationType4") },
              { value: "5", label: t("operationType5") },
            ]}
            {...form.getInputProps("operationType")}
          ></Select>
        </div>
      </div>
    </div>
  )
}
