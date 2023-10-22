import { Input, Select } from "@mantine/core"
import { DatePickerInput, DateTimePicker } from "@mantine/dates"
import { useTranslations } from "next-intl"
import UserSelect from "../form/UserSelect"

export const WorkScheduleInformation = ({
  form,
  className,
}: {
  form: any
  className?: string
}) => {
  const t = useTranslations("OperationForm")

  return (
    <div className={className}>
      <div className="grid grid-cols-5 gap-3 py-5">
        <div className="col-span-1">
          <UserSelect
            form={form}
            label={t("responsibleWorker")}
            name={"assignedWorkerId"}
          />
        </div>
        <div className="col-span-1">

          <DateTimePicker
            data-testid="scheduledDatetime"
            label={t("scheduledDatetime")}
            name="scheduledDatetime"
            {...form.getInputProps("scheduledDatetime")}
          />
        </div>
        <div className="col-span-1">
          <Select
            label={t("footprint")}
            data-testid="footprint"
            data={[
              { value: "1", label: "午前" },
              { value: "2", label: "午後" },
            ]}
            {...form.getInputProps("footprint")}
          ></Select>
        </div>
        <div className="col-span-1 col-start-1">
          <DatePickerInput
            // {...form.getInputProps("postcardOutputTimestamp")}
            data-testid="postcardOutputTimestamp"
            label={t("postcardOutputTimestamp")}
            name="postcardOutputTimestamp"
            {...form.getInputProps("postcardOutputTimestamp")}
            mx="auto"
          />
        </div>
        <div className="col-span-1">
          <DatePickerInput
            data-testid="absenceNoticeDeliveryDate"
            label={t("absenceNoticeDeliveryDate")}
            name="absenceNoticeDeliveryDate"
            {...form.getInputProps("absenceNoticeDeliveryDate")}
            mx="auto"
          />
        </div>
      </div>
    </div>
  )
}
