import { Select } from "@mantine/core"
import { DatePickerInput, TimeInput } from "@mantine/dates"
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
    <>
      <div className={className}>
        <div className="grid grid-cols-5 gap-3 py-5">
          <div className="col-span-1">
            <UserSelect
              form={form}
              label={t("assignedWorker")}
              name={"assignedWorkerId"}
            />
          </div>
          <div className="col-span-1">
            <DatePickerInput
              data-testid="scheduledDate"
              label={t("scheduledDate")}
              name="scheduledDate"
              {...form.getInputProps("scheduledDate")}
            />
          </div>
          <div className="col-span-1">
            <TimeInput
              data-testid="scheduledTime"
              label={t("scheduledTime")}
              name="scheduledTime"
              {...form.getInputProps("scheduledTime")}
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
              // {...form.getInputProps("postcardStartDate")}
              data-testid="postcardStartDate"
              label={t("postcardStartDate")}
              name="postcardStartDate"
              {...form.getInputProps("postcardStartDate")}
              mx="auto"
            />
          </div>
          <div className="col-span-1">
            <DatePickerInput
              // {...form.getInputProps("postcardEndDate")}
              data-testid="postcardEndDate"
              label={t("postcardEndDate")}
              name="postcardEndDate"
              {...form.getInputProps("postcardEndDate")}
              mx="auto"
            />
          </div>
          {/* </div> */}
          {/* <div className="col-span-1 col-start-1"> */}
          {/*   <DatePickerInput */}
          {/*     // {...form.getInputProps("postcardOutputTimestamp")} */}
          {/*     data-testid="postcardOutputTimestamp" */}
          {/*     label={t("postcardOutputTimestamp")} */}
          {/*     name="postcardOutputTimestamp" */}
          {/*     {...form.getInputProps("postcardOutputTimestamp")} */}
          {/*     mx="auto" */}
          {/*   /> */}
          {/* </div> */}
          {/* <div className="col-span-1"> */}
          {/*   <DatePickerInput */}
          {/*     data-testid="absenceNoticeDeliveryDate" */}
          {/*     label={t("absenceNoticeDeliveryDate")} */}
          {/*     name="absenceNoticeDeliveryDate" */}
          {/*     {...form.getInputProps("absenceNoticeDeliveryDate")} */}
          {/*     mx="auto" */}
          {/*   /> */}
          {/* </div> */}
        </div>
      </div>
    </>
  )
}
