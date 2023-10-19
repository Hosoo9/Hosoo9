import { Input, Radio, Select, Title } from "@mantine/core"
import { MonthPickerInput, YearPickerInput } from "@mantine/dates"
import { useTranslations } from "next-intl"
import { TakePicture } from "./TakePicture"

export const InstallingMeterInformation = ({
  form,
  className,
}: {
  form: any
  className?: string
}) => {
  const t = useTranslations("OperationForm")

  return (
    <div className={className}>
      {/* <Title order={2} size="h3" className="pb-5"> */}
      {/*   {t("installingMeterInformation")} */}
      {/* </Title> */}
      <Title order={3} size="h4" className="py-3">
        {t("leakInvestigationBeforeWork")}
      </Title>

      <div className="grid grid-cols-5 gap-3 py-5">
        <div>
          <Select
            label={t("testType")}
            data-testid="testType"
            data={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
            ]}
            {...form.getInputProps("installing.testType")}
          ></Select>
        </div>
        <div>
          <Input.Wrapper label={t("kpa")}>
            <Input data-testid="kpa" {...form.getInputProps("installing.kpa")} />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Radio.Group label={t("result")} {...form.getInputProps("installing.result")}>
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
          <Select
            label={t("testType")}
            data-testid="testType"
            data={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
            ]}
            {...form.getInputProps("installing.testType")}
          ></Select>
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
          <Input.Wrapper label={t("meterModel")}>
            <Input data-testid="meterModel" />{" "}
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
          <YearPickerInput label={t("certificationYear")} />
        </div>

        <div>
          <MonthPickerInput label={t("examinationMonth")} />
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
    </div>
  )
}
