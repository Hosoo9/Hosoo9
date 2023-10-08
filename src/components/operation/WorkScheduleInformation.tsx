import {
    Input,
    Title
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useTranslations } from "next-intl"

export const WorkScheduleInformation = () => {
  const t = useTranslations("OperationForm")

  return (
    <>
      <Title order={2} size="h3">
        {t("workScheduleInformation")}
      </Title>

      <div className="grid grid-cols-5 gap-3 py-5">
        <div className="col-span-1">
          <Input.Wrapper label={t("responsibleWorker")}>
            <Input data-testid="responsibleWorker" />{" "}
          </Input.Wrapper>
        </div>
        <div className="col-span-1">
          <Input.Wrapper label={t("scheduledWorkDateTime")}>
            <Input data-testid="scheduledWorkDateTime" />{" "}
          </Input.Wrapper>
        </div>
        <div className="col-span-1">
          <Input.Wrapper label={t("footprints")}>
            <Input data-testid="footprints" />{" "}
          </Input.Wrapper>
        </div>
        <div className="col-span-1 col-start-1">
          <DatePickerInput
            // {...form.getInputProps("postcardOutputTimestamp")}
            data-testid="postcardOutputTimestamp"
            label={t("postcardOutputTimestamp")}
            name="postcardOutputTimestamp"
            // value={}
            // onChange={setSubmitDate}
            mx="auto"
          />
        </div>
        <div className="col-span-1">
          <DatePickerInput
            // {/* {...form.getInputProps("absenceNoticeDeliveryDate")} */}
            data-testid="absenceNoticeDeliveryDate"
            label={t("absenceNoticeDeliveryDate")}
            name="absenceNoticeDeliveryDate"
            // value={}
            // onChange={setSubmitDate}
            mx="auto"
          />
        </div>
      </div>
    </>
  )
}
