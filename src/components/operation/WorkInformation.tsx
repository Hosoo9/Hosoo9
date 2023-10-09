import { Input, Select, Title } from "@mantine/core"
import { useTranslations } from "next-intl"

export const WorkInformation = () => {
  const t = useTranslations("OperationForm")

  return (
    <>
      <Title order={2} size="h3">
        {t("workInformation")}
      </Title>

      <div className="grid grid-cols-5 gap-3 py-5">
        <div>
          <Input.Wrapper label={t("exchangingDate")}>
            <Input data-testid="exchangingDate" />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Select
            label={t("operationType")}
            data={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
            ]}
          ></Select>
        </div>
      </div>
    </>
  )
}
