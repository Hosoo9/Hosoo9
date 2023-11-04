import { Input } from "@mantine/core"
import { DatePickerInput, MonthPickerInput } from "@mantine/dates"
import { useTranslations } from "next-intl"
import { MeterSelect } from "./MeterSelect"
import { TakePicture } from "./TakePicture"

export const RemovingMeterInformation = ({
  form,
  className,
}: {
  form: any
  className?: string
}) => {
  const t = useTranslations("OperationForm")

  return (
    <>
      {/* <Title order={2} size="h3"> */}
      {/*   {t("removingMeterInformation")} */}
      {/* </Title> */}

      <MeterSelect form={form} name="removingMeterId" />

      <div className="grid grid-cols-5 gap-3 pb-5">
        <div>
          <Input.Wrapper label={t("meterNumber")}>
            <Input
              data-testid="removingMeterNumber"
              {...form.getInputProps("removingMeterNumber")}
            />{" "}
          </Input.Wrapper>
        </div>

        <div>
          <Input.Wrapper label={t("meterValue")}>
            <Input
              data-testid="removingMeterValue"
              {...form.getInputProps("removingMeterValue")}
            />{" "}
          </Input.Wrapper>
        </div>

        <div>
          <MonthPickerInput
            label={t("meterInspectionDate")}
            {...form.getInputProps("removingMeterInspectionDate")}
          />
        </div>
      </div>

      <div className="pb-5">
        <TakePicture />

        <div className="grid grid-cols-5 gap-3 py-5">
          <div>
            <DatePickerInput
              data-testid="referenceDate"
              label={t("referenceDate")}
              name="referenceDate"
              mx="auto"
              {...form.getInputProps("referenceDate")}
            />
          </div>
          <div>
            <Input.Wrapper label={t("position")}>
              <Input
                data-testid="position"
                {...form.getInputProps("position")}
              />{" "}
            </Input.Wrapper>
          </div>
        </div>
      </div>
    </>
  )
}
