import {
    Input,
    Title
} from "@mantine/core"
import { useTranslations } from "next-intl"

export const MetaInformation = () => {
  const t = useTranslations("OperationForm")

  return (
    <>
      <Title order={2} size="h3">
        {t("metaInformation")}
      </Title>
      <div className="grid grid-cols-5 gap-3 py-5">
        <div className="col-span-1">
          <Input.Wrapper label={t("workDetails")}>
            <Input data-testid="mailAddress" disabled />{" "}
          </Input.Wrapper>
        </div>
        <div className="col-span-1">
          <Input.Wrapper label={t("status")}>
            <Input data-testid="status" disabled />{" "}
          </Input.Wrapper>
        </div>
        <div className="col-span-1">
          <Input.Wrapper label={t("author")}>
            <Input data-testid="author" disabled />{" "}
          </Input.Wrapper>
        </div>
        <div className="col-span-1">
          <Input.Wrapper label={t("createdAt")}>
            <Input data-testid="creationDateTime" disabled />{" "}
          </Input.Wrapper>
        </div>
        <div className="col-span-1">
          <Input.Wrapper label={t("completedAt")}>
            <Input data-testid="completedAt" disabled />{" "}
          </Input.Wrapper>
        </div>
      </div>
    </>
  )
}
