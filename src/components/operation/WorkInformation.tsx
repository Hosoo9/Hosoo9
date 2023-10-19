import { Input, Select } from "@mantine/core"
import { useTranslations } from "next-intl"

export const WorkInformation = ({ form, className }: { form: any, className: string }) => {
  const t = useTranslations("OperationForm")

  return (
    <div className={className}>
      {/* <Title order={2} size="h3"> */}
      {/*   {t("workInformation")} */}
      {/* </Title> */}

      <div className="grid grid-cols-5 gap-3 py-5">
        <div>
          <Input.Wrapper label={t("exchangingDate")}>
            <Input data-testid="exchangingDate" {...form.getInputProps("exchangingDate")}/>{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Select
            label={t("operationType")}
            data={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
            ]}
            {...form.getInputProps("operationType")}
          ></Select>
        </div>
      </div>
    </div>
  )
}
