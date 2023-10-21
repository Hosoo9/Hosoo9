import { Input } from "@mantine/core"
import { useTranslations } from "next-intl"
import { TakePicture } from "./TakePicture"
import { MonthPickerInput, YearPickerInput } from "@mantine/dates"

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

      <div className="grid grid-cols-5 gap-3 py-5">
        <div>
          <Input.Wrapper label={t("meterModel")}>
            <Input
              data-testid="removing.meterModel"
              {...form.getInputProps("removing.meterModel")}
            />{" "}
          </Input.Wrapper>
        </div>
        <div>
          <div className="flex">
            <Input.Wrapper label={t("serialNumber")} className="pr-3">
              <Input
                data-testid="removing.serialNumber"
                {...form.getInputProps("removing.serialNumber")}
              />{" "}
            </Input.Wrapper>
            <Input.Wrapper label={t("meterType")}>
              <Input
                data-testid="removing.meterType"
                {...form.getInputProps("removing.meterType")}
              />{" "}
            </Input.Wrapper>
          </div>
        </div>
        <div>
          <Input.Wrapper label={t("meterMaximumUsage")}>
            <Input
              data-testid="removing.meterMaximumUsage"
              {...form.getInputProps("removing.meterMaximumUsage")}
            />{" "}
          </Input.Wrapper>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3 pb-5">
        <div>
          <Input.Wrapper label={t("meterNumber")}>
            <Input
              data-testid="removing.meterNumber"
              {...form.getInputProps("removing.meterNumber")}
            />{" "}
          </Input.Wrapper>
        </div>

        <div>
          <Input.Wrapper label={t("meterValue")}>
            <Input
              data-testid="removing.meterValue"
              {...form.getInputProps("removing.meterValue")}
            />{" "}
          </Input.Wrapper>
        </div>

        <div>
          <YearPickerInput
            label={t("certificationYear")}
            {...form.getInputProps("removing.certificationYear")}
          />
        </div>

        <div>
          <MonthPickerInput
            label={t("examinationMonth")}
            {...form.getInputProps("removing.examinationMonth")}
          />
        </div>
      </div>

      <div className="pb-5">
        <TakePicture />

        <div className="grid grid-cols-5 gap-3 py-5">
          <div>
            <Input.Wrapper label={t("referenceDate")}>
              <Input
                data-testid="referenceDate"
                {...form.getInputProps("removing.referenceDate")}
              />{" "}
            </Input.Wrapper>
          </div>
          <div>
            <Input.Wrapper label={t("position")}>
              <Input
                data-testid="position"
                {...form.getInputProps("removing.position")}
              />{" "}
            </Input.Wrapper>
          </div>
        </div>
      </div>
    </>
  )
}
