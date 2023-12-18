import { useTranslations } from "next-intl"

export const Pause = () => {
  const t = useTranslations("OperationForm")

  return (
    <>
      <div className="grid grid-cols-5 gap-3 pb-5">
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-700">{t("prePauseStatus")}</div>
            <div className="mt-1 text-gray-600">-</div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-700">{t("pauseDuration")}</div>
            <div className="mt-1 text-gray-600">-</div>
          </div>
        </div>
        {/* <div className="col-span-1"> */}
        {/*   <DatePickerInput */}
        {/*     data-testid="pauseTimestamp" */}
        {/*     label={t("pauseTimestamp")} */}
        {/*     name="pauseTimestamp" */}
        {/*     // value={} */}
        {/*     // onChange={setSubmitDate} */}
        {/*     mx="auto" */}
        {/*     disabled */}
        {/*   /> */}
        {/* </div> */}
        {/* <div className="col-span-1"> */}
        {/*   <Input.Wrapper label={t("pauseDuration")}> */}
        {/*     <Input data-testid="pauseDuration" disabled />{" "} */}
        {/*   </Input.Wrapper> */}
        {/* </div> */}
      </div>
    </>
  )
}
