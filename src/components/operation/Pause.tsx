import { Input } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useTranslations } from "next-intl"

export const Pause = () => {
  const t = useTranslations("OperationForm")

  return (
    <>
      <div className="grid grid-cols-5 gap-3 pb-5">
        <div className="col-span-1">
          <Input.Wrapper label={t("prePauseStatus")}>
            <Input data-testid="prePauseStatus" disabled />{" "}
          </Input.Wrapper>
        </div>
        <div className="col-span-1">
          <DatePickerInput
            data-testid="pauseTimestamp"
            label={t("pauseTimestamp")}
            name="pauseTimestamp"
            // value={}
            // onChange={setSubmitDate}
            mx="auto"
            disabled
          />
        </div>
        <div className="col-span-1">
          <Input.Wrapper label={t("pauseDuration")}>
            <Input data-testid="pauseDuration" disabled />{" "}
          </Input.Wrapper>
        </div>
      </div>
    </>
  )
}
