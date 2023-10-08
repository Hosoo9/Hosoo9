import { Input, Title } from "@mantine/core"
import { useTranslations } from "next-intl"
import { TakePicture } from "./TakePicture"

export const RemovingMeterInformation = () => {
  const t = useTranslations("OperationForm")

  return (
    <>
      <Title order={2} size="h3">
        {t("removingMeterInformation")}
      </Title>

      <div className="grid grid-cols-5 gap-3 pb-5">
        <div>
          <Input.Wrapper label={t("meterType")}>
            <Input data-testid="meterType" />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <div className="flex">
            <Input.Wrapper label={t("serialNumber")} className="pr-3">
              <Input data-testid="serialNumber" />{" "}
            </Input.Wrapper>
            <Input.Wrapper label={t("meterType")}>
              <Input data-testid="meterType" />{" "}
            </Input.Wrapper>
          </div>
        </div>
        <div>
          <Input.Wrapper label={t("meterMaximumUsage")}>
            <Input data-testid="meterMaximumUsage" />{" "}
          </Input.Wrapper>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3 pb-5">
        <div>
          <Input.Wrapper label={t("meterNumber")}>
            <Input data-testid="meterNumber" />{" "}
          </Input.Wrapper>
        </div>

        <div>
          <Input.Wrapper label={t("meterValue")}>
            <Input data-testid="meterValue" />{" "}
          </Input.Wrapper>
        </div>

        <div>
          <Input.Wrapper label={t("certificationYear")}>
            <Input data-testid="certificationYear" />{" "}
          </Input.Wrapper>
        </div>

        <div>
          <Input.Wrapper label={t("examinationMonth")}>
            <Input data-testid="examinationMonth" />{" "}
          </Input.Wrapper>
        </div>
      </div>

      <div className="pb-5">
        <TakePicture />

        <div className="grid grid-cols-5 gap-3 py-5">
          <div>
            <Input.Wrapper label={t("referenceDate")}>
              <Input data-testid="referenceDate" />{" "}
            </Input.Wrapper>
          </div>
          <div>
            <Input.Wrapper label={t("position")}>
              <Input data-testid="position" />{" "}
            </Input.Wrapper>
          </div>
        </div>
      </div>
    </>
  )
}
