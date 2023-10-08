import { Input, Radio, Title } from "@mantine/core"
import { useTranslations } from "next-intl"
import { TakePicture } from "./TakePicture"

export const InstallingMeterInformation = () => {
  const t = useTranslations("OperationForm")

  return (
    <>
      <Title order={2} size="h3">
        {t("installingMeterInformation")}
      </Title>
      <Title order={3} size="h4" className="py-3">
        {t("leakInvestigationBeforeWork")}
      </Title>

      <div className="grid grid-cols-5 gap-3 py-5">
        <div>
          <Input.Wrapper label={t("testType")}>
            <Input data-testid="testType" />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Input.Wrapper label={t("kpa")}>
            <Input data-testid="kpa" />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Radio.Group label={t("result")}>
            {/* name="result" */}
            {/* {...form.getInputProps("result")} */}
            {/* <Group mt="xs"> */}
            <Radio value="1" label={t("passed")} my="xs" />
            <Radio value="2" label={t("notPassed")} my="xs" />
            {/* </Group> */}
          </Radio.Group>
        </div>
      </div>

      <Title order={3} size="h4" className="py-3">
        {t("leakInvestigationAfterWork")}
      </Title>
      <div className="grid grid-cols-5 gap-3 py-5">
        <div>
          <Input.Wrapper label={t("testType")}>
            <Input data-testid="testType" />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Input.Wrapper label={t("kpa")}>
            <Input data-testid="kpa" />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Radio.Group label={t("result")}>
            {/* name="result" */}
            {/* {...form.getInputProps("result")} */}
            {/* <Group mt="xs"> */}
            <Radio value="1" label={t("passed")} my="xs" />
            <Radio value="2" label={t("notPassed")} my="xs" />
            {/* </Group> */}
          </Radio.Group>
        </div>
      </div>

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

        <div className="grid grid-cols-1 gap-3 py-5">
          <div>
            <Input.Wrapper label={t("memo")}>
              <Input data-testid="memo" />{" "}
            </Input.Wrapper>
          </div>
        </div>
      </div>
    </>
  )
}
