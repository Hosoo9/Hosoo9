import { Input, Title } from "@mantine/core"
import { useTranslations } from "next-intl"

export const WorkInformation = () => {
  const t = useTranslations("OperationForm")

  return (
    <>
      <Title order={2} size="h3">
        {t("workInformation")}
      </Title>

      <div className="grid grid-cols-5 gap-3 pb-5">
        <div>
          <Input.Wrapper label={t("exchangeDate")}>
            <Input data-testid="exchangeDate" />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Input.Wrapper label={t("workClassification")}>
            <Input data-testid="workClassification" />{" "}
          </Input.Wrapper>
        </div>
      </div>
    </>
  )
}
