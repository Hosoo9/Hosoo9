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
            data-testid="installing.beforeWorkInspectionType"
            data={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
            ]}
            {...form.getInputProps("installing.beforeWorkInspectionType")}
          ></Select>
        </div>
        <div>
          <Input.Wrapper label={t("kpa")}>
            <Input
              data-testid="beforeWorkKpa"
              {...form.getInputProps("installing.beforeWorkKpa")}
            />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Radio.Group
            label={t("result")}
            {...form.getInputProps("installing.beforeWorkResult")}
          >
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
            {...form.getInputProps("installing.afterWorkInspectionType")}
          ></Select>
        </div>
        <div>
          <Input.Wrapper label={t("kpa")}>
            <Input data-testid="installing.afterWorkKpa" />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <Radio.Group
            label={t("result")}
            {...form.getInputProps("installing.afterWorkResult")}
          >
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
            <Input
              data-testid="meterModel"
              {...form.getInputProps("installing.meterModel")}
            />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <div className="flex">
            <Input.Wrapper label={t("serialNumber")} className="pr-3">
              <Input
                data-testid="serialNumber"
                {...form.getInputProps("installing.serialNumber")}
              />{" "}
            </Input.Wrapper>
            <Input.Wrapper label={t("meterType")}>
              <Input
                data-testid="meterType"
                {...form.getInputProps("installing.meterType")}
              />{" "}
            </Input.Wrapper>
          </div>
        </div>
        <div>
          <Input.Wrapper label={t("meterMaximumUsage")}>
            <Input
              data-testid="meterMaximumUsage"
              {...form.getInputProps("installing.meterMaximumUsage")}
            />{" "}
          </Input.Wrapper>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 pb-5">
        <div>
          <Input.Wrapper label={t("meterNumber")}>
            <Input
              data-testid="meterNumber"
              {...form.getInputProps("installing.meterNumber")}
            />{" "}
          </Input.Wrapper>
        </div>

        <div>
          <Input.Wrapper label={t("meterValue")}>
            <Input
              data-testid="meterValue"
              {...form.getInputProps("installing.meterValue")}
            />{" "}
          </Input.Wrapper>
        </div>

        <div>
          <YearPickerInput
            label={t("certificationYear")}
            {...form.getInputProps("installing.certificationYear")}
          />
        </div>

        <div>
          <MonthPickerInput
            label={t("examinationMonth")}
            {...form.getInputProps("installing.examinationMonth")}
          />
        </div>
      </div>

      <div className="pb-5">
        <TakePicture />

        <div className="grid grid-cols-1 gap-3 py-5">
          <div>
            <Input.Wrapper label={t("memo")}>
              <Input data-testid="memo" {...form.getInputProps("installing.memo")} />{" "}
            </Input.Wrapper>
          </div>
        </div>
      </div>
    </div>
  )
}
